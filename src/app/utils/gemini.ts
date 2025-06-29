import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';


const apiKey = process.env.GEMINI_API_KEY || '';

if (!apiKey) {
  console.warn('Missing Gemini API key. Chat functionality will not work.');
}

const genAI = new GoogleGenerativeAI(apiKey);


const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Initialize model
export const Model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  safetySettings,
});



export async function generateStreamingTextResponseWithContext(
  prompt: string, 
  materialsContext: string,
  conversationContext: string,
  onChunk: (chunk: string) => void
) {
  try {
    // Construct a comprehensive prompt with conversation context
    const fullPrompt = buildContextualPrompt(prompt, materialsContext, conversationContext);
    
    console.log('Sending contextual prompt to Gemini...');
    
    const result = await Model.generateContentStream(fullPrompt);
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        onChunk(chunkText);
      }
    }
    
  } catch (error) {
    console.error('Error generating streaming text response with context:', error);
    onChunk('Sorry, I encountered an error while processing your request.');
  }
}

export async function generateStreamingMultimodalResponseWithContext(
  prompt: string,
  imageUrl: string,
  materialsContext: string,
  conversationContext: string,
  onChunk: (chunk: string) => void
) {
  try {
    // Construct a comprehensive prompt with conversation context
    const fullPrompt = buildContextualPrompt(prompt, materialsContext, conversationContext);

    console.log('Sending contextual multimodal prompt to Gemini...');

    // Process the image data
    const imageParts = [
      {
        inlineData: {
          data: imageUrl.split(',')[1], // Remove the data:image/jpeg;base64, part
          mimeType: 'image/jpeg',
        },
      },
    ];
    
    const textPart = { text: fullPrompt };
    
    // Generate streaming content
    const result = await Model.generateContentStream([...imageParts, textPart]);
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        onChunk(chunkText);
      }
    }
    
  } catch (error) {
    console.error('Error generating streaming multimodal response with context:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('400') || errorMessage.includes('413')) {
      onChunk('Sorry, the image might be too large or in an unsupported format. Please try with a different image.');
    } else {
      onChunk('Sorry, I encountered an error while processing your request with the image. Please try again without an image or with a different image.');
    }
  }
}

// Helper function to build contextual prompts
function buildContextualPrompt(currentMessage: string, materialsContext: string, conversationContext: string): string {
  let prompt = `You are a helpful learning assistant. You help students understand academic concepts and provide educational guidance.

Instructions:
- Always respond in Indonesian (Bahasa Indonesia)
- Be educational and encouraging
- Reference previous conversation when relevant
- When users refer to "itu" (that), "ini" (this), or similar pronouns, understand them in context of the previous conversation
- Provide clear explanations with examples when possible
- When recommending materials, mention them naturally in your response

`;

  // Add conversation context if available
  if (conversationContext) {
    prompt += `${conversationContext}
`;
  }

  // Add current message
  prompt += `${currentMessage}

`;

  // Add materials context if available
  if (materialsContext) {
    prompt += `${materialsContext}

`;
  }

  prompt += `Please provide a helpful, educational response that maintains context from our conversation.`;

  return prompt;
}