import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Initialize the Google Generative AI client
const apiKey = process.env.GEMINI_API_KEY || '';

if (!apiKey) {
  console.warn('Missing Gemini API key. Chat functionality will not work.');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Set up safety settings
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


// Function to generate chat response with text only
export async function generateTextResponse(prompt: string, context?: string) {
  try {
    // If we have context (materials), include it in the prompt
    const fullPrompt = context 
      ? `${prompt}\n\nHere are some relevant materials that might help:\n${context}`
      : prompt;
      
    const result = await Model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating text response:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

// Function to generate chat response with text and image
export async function generateMultimodalResponse(prompt: string, imageUrl: string, context?: string) {
  try {
    // Construct the multimodal prompt
    const fullPrompt = context 
      ? `${prompt}\n\nHere are some relevant materials that might help:\n${context}`
      : prompt;
    console.log("Sending multimodal prompt to Gemini");

    const imageParts = [
      {
        inlineData: {
          data: imageUrl.split(',')[1], // Remove the data:image/jpeg;base64, part
          mimeType: 'image/jpeg',
        },
      },
    ];
    
    const textPart = { text: fullPrompt };
    
    const result = await Model.generateContent([...imageParts, textPart]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating multimodal response:', error);
    return 'Sorry, I encountered an error while processing your request with the image.';
  }
}

export async function generateStreamingTextResponse(
  prompt: string, 
  context: string | undefined, 
  onChunk: (chunk: string) => void
) {
  try {
    const fullPrompt = context 
      ? `${prompt}\n\nHere are some relevant materials that might help:\n${context}`
      : prompt;
      
    console.log('Starting streaming text generation...');
    
    const result = await Model.generateContentStream(fullPrompt);
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        onChunk(chunkText);
      }
    }
    
  } catch (error) {
    console.error('Error generating streaming text response:', error);
    onChunk('Sorry, I encountered an error while processing your request.');
  }
}

// New streaming multimodal response function
export async function generateStreamingMultimodalResponse(
  prompt: string,
  imageUrl: string,
  context: string | undefined,
  onChunk: (chunk: string) => void
) {
  try {
    const fullPrompt = context 
      ? `${prompt}\n\nHere are some relevant materials that might help:\n${context}`
      : prompt;

    console.log('Starting streaming multimodal generation...');

    // Process the image data - simplified approach
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
    console.error('Error generating streaming multimodal response:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('400') || errorMessage.includes('413')) {
      onChunk('Sorry, the image might be too large or in an unsupported format. Please try with a different image.');
    } else {
      onChunk('Sorry, I encountered an error while processing your request with the image. Please try again without an image or with a different image.');
    }
  }
}