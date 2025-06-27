import { NextRequest, NextResponse } from 'next/server';
import { generateTextResponse, generateMultimodalResponse } from '../../utils/gemini';
import { searchDummyMaterials, saveDummyMessage } from '../../utils/dummyData';
import { v4 as uuidv4 } from 'uuid';
import { Material } from '../../types';

export async function POST(request: NextRequest) {
  try {
    const { message, imageUrl, chatId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Use existing chat or create a new one
    const currentChatId = chatId || uuidv4();
    
    // Save user message
    saveDummyMessage(currentChatId, 'user', message, imageUrl);

    // Search for relevant learning materials based on user query
    const relevantMaterials = searchDummyMaterials(message, 4);
    
    // Format materials for context
    const materialsContext = formatMaterialsForContext(relevantMaterials);

    // Generate response based on whether an image was provided
    let answer: string;
    
    if (imageUrl) {
      answer = await generateMultimodalResponse(message, imageUrl, materialsContext);
    } else {
      answer = await generateTextResponse(message, materialsContext);
    }

    // Save assistant response
    saveDummyMessage(currentChatId, 'assistant', answer);

    // Return response with recommendations
    return NextResponse.json({
      chatId: currentChatId,
      answer,
      recommendations: relevantMaterials
    });
    
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
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
