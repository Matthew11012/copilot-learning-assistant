// Types for User
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
  }
  
  // Types for Chat
  export interface Chat {
    id: string;
    userId?: string; // Optional for anonymous users
    title: string;
    createdAt: Date;
  }
  
  // Types for Message
  export type MessageRole = 'user' | 'assistant';
  
  export interface Message {
    id: string;
    chatId: string;
    role: MessageRole;
    content: string;
    imageUrl?: string;
    recommendations: Material[];
    createdAt: Date;
  }
  
  // Types for Learning Materials
  export type MaterialType = 'video' | 'pdf' | 'article';
  
  export interface Material {
    id: string;
    title: string;
    summary: string;
    contentUrl: string;
    type: MaterialType;
    topic: string;
    thumbnailUrl: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    createdAt: Date;
  }
  
  // Types for API Responses
  export interface ChatResponse {
    answer: string;
    recommendations: Material[];
  }
  
  // Types for UI Components
  export interface MessageInputProps {
    onSendMessage: (message: string, imageFile?: File) => void;
    isLoading: boolean;
  }
  
  export interface MessageBubbleProps {
    message: Message;
  }
  
  export interface RecommendationCardProps {
    material: Material;
  }