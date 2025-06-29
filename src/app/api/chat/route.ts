import { NextRequest } from 'next/server';
import { searchDummyMaterials, saveDummyMessage } from '../../utils/dummyData';
import { v4 as uuidv4 } from 'uuid';
import { Material } from '../../types';

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
    
    // Save user message with image if present
    saveDummyMessage(currentChatId, 'user', message, imageUrl);

    // Search for relevant learning materials based on user query
    const relevantMaterials = searchDummyMaterials(message, 4);
    
    // Format materials for context
    const materialsContext = formatMaterialsForContext(relevantMaterials);

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
          
          // Generate streaming response
          if (imageUrl) {
            await generateStreamingMultimodalResponse(message, imageUrl, materialsContext, controller, encoder);
          } else {
            await generateStreamingTextResponse(message, materialsContext, controller, encoder);
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
  context: string, 
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  try {
    // Import the streaming function from gemini utils
    const { generateStreamingTextResponse } = await import('../../utils/gemini');
    
    let fullResponse = '';
    
    await generateStreamingTextResponse(prompt, context, (chunk: string) => {
      fullResponse += chunk;
      const data = { type: 'content', content: chunk };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
    });
    
    // Save the complete response
    const currentChatId = ''; // You'll need to pass this through or get it from context
    saveDummyMessage(currentChatId, 'assistant', fullResponse);
    
  } catch (error) {
    console.error('Error in streaming text response:', error);
    throw error;
  }
}

// Streaming multimodal response function
async function generateStreamingMultimodalResponse(
  prompt: string,
  imageUrl: string,
  context: string,
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  try {
    // Import the streaming function from gemini utils
    const { generateStreamingMultimodalResponse } = await import('../../utils/gemini');
    
    let fullResponse = '';
    
    await generateStreamingMultimodalResponse(prompt, imageUrl, context, (chunk: string) => {
      fullResponse += chunk;
      const data = { type: 'content', content: chunk };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
    });
    
    // Save the complete response
    const currentChatId = ''; // You'll need to pass this through or get it from context
    saveDummyMessage(currentChatId, 'assistant', fullResponse);
    
  } catch (error) {
    console.error('Error in streaming multimodal response:', error);
    throw error;
  }
}

// Helper function to format materials for context
function formatMaterialsForContext(materials: Material[]): string {
  if (materials.length === 0) return '';
  
  return `Relevant Learning Materials:
${materials.map((material, index) => 
  `${index + 1}. ${material.title} (${material.level}) - ${material.summary}`
).join('\n')}

Based on these materials, provide a helpful, educational response that references these resources when appropriate.`;
}
