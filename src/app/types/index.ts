export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
  }
  
  export interface Chat {
    id: string;
    userId?: string; 
    title: string;
    createdAt: Date;
  }
  
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