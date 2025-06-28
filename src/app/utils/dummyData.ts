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
  
  // Extract subject-specific keywords (these are high priority)
  const subjectKeywords = extractSubjectKeywords(lowerQuery);
  console.log('Subject keywords found:', subjectKeywords);
  
  // Create a scoring system for better relevance
  const materialScores = dummyMaterials.map(material => {
    let score = 0;
    const materialText = {
      title: material.title.toLowerCase(),
      summary: material.summary.toLowerCase(),
      topic: material.topic.toLowerCase()
    };
    
    console.log(`\nEvaluating: ${material.title}`);
    
    // HIGHEST PRIORITY: Direct topic match
    subjectKeywords.forEach(keyword => {
      if (materialText.topic.includes(keyword)) {
        score += 100;
        // console.log(`  -> Direct topic match for "${keyword}": +100 (total: ${score})`);
      }
    });
    
    // HIGH PRIORITY: Subject keyword in title
    subjectKeywords.forEach(keyword => {
      if (materialText.title.includes(keyword)) {
        score += 80;
        // console.log(`  -> Subject keyword "${keyword}" in title: +80 (total: ${score})`);
      }
    });
    
    // MEDIUM PRIORITY: Subject keyword in summary
    subjectKeywords.forEach(keyword => {
      if (materialText.summary.includes(keyword)) {
        score += 60;
        // console.log(`  -> Subject keyword "${keyword}" in summary: +60 (total: ${score})`);
      }
    });
    
    // LOW PRIORITY: General keywords (only if no subject match found)
    if (score === 0) {
      const generalKeywords = extractGeneralKeywords(lowerQuery);
      generalKeywords.forEach(keyword => {
        if (materialText.title.includes(keyword)) {
          score += 20;
          // console.log(`  -> General keyword "${keyword}" in title: +20 (total: ${score})`);
        } else if (materialText.summary.includes(keyword)) {
          score += 10;
          // console.log(`  -> General keyword "${keyword}" in summary: +10 (total: ${score})`);
        }
      });
    }
    
    // console.log(`  -> Final score: ${score}`);
    return { material, score };
  });
  
  // Filter materials with score > 0 and sort by score
  const filteredMaterials = materialScores
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.material);
  
  console.log('\nFinal filtered materials (by score):');
  filteredMaterials.forEach((material, index) => {
    const scoreItem = materialScores.find(item => item.material.id === material.id);
    console.log(`${index + 1}. ${material.title} (Score: ${scoreItem?.score})`);
  });
  
  return filteredMaterials;
}

// Extract subject-specific keywords that should have high priority
function extractSubjectKeywords(query: string): string[] {
  const subjectMap: { [key: string]: string[] } = {
    'kalkulus': ['kalkulus', 'calculus', 'diferensial', 'integral', 'turunan', 'limit'],
    'aljabar': ['aljabar', 'linear', 'vektor', 'matriks', 'matrix', 'algebra'],
    'ekonomi': ['ekonomi', 'economy', 'mikro', 'makro', 'perdagangan', 'pasar', 'uang'],
    'statistika': ['statistik', 'statistic', 'probabilitas', 'probability', 'data', 'sampel'],
    'fisika': ['fisika', 'physics', 'mekanika', 'gaya', 'gerak', 'energi', 'momentum'],
    'pemrograman': ['pemrograman', 'programming', 'python', 'coding', 'code', 'script']
  };
  
  const foundSubjects: string[] = [];
  
  // Check which subjects are mentioned in the query
  Object.entries(subjectMap).forEach(([subject, keywords]) => {
    keywords.forEach(keyword => {
      if (query.includes(keyword)) {
        foundSubjects.push(subject);
        // Also add the specific keyword that was found
        foundSubjects.push(keyword);
      }
    });
  });
  
  // Remove duplicates
  return [...new Set(foundSubjects)];
}

// Extract general keywords (with lower priority)
function extractGeneralKeywords(query: string): string[] {
  // Remove common Indonesian stop words and subject-specific terms
  const stopWords = [
    'berikan', 'saya', 'materi', 'terkait', 'tentang', 'untuk', 'dengan', 'dan', 
    'yang', 'adalah', 'pada', 'di', 'ke', 'dari', 'dalam', 'jelaskan', 'beri',
    'satu', 'contoh', 'soal', 'konsep', 'dasar', 'pengenalan', 'mempelajari'
  ];
  
  // Split the query into words and filter out stop words and short words
  const words = query.toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));
  
  return words;
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