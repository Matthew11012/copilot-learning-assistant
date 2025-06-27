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

// Initialize text-only model
export const textModel = genAI.getGenerativeModel({
  model: 'gemini-pro',
  safetySettings,
});

// Initialize multimodal model for text + images
export const visionModel = genAI.getGenerativeModel({
  model: 'gemini-pro-vision',
  safetySettings,
});

// Function to generate chat response with text only
export async function generateTextResponse(prompt: string, context?: string) {
  try {
    // If we have context (materials), include it in the prompt
    const fullPrompt = context 
      ? `${prompt}\n\nHere are some relevant materials that might help:\n${context}`
      : prompt;
      
    const result = await textModel.generateContent(fullPrompt);
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

    const imageParts = [
      {
        inlineData: {
          data: imageUrl.split(',')[1], // Remove the data:image/jpeg;base64, part
          mimeType: 'image/jpeg',
        },
      },
    ];
    
    const textPart = { text: fullPrompt };
    
    const result = await visionModel.generateContent([...imageParts, textPart]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating multimodal response:', error);
    return 'Sorry, I encountered an error while processing your request with the image.';
  }
}