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
    const fullPrompt = buildContextualPrompt(prompt, materialsContext, conversationContext);

    console.log('Sending contextual multimodal prompt to Gemini...');

    // Process the image data
    const imageParts = [
      {
        inlineData: {
          data: imageUrl.split(',')[1], 
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

function buildContextualPrompt(currentMessage: string, materialsContext: string, conversationContext: string): string {
  let prompt = `You are an expert AI learning assistant with deep knowledge across all academic subjects. You provide clear, structured, and comprehensive educational guidance.

Response Guidelines:
- Always respond in Indonesian (Bahasa Indonesia)
- Use clear headings and subheadings when appropriate
- Structure complex topics with numbered lists or bullet points
- Provide step-by-step explanations for problems
- Include relevant examples and analogies
- Reference previous conversation context when relevant
- When users use pronouns like "itu" (that), "ini" (this), understand them from conversation context
- Be thorough but concise - explain concepts completely without being verbose
- Use academic tone while remaining approachable
- Format mathematical expressions clearly
- When recommending learning materials, integrate them naturally into your explanation

Response Structure:
1. Start with a brief acknowledgment or summary
2. Provide main explanation with clear structure
3. Include examples or applications when relevant
4. Reference learning materials naturally within the content
5. End with encouraging next steps or follow-up suggestions

`;

  if (conversationContext) {
    prompt += `Previous Conversation Context:
${conversationContext}

`;
  }

  prompt += `Current Question/Request:
${currentMessage}

`;

  if (materialsContext) {
    prompt += `Available Learning Resources:
${materialsContext}

Please reference these materials naturally within your response where relevant, explaining why each resource would be helpful for understanding the topic.

`;
  }

  prompt += `Provide a well-structured, comprehensive response that demonstrates deep understanding and helps the student learn effectively. Use clear formatting with headings, lists, and examples as appropriate.`;

  return prompt;
}