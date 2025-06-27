import { v4 as uuidv4 } from 'uuid';
import { User, Chat, Message, Material } from '../types';

// Dummy Users
export const dummyUsers: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'Test User',
    createdAt: new Date('2023-01-01')
  }
];

// Dummy Learning Materials - Updated to match Gradient's educational focus
export const dummyMaterials: Material[] = [
  {
    id: '1',
    title: 'Aljabar Linear: Vektor dan Matriks',
    summary: 'Pengenalan konsep dasar vektor dan matriks dalam aljabar linear.',
    contentUrl: 'https://example.com/aljabar-linear-vektor',
    type: 'video',
    topic: 'aljabar linear',
    thumbnailUrl: 'https://via.placeholder.com/150?text=Aljabar+Linear',
    level: 'Beginner',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    title: 'Transformasi Linear dan Aplikasinya',
    summary: 'Mempelajari transformasi linear dan bagaimana aplikasinya dalam bidang matematika dan komputasi.',
    contentUrl: 'https://example.com/transformasi-linear',
    type: 'article',
    topic: 'aljabar linear',
    thumbnailUrl: 'https://via.placeholder.com/150?text=Transformasi+Linear',
    level: 'Intermediate',
    createdAt: new Date('2023-02-10')
  },
  {
    id: '3',
    title: 'Ekonomi Makro: Pengantar',
    summary: 'Pengenalan konsep dasar ekonomi makro dan indikator ekonomi.',
    contentUrl: 'https://example.com/ekonomi-makro',
    type: 'video',
    topic: 'ekonomi',
    thumbnailUrl: 'https://via.placeholder.com/150?text=Ekonomi+Makro',
    level: 'Beginner',
    createdAt: new Date('2023-03-05')
  },
  {
    id: '4',
    title: 'Teori Mikroekonomi',
    summary: 'Mempelajari perilaku ekonomi pada tingkat individu dan perusahaan.',
    contentUrl: 'https://example.com/mikroekonomi',
    type: 'article',
    topic: 'ekonomi',
    thumbnailUrl: 'https://via.placeholder.com/150?text=Mikroekonomi',
    level: 'Intermediate',
    createdAt: new Date('2023-04-20')
  },
  {
    id: '5',
    title: 'Kalkulus Diferensial',
    summary: 'Pengenalan konsep dasar kalkulus diferensial dan aplikasinya.',
    contentUrl: 'https://example.com/kalkulus-diferensial',
    type: 'video',
    topic: 'kalkulus',
    thumbnailUrl: 'https://via.placeholder.com/150?text=Kalkulus',
    level: 'Beginner',
    createdAt: new Date('2023-05-15')
  },
  {
    id: '6',
    title: 'Pemrograman Python untuk Data Science',
    summary: 'Belajar dasar-dasar Python untuk analisis data dan machine learning.',
    contentUrl: 'https://example.com/python-data-science',
    type: 'video',
    topic: 'pemrograman',
    thumbnailUrl: 'https://via.placeholder.com/150?text=Python',
    level: 'Beginner',
    createdAt: new Date('2023-06-10')
  },
  {
    id: '7',
    title: 'Statistika Dasar dan Probabilitas',
    summary: 'Mempelajari konsep dasar statistika dan probabilitas untuk analisis data.',
    contentUrl: 'https://example.com/statistika-dasar',
    type: 'article',
    topic: 'statistika',
    thumbnailUrl: 'https://via.placeholder.com/150?text=Statistika',
    level: 'Beginner',
    createdAt: new Date('2023-07-05')
  },
  {
    id: '8',
    title: 'Fisika Mekanika: Gerak dan Gaya',
    summary: 'Pengenalan konsep dasar mekanika dalam fisika.',
    contentUrl: 'https://example.com/fisika-mekanika',
    type: 'video',
    topic: 'fisika',
    thumbnailUrl: 'https://via.placeholder.com/150?text=Fisika',
    level: 'Intermediate',
    createdAt: new Date('2023-08-20')
  }
];

// Dummy Chats
export const dummyChats: Chat[] = [
  {
    id: '1',
    userId: '1',
    title: 'Belajar Aljabar Linear',
    createdAt: new Date('2023-06-01')
  }
];

// Dummy Messages
export const dummyMessages: Message[] = [
  {
    id: '1',
    chatId: '1',
    role: 'user',
    content: 'Berikan saya materi terkait aljabar linear',
    createdAt: new Date('2023-06-01T10:00:00')
  },
  {
    id: '2',
    chatId: '1',
    role: 'assistant',
    content: 'Aljabar linear adalah cabang matematika yang mempelajari vektor, ruang vektor, transformasi linear, dan sistem persamaan linear. Berikut beberapa materi yang dapat membantu Anda mempelajari aljabar linear:\n\n1. Aljabar Linear: Vektor dan Matriks - Ini adalah video pengantar yang bagus untuk memahami konsep dasar vektor dan matriks.\n\n2. Transformasi Linear dan Aplikasinya - Artikel ini membahas konsep transformasi linear yang merupakan bagian penting dalam aljabar linear.\n\nApakah ada topik spesifik dalam aljabar linear yang ingin Anda pelajari lebih dalam?',
    createdAt: new Date('2023-06-01T10:00:30')
  }
];

// Utility functions for working with dummy data

// Search materials based on query
export function searchDummyMaterials(query: string, limit = 4): Material[] {
  if (!query) return dummyMaterials.slice(0, limit);
  
  const lowerQuery = query.toLowerCase();
  return dummyMaterials
    .filter(material => 
      material.title.toLowerCase().includes(lowerQuery) || 
      material.summary.toLowerCase().includes(lowerQuery) ||
      material.topic.toLowerCase().includes(lowerQuery)
    )
    .slice(0, limit);
}

// Create a new chat
export function createDummyChat(userId: string | undefined, title: string): Chat {
  const newChat: Chat = {
    id: uuidv4(),
    userId,
    title,
    createdAt: new Date()
  };
  
  dummyChats.push(newChat);
  return newChat;
}

// Save a message
export function saveDummyMessage(chatId: string, role: 'user' | 'assistant', content: string, imageUrl?: string): Message {
  const newMessage: Message = {
    id: uuidv4(),
    chatId,
    role,
    content,
    imageUrl,
    createdAt: new Date()
  };
  
  dummyMessages.push(newMessage);
  return newMessage;
}

// Get messages for a chat
export function getDummyChatMessages(chatId: string): Message[] {
  return dummyMessages
    .filter(message => message.chatId === chatId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

// Simulate image upload (returns a fake URL)
export function uploadDummyImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Return a fake URL
      resolve(`https://fake-image-url.com/${file.name}`);
    }, 500);
  });
} 