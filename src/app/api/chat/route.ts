import { NextRequest } from 'next/server';
import { saveDummyMessage, getDummyChatMessages, searchMaterialsWithContext } from '../../utils/dummyData';
import { v4 as uuidv4 } from 'uuid';
import { Material, Message } from '../../types';

export async function POST(request: NextRequest) {
  try {
    const { message, imageUrl, chatId } = await request.json();

    if (!message && !imageUrl) {
      return new Response(
        JSON.stringify({ error: 'Either message or image is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Use existing chat or create a new one
    const currentChatId = chatId || uuidv4();
    
    // Get conversation history for context
    const conversationHistory = getDummyChatMessages(currentChatId);
    console.log('📜 Conversation history:', conversationHistory.length, 'messages');
    
    // Save user message with image if present
    saveDummyMessage(currentChatId, 'user', message, imageUrl);

    // Enhanced material search that considers conversation context
    const relevantMaterials = searchMaterialsWithContext(message, conversationHistory, 10);
    
    // Format materials for context
    const materialsContext = formatMaterialsForContext(relevantMaterials);
    
    // Format conversation history for context
    const conversationContext = formatConversationHistory(conversationHistory);

    // Create a readable stream for the response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        
        try {
          // Send initial data with chat ID and recommendations
          const initialData = {
            type: 'start',
            chatId: currentChatId,
            recommendations: relevantMaterials
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`));
          
          // Generate streaming response with conversation context
          if (imageUrl) {
            await generateStreamingMultimodalResponse(message, imageUrl, materialsContext, conversationContext, currentChatId, controller, encoder);
          } else {
            await generateStreamingTextResponse(message, materialsContext, conversationContext, currentChatId, controller, encoder);
          }
          
          // Send completion signal
          const completeData = { type: 'complete' };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(completeData)}\n\n`));
          
        } catch (error) {
          console.error('Error in streaming:', error);
          const errorData = { 
            type: 'error', 
            content: 'Sorry, I encountered an error while processing your request.' 
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`));
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Streaming text response function
async function generateStreamingTextResponse(
  prompt: string, 
  materialsContext: string,
  conversationContext: string,
  chatId: string,
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  try {
    const { generateStreamingTextResponseWithContext } = await import('../../utils/gemini');
    
    let fullResponse = '';
    
    await generateStreamingTextResponseWithContext(prompt, materialsContext, conversationContext, (chunk: string) => {
      fullResponse += chunk;
      const data = { type: 'content', content: chunk };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
    });
    
    // Get the materials that were sent in the initial data
    const relevantMaterials = searchMaterialsWithContext(prompt, getDummyChatMessages(chatId), 10);
    
    // Save the complete response WITH recommendations
    saveDummyMessage(chatId, 'assistant', fullResponse, undefined, relevantMaterials);
    
  } catch (error) {
    console.error('Error in streaming text response:', error);
    throw error;
  }
}

// Updated streaming multimodal response function with conversation context
async function generateStreamingMultimodalResponse(
  prompt: string,
  imageUrl: string,
  materialsContext: string,
  conversationContext: string,
  chatId: string,
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  try {
    const { generateStreamingMultimodalResponseWithContext } = await import('../../utils/gemini');
    
    let fullResponse = '';
    
    await generateStreamingMultimodalResponseWithContext(prompt, imageUrl, materialsContext, conversationContext, (chunk: string) => {
      fullResponse += chunk;
      const data = { type: 'content', content: chunk };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
    });
    
    // Get the materials that were sent in the initial data
    const relevantMaterials = searchMaterialsWithContext(prompt, getDummyChatMessages(chatId), 10);
    
    // Save the complete response WITH recommendations
    saveDummyMessage(chatId, 'assistant', fullResponse, imageUrl, relevantMaterials);
    
  } catch (error) {
    console.error('Error in streaming multimodal response:', error);
    throw error;
  }
}

// Helper function to format conversation history for context
function formatConversationHistory(messages: Message[]): string {
  if (messages.length === 0) return '';
  
  // Get the last 6 messages (3 exchanges) to avoid token limits
  const recentMessages = messages.slice(-6);
  
  const formattedHistory = recentMessages.map(msg => {
    const role = msg.role === 'user' ? 'User' : 'Assistant';
    return `${role}: ${msg.content}`;
  }).join('\n\n');
  
  return `Previous conversation context:
${formattedHistory}

Current user message:`;
}

function formatMaterialsForContext(materials: Material[]): string {
  if (materials.length === 0) return '';
  
  return `Relevant Learning Materials Available:
${materials.map((material) => 
  `• ${material.title} (${material.level}) - ${material.summary}`
).join('\n')}

When discussing these materials, please reference them naturally without creating numbered lists. Explain their relevance and educational value in a conversational way.`;
}
