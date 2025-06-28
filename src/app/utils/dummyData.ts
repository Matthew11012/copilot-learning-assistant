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
    thumbnailUrl: '/images/math.jpg',
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
    thumbnailUrl: '/images/math.jpg',
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
    thumbnailUrl: '/images/economics.jpg',
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
    thumbnailUrl: '/images/economics.jpg',
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
    thumbnailUrl: '/images/math.jpg',
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
    thumbnailUrl: '/images/programming.jpg',
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
    thumbnailUrl: '/images/statistics.jpg',
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
    thumbnailUrl: '/images/physics.jpg',
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

export function searchDummyMaterials(query: string, limit = 4): Material[] {
  if (!query) return dummyMaterials.slice(0, limit);
  
  const lowerQuery = query.toLowerCase();
  console.log('Search query:', lowerQuery);
  // console.log('Available materials:', dummyMaterials.map(m => ({ title: m.title, topic: m.topic })));
  
  // Extract keywords from the query
  const keywords = extractKeywords(lowerQuery);
  console.log('Extracted keywords:', keywords);
  
  const materials = dummyMaterials
    .filter(material => {
      const titleMatch = keywords.some(keyword => 
        material.title.toLowerCase().includes(keyword)
      );
      const summaryMatch = keywords.some(keyword => 
        material.summary.toLowerCase().includes(keyword)
      );
      const topicMatch = keywords.some(keyword => 
        material.topic.toLowerCase().includes(keyword)
      );
      
      const matches = titleMatch || summaryMatch || topicMatch;
      // console.log(`Material "${material.title}": titleMatch=${titleMatch}, summaryMatch=${summaryMatch}, topicMatch=${topicMatch}, overall=${matches}`);
      
      return matches;
    })
    .slice(0, limit);
    
  // console.log('Filtered materials:', materials);
  return materials;
}

// Add this helper function to extract relevant keywords from the query
function extractKeywords(query: string): string[] {
  // Remove common Indonesian words that don't help with search
  const stopWords = ['berikan', 'saya', 'materi', 'terkait', 'tentang', 'untuk', 'dengan', 'dan', 'yang', 'adalah', 'pada', 'di', 'ke', 'dari', 'dalam'];
  
  // Split the query into words and filter out stop words
  const words = query.toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));
  
  // Add the original query as well in case it's a compound term
  return [...words, query.toLowerCase()];
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