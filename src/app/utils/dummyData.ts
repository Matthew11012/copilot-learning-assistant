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

// Expanded Dummy Learning Materials with much more variety
export const dummyMaterials: Material[] = [
  // MATHEMATICS - Calculus
  {
    id: '1',
    title: 'Kalkulus Diferensial: Konsep Limit dan Turunan',
    summary: 'Pengenalan konsep limit, kontinuitas, dan turunan fungsi satu variabel dengan aplikasi praktis.',
    contentUrl: 'https://example.com/kalkulus-diferensial',
    type: 'video',
    topic: 'kalkulus',
    thumbnailUrl: '/images/math.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    title: 'Kalkulus Integral: Teknik Integrasi',
    summary: 'Mempelajari berbagai teknik integrasi termasuk substitusi, parsial, dan aplikasi integral.',
    contentUrl: 'https://example.com/kalkulus-integral',
    type: 'article',
    topic: 'kalkulus',
    thumbnailUrl: '/images/math.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-02-10')
  },
  {
    id: '3',
    title: 'Kalkulus Multivariabel dan Aplikasinya',
    summary: 'Turunan parsial, integral ganda, dan aplikasi dalam optimisasi dan analisis vektor.',
    contentUrl: 'https://example.com/kalkulus-multivariabel',
    type: 'pdf',
    topic: 'kalkulus',
    thumbnailUrl: '/images/math.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-03-05')
  },
  
  // MATHEMATICS - Linear Algebra
  {
    id: '4',
    title: 'Aljabar Linear: Vektor dan Operasi Dasar',
    summary: 'Pengenalan konsep vektor, operasi vektor, dan representasi geometris dalam ruang 2D dan 3D.',
    contentUrl: 'https://example.com/aljabar-linear-vektor',
    type: 'video',
    topic: 'aljabar linear',
    thumbnailUrl: '/images/math.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-01-20')
  },
  {
    id: '5',
    title: 'Matriks dan Sistem Persamaan Linear',
    summary: 'Operasi matriks, determinan, invers matriks, dan penyelesaian sistem persamaan linear.',
    contentUrl: 'https://example.com/matriks-sistem',
    type: 'article',
    topic: 'aljabar linear',
    thumbnailUrl: '/images/math.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-02-15')
  },
  {
    id: '6',
    title: 'Transformasi Linear dan Ruang Vektor',
    summary: 'Konsep transformasi linear, eigenvalue, eigenvector, dan aplikasi dalam geometri.',
    contentUrl: 'https://example.com/transformasi-linear',
    type: 'pdf',
    topic: 'aljabar linear',
    thumbnailUrl: '/images/math.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-03-10')
  },
  
  // MATHEMATICS - Statistics & Probability
  {
    id: '7',
    title: 'Statistika Deskriptif: Analisis Data Dasar',
    summary: 'Ukuran pemusatan, penyebaran, dan visualisasi data menggunakan grafik dan tabel.',
    contentUrl: 'https://example.com/statistika-deskriptif',
    type: 'video',
    topic: 'statistika',
    thumbnailUrl: '/images/statistics.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-01-25')
  },
  {
    id: '8',
    title: 'Probabilitas dan Distribusi',
    summary: 'Konsep probabilitas, distribusi normal, binomial, dan aplikasi dalam pengambilan keputusan.',
    contentUrl: 'https://example.com/probabilitas-distribusi',
    type: 'article',
    topic: 'statistika',
    thumbnailUrl: '/images/statistics.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '9',
    title: 'Inferensi Statistik dan Uji Hipotesis',
    summary: 'Estimasi parameter, interval kepercayaan, dan berbagai uji hipotesis statistik.',
    contentUrl: 'https://example.com/inferensi-statistik',
    type: 'pdf',
    topic: 'statistika',
    thumbnailUrl: '/images/statistics.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-03-15')
  },
  
  // ECONOMICS - Microeconomics
  {
    id: '10',
    title: 'Mikroekonomi: Teori Permintaan dan Penawaran',
    summary: 'Analisis perilaku konsumen, produsen, dan mekanisme pembentukan harga di pasar.',
    contentUrl: 'https://example.com/mikroekonomi-dasar',
    type: 'video',
    topic: 'ekonomi',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-01-30')
  },
  {
    id: '11',
    title: 'Struktur Pasar dan Persaingan',
    summary: 'Analisis berbagai struktur pasar: persaingan sempurna, monopoli, oligopoli, dan monopolistik.',
    contentUrl: 'https://example.com/struktur-pasar',
    type: 'article',
    topic: 'ekonomi',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-02-25')
  },
  {
    id: '12',
    title: 'Ekonomi Makro: GDP dan Pertumbuhan Ekonomi',
    summary: 'Konsep GDP, inflasi, pengangguran, dan kebijakan fiskal serta moneter.',
    contentUrl: 'https://example.com/ekonomi-makro',
    type: 'pdf',
    topic: 'ekonomi',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-03-20')
  },
  
  // PHYSICS - Mechanics
  {
    id: '13',
    title: 'Fisika Mekanika: Kinematika Gerak Lurus',
    summary: 'Konsep perpindahan, kecepatan, percepatan, dan analisis gerak dalam satu dimensi.',
    contentUrl: 'https://example.com/kinematika-gerak',
    type: 'video',
    topic: 'fisika',
    thumbnailUrl: '/images/physics.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-02-01')
  },
  {
    id: '14',
    title: 'Dinamika: Hukum Newton dan Aplikasinya',
    summary: 'Tiga hukum Newton, analisis gaya, dan penerapan dalam berbagai sistem mekanika.',
    contentUrl: 'https://example.com/dinamika-newton',
    type: 'article',
    topic: 'fisika',
    thumbnailUrl: '/images/physics.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-03-01')
  },
  {
    id: '15',
    title: 'Energi dan Momentum dalam Sistem Fisika',
    summary: 'Konservasi energi, energi kinetik-potensial, momentum, dan tumbukan elastis-inelastis.',
    contentUrl: 'https://example.com/energi-momentum',
    type: 'pdf',
    topic: 'fisika',
    thumbnailUrl: '/images/physics.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-04-01')
  },
  
  // COMPUTER SCIENCE - Programming
  {
    id: '16',
    title: 'Python untuk Pemula: Sintaks dan Struktur Data',
    summary: 'Dasar-dasar Python: variabel, tipe data, list, dictionary, dan kontrol flow.',
    contentUrl: 'https://example.com/python-pemula',
    type: 'video',
    topic: 'pemrograman',
    thumbnailUrl: '/images/programming.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-02-05')
  },
  {
    id: '17',
    title: 'Algoritma dan Struktur Data dengan Python',
    summary: 'Implementasi algoritma sorting, searching, dan struktur data seperti stack, queue, tree.',
    contentUrl: 'https://example.com/algoritma-python',
    type: 'article',
    topic: 'pemrograman',
    thumbnailUrl: '/images/programming.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-03-05')
  },
  {
    id: '18',
    title: 'Machine Learning dengan Python dan Scikit-learn',
    summary: 'Implementasi algoritma ML: regresi linear, klasifikasi, clustering, dan evaluasi model.',
    contentUrl: 'https://example.com/ml-python',
    type: 'pdf',
    topic: 'pemrograman',
    thumbnailUrl: '/images/programming.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-04-05')
  },
  
  // COMPUTER SCIENCE - Web Development
  {
    id: '19',
    title: 'HTML dan CSS: Dasar Pengembangan Web',
    summary: 'Struktur HTML, styling dengan CSS, responsive design, dan best practices.',
    contentUrl: 'https://example.com/html-css-dasar',
    type: 'video',
    topic: 'web development',
    thumbnailUrl: '/images/programming.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-02-10')
  },
  {
    id: '20',
    title: 'JavaScript Modern: ES6+ dan DOM Manipulation',
    summary: 'Fitur ES6+, async/await, manipulasi DOM, dan event handling dalam JavaScript.',
    contentUrl: 'https://example.com/javascript-modern',
    type: 'article',
    topic: 'web development',
    thumbnailUrl: '/images/programming.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-03-10')
  },
  {
    id: '21',
    title: 'React.js: Membangun Aplikasi Web Interaktif',
    summary: 'Komponen React, hooks, state management, dan integrasi dengan API backend.',
    contentUrl: 'https://example.com/reactjs-advanced',
    type: 'pdf',
    topic: 'web development',
    thumbnailUrl: '/images/programming.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-04-10')
  },
  
  // CHEMISTRY
  {
    id: '22',
    title: 'Kimia Dasar: Struktur Atom dan Ikatan Kimia',
    summary: 'Teori atom, konfigurasi elektron, dan berbagai jenis ikatan kimia.',
    contentUrl: 'https://example.com/kimia-dasar',
    type: 'video',
    topic: 'kimia',
    thumbnailUrl: '/images/physics.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-02-15')
  },
  {
    id: '23',
    title: 'Kimia Organik: Hidrokarbon dan Reaksi',
    summary: 'Struktur hidrokarbon, reaksi substitusi, eliminasi, dan mekanisme reaksi organik.',
    contentUrl: 'https://example.com/kimia-organik',
    type: 'article',
    topic: 'kimia',
    thumbnailUrl: '/images/physics.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-03-15')
  },
  {
    id: '24',
    title: 'Kimia Analitik: Spektroskopi dan Kromatografi',
    summary: 'Teknik analisis instrumental: IR, NMR, MS, dan berbagai metode kromatografi.',
    contentUrl: 'https://example.com/kimia-analitik',
    type: 'pdf',
    topic: 'kimia',
    thumbnailUrl: '/images/physics.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-04-15')
  },
  
  // BIOLOGY
  {
    id: '25',
    title: 'Biologi Sel: Struktur dan Fungsi Sel',
    summary: 'Komponen sel, membran sel, organel, dan proses seluler dasar.',
    contentUrl: 'https://example.com/biologi-sel',
    type: 'video',
    topic: 'biologi',
    thumbnailUrl: '/images/physics.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '26',
    title: 'Genetika: DNA, RNA, dan Ekspresi Gen',
    summary: 'Struktur asam nukleat, replikasi DNA, transkripsi, translasi, dan regulasi gen.',
    contentUrl: 'https://example.com/genetika',
    type: 'article',
    topic: 'biologi',
    thumbnailUrl: '/images/physics.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-03-20')
  },
  {
    id: '27',
    title: 'Biologi Molekuler: Teknik Rekayasa Genetika',
    summary: 'PCR, kloning gen, CRISPR, dan aplikasi bioteknologi modern.',
    contentUrl: 'https://example.com/biologi-molekuler',
    type: 'pdf',
    topic: 'biologi',
    thumbnailUrl: '/images/physics.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-04-20')
  },
  
  // PSYCHOLOGY
  {
    id: '28',
    title: 'Psikologi Umum: Pengantar Perilaku Manusia',
    summary: 'Konsep dasar psikologi, persepsi, memori, dan proses kognitif.',
    contentUrl: 'https://example.com/psikologi-umum',
    type: 'video',
    topic: 'psikologi',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-02-25')
  },
  {
    id: '29',
    title: 'Psikologi Sosial: Interaksi dan Pengaruh Sosial',
    summary: 'Dinamika kelompok, konformitas, persuasi, dan psikologi massa.',
    contentUrl: 'https://example.com/psikologi-sosial',
    type: 'article',
    topic: 'psikologi',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-03-25')
  },
  {
    id: '30',
    title: 'Psikologi Klinis: Gangguan Mental dan Terapi',
    summary: 'Diagnosis gangguan mental, teknik terapi, dan intervensi psikologis.',
    contentUrl: 'https://example.com/psikologi-klinis',
    type: 'pdf',
    topic: 'psikologi',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-04-25')
  },
  
  // BUSINESS & MANAGEMENT
  {
    id: '31',
    title: 'Manajemen Dasar: Prinsip dan Fungsi Manajemen',
    summary: 'Planning, organizing, leading, controlling, dan teori organisasi modern.',
    contentUrl: 'https://example.com/manajemen-dasar',
    type: 'video',
    topic: 'manajemen',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-03-01')
  },
  {
    id: '32',
    title: 'Marketing Digital: Strategi Pemasaran Online',
    summary: 'SEO, social media marketing, content marketing, dan analytics.',
    contentUrl: 'https://example.com/marketing-digital',
    type: 'article',
    topic: 'manajemen',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-04-01')
  },
  {
    id: '33',
    title: 'Manajemen Strategis: Analisis dan Implementasi',
    summary: 'Analisis SWOT, competitive advantage, dan implementasi strategi bisnis.',
    contentUrl: 'https://example.com/manajemen-strategis',
    type: 'pdf',
    topic: 'manajemen',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-05-01')
  },
  
  // LANGUAGE & LITERATURE
  {
    id: '34',
    title: 'Bahasa Indonesia: Tata Bahasa dan Struktur Kalimat',
    summary: 'Morfologi, sintaksis, dan penggunaan bahasa Indonesia yang baik dan benar.',
    contentUrl: 'https://example.com/bahasa-indonesia',
    type: 'video',
    topic: 'bahasa',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-03-05')
  },
  {
    id: '35',
    title: 'Sastra Indonesia: Analisis Karya Sastra',
    summary: 'Teknik analisis puisi, prosa, dan drama dalam sastra Indonesia.',
    contentUrl: 'https://example.com/sastra-indonesia',
    type: 'article',
    topic: 'bahasa',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-04-05')
  },
  {
    id: '36',
    title: 'English Grammar: Advanced Structures',
    summary: 'Complex sentence structures, conditionals, and advanced grammar patterns.',
    contentUrl: 'https://example.com/english-grammar',
    type: 'pdf',
    topic: 'bahasa',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-05-05')
  },
  
  // HISTORY
  {
    id: '37',
    title: 'Sejarah Indonesia: Era Kemerdekaan',
    summary: 'Perjuangan kemerdekaan, proklamasi, dan pembentukan negara Indonesia.',
    contentUrl: 'https://example.com/sejarah-kemerdekaan',
    type: 'video',
    topic: 'sejarah',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-03-10')
  },
  {
    id: '38',
    title: 'Sejarah Dunia: Perang Dunia dan Dampaknya',
    summary: 'Analisis Perang Dunia I dan II, serta pengaruhnya terhadap tatanan dunia.',
    contentUrl: 'https://example.com/sejarah-dunia',
    type: 'article',
    topic: 'sejarah',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-04-10')
  },
  {
    id: '39',
    title: 'Historiografi: Metodologi Penelitian Sejarah',
    summary: 'Metode penelitian sejarah, kritik sumber, dan penulisan karya sejarah.',
    contentUrl: 'https://example.com/historiografi',
    type: 'pdf',
    topic: 'sejarah',
    thumbnailUrl: '/images/economics.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-05-10')
  },
  
  // GEOGRAPHY
  {
    id: '40',
    title: 'Geografi Fisik: Bentuk Muka Bumi dan Iklim',
    summary: 'Proses geomorfologi, klasifikasi iklim, dan interaksi atmosfer-hidrosfer.',
    contentUrl: 'https://example.com/geografi-fisik',
    type: 'video',
    topic: 'geografi',
    thumbnailUrl: '/images/physics.jpg',
    level: 'Beginner',
    createdAt: new Date('2023-03-15')
  },
  {
    id: '41',
    title: 'Geografi Manusia: Demografi dan Urbanisasi',
    summary: 'Dinamika penduduk, migrasi, dan perkembangan perkotaan.',
    contentUrl: 'https://example.com/geografi-manusia',
    type: 'article',
    topic: 'geografi',
    thumbnailUrl: '/images/physics.jpg',
    level: 'Intermediate',
    createdAt: new Date('2023-04-15')
  },
  {
    id: '42',
    title: 'Sistem Informasi Geografis (SIG)',
    summary: 'Penggunaan GIS untuk analisis spasial dan pemetaan digital.',
    contentUrl: 'https://example.com/sig-gis',
    type: 'pdf',
    topic: 'geografi',
    thumbnailUrl: '/images/physics.jpg',
    level: 'Advanced',
    createdAt: new Date('2023-05-15')
  }
];

// Dummy Chats
export const dummyChats: Chat[] = [
  {
    id: '1',
    userId: '1',
    title: 'Belajar Kalkulus Diferensial',
    createdAt: new Date('2023-06-01')
  },
  {
    id: '2',
    userId: '1',
    title: 'Diskusi Ekonomi Makro',
    createdAt: new Date('2023-06-02')
  },
  {
    id: '3',
    userId: '1',
    title: 'Python untuk Data Science',
    createdAt: new Date('2023-06-03')
  }
];

// Dummy Messages
export const dummyMessages: Message[] = [
  {
    id: '1',
    chatId: '1',
    role: 'user',
    content: 'Berikan saya materi terkait aljabar linear',
    createdAt: new Date('2023-06-01T10:00:00'),
    recommendations: []
  },
  {
    id: '2',
    chatId: '1',
    role: 'assistant',
    content: 'Aljabar linear adalah cabang matematika yang mempelajari vektor, ruang vektor, transformasi linear, dan sistem persamaan linear. Berikut beberapa materi yang dapat membantu Anda mempelajari aljabar linear:\n\n1. Aljabar Linear: Vektor dan Matriks - Ini adalah video pengantar yang bagus untuk memahami konsep dasar vektor dan matriks.\n\n2. Transformasi Linear dan Aplikasinya - Artikel ini membahas konsep transformasi linear yang merupakan bagian penting dalam aljabar linear.\n\nApakah ada topik spesifik dalam aljabar linear yang ingin Anda pelajari lebih dalam?',
    createdAt: new Date('2023-06-01T10:00:30'),
    recommendations: []
  }
];

export function searchDummyMaterials(query: string, limit = 10): Material[] {
  if (!query) return dummyMaterials.slice(0, limit);
  
  const lowerQuery = query.toLowerCase();
  console.log('Search query:', lowerQuery);
  
  // Extract subject-specific keywords 
  const subjectKeywords = extractSubjectKeywords(lowerQuery);
  console.log('Subject keywords found:', subjectKeywords);
  
  // scoring system for better relevance
  const materialScores = dummyMaterials.map(material => {
    let score = 0;
    const materialText = {
      title: material.title.toLowerCase(),
      summary: material.summary.toLowerCase(),
      topic: material.topic.toLowerCase()
    };
    
    // HIGHEST PRIORITY: Direct topic match
    subjectKeywords.forEach(keyword => {
      if (materialText.topic.includes(keyword)) {
        score += 100;
      }
    });
    
    // HIGH PRIORITY: Subject keyword in title
    subjectKeywords.forEach(keyword => {
      if (materialText.title.includes(keyword)) {
        score += 80;
      }
    });
    
    // MEDIUM PRIORITY: Subject keyword in summary
    subjectKeywords.forEach(keyword => {
      if (materialText.summary.includes(keyword)) {
        score += 60;
      }
    });
    
    // LOW PRIORITY: General keywords (only if no subject match found)
    if (score === 0) {
      const generalKeywords = extractGeneralKeywords(lowerQuery);
      generalKeywords.forEach(keyword => {
        if (materialText.title.includes(keyword)) {
          score += 20;
        } else if (materialText.summary.includes(keyword)) {
          score += 10;
        }
      });
    }
    
    return { material, score };
  });
  
  // Filter materials with score > 40 and sort by score
  const filteredMaterials = materialScores
    .filter(item => item.score > 40)
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

// Enhanced version with context filtering
function extractSubjectKeywords(query: string): string[] {
  const subjectMap: { [key: string]: string[] } = {
    'kalkulus': ['kalkulus', 'calculus', 'diferensial', 'integral', 'turunan', 'limit', 'multivariabel'],
    'aljabar': ['aljabar', 'linear', 'vektor', 'matriks', 'matrix', 'algebra', 'transformasi', 'eigenvalue'],
    'ekonomi': ['ekonomi', 'economy', 'mikro', 'makro', 'perdagangan', 'pasar', 'uang', 'gdp', 'inflasi'],
    'statistika': ['statistik', 'statistic', 'probabilitas', 'probability', 'data', 'sampel', 'distribusi', 'hipotesis'],
    'fisika': ['fisika', 'physics', 'mekanika', 'gaya', 'gerak', 'energi', 'momentum', 'kinematika', 'dinamika', 'newton', 'hukum', 'einstein', 'quantum', 'relativitas', 'termodinamika', 'elektromagnetik', 'optik', 'gelombang', 'partikel', 'atom', 'nuklir', 'bose', 'kondensasi'],
    'pemrograman': ['pemrograman', 'programming', 'python', 'coding', 'code', 'script', 'koding', 'algoritma'],
    'web development': ['web', 'html', 'css', 'javascript', 'react', 'frontend', 'backend', 'website'],
    'kimia': ['kimia', 'chemistry', 'molekul', 'reaksi', 'organik', 'analitik', 'spektroskopi'],
    'biologi': ['biologi', 'biology', 'sel', 'genetika', 'dna', 'rna', 'molekuler', 'bioteknologi', 'fotosintesis', 'respirasi', 'metabolisme', 'ekosistem', 'evolusi'],
    'psikologi': ['psikologi', 'psychology', 'perilaku', 'kognitif', 'sosial', 'klinis', 'terapi'],
    'manajemen': ['manajemen', 'management', 'bisnis', 'marketing', 'strategis', 'organisasi'],
    'bahasa': ['bahasa', 'language', 'sastra', 'grammar', 'indonesia', 'english', 'tata bahasa'],
    'sejarah': ['sejarah', 'history', 'kemerdekaan', 'dunia', 'historiografi', 'indonesia'],
    'geografi': ['geografi', 'geography', 'geomorfologi', 'iklim', 'demografi', 'sig', 'gis', 'peta', 'wilayah', 'regional', 'spasial', 'bentuk muka bumi', 'urbanisasi']
  };
  
  const foundSubjects: string[] = [];
  const subjectScores: { [key: string]: number } = {};
  
  // Calculate scores for each subject
  Object.entries(subjectMap).forEach(([subject, keywords]) => {
    let score = 0;
    const matchedKeywords: string[] = [];
    
    keywords.forEach(keyword => {
      if (query.includes(keyword)) {
        const keywordScore = keyword.length > 6 ? 3 : keyword.length > 4 ? 2 : 1;
        score += keywordScore;
        matchedKeywords.push(keyword);
      }
    });
    
    if (score > 0) {
      subjectScores[subject] = score;
      foundSubjects.push(...matchedKeywords);
    }
  });
  
  // Only include subjects with high enough scores to avoid cross-contamination
  const highScoreSubjects = Object.entries(subjectScores)
    .filter(([_, score]) => score >= 2) 
    .map(([subject, _]) => subject);
  
  foundSubjects.push(...highScoreSubjects);
  
  console.log('Subject scores:', subjectScores);
  console.log('High score subjects:', highScoreSubjects);
  
  return [...new Set(foundSubjects)];
}

// Extract general keywords (with lower priority)
function extractGeneralKeywords(query: string): string[] {
  const stopWords = [
    'berikan', 'saya', 'materi', 'terkait', 'tentang', 'untuk', 'dengan', 'dan', 
    'yang', 'adalah', 'pada', 'di', 'ke', 'dari', 'dalam', 'jelaskan', 'beri',
    'satu', 'contoh', 'soal', 'konsep', 'dasar', 'pengenalan', 'mempelajari'
  ];
  
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
export function saveDummyMessage(
  chatId: string, 
  role: 'user' | 'assistant', 
  content: string, 
  imageUrl?: string, 
  recommendations?: Material[]
): Message {
  const newMessage: Message = {
    id: uuidv4(),
    chatId,
    role,
    content,
    imageUrl,
    recommendations: recommendations || [],
    createdAt: new Date()
  };
  
  dummyMessages.push(newMessage);
  
  console.log(`💾 Saved ${role} message to chat ${chatId} with ${newMessage.recommendations.length} recommendations`);
  
  return newMessage;
}

export function getDummyChatMessages(chatId: string): Message[] {
  const messages = dummyMessages
    .filter(message => message.chatId === chatId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    
  console.log(`📜 Retrieved ${messages.length} messages for chat ${chatId}`);
  return messages;
}


export function searchMaterialsWithContext(query: string, conversationHistory: any[], limit = 10): Material[] {
  console.log('🔍 Searching materials with context for query:', query);
  
  const lowerQuery = query.toLowerCase();
  
  // Check if this is a contextual request (asking for materials about previous topic)
  const isContextualRequest = isRequestingMaterialsAboutPreviousTopic(lowerQuery);
  
  if (isContextualRequest && conversationHistory.length > 0) {
    console.log('📚 Detected contextual material request');
    
    // Find the last user message that wasn't a material request
    const lastSubstantiveQuery = findLastSubstantiveQuery(conversationHistory);
    
    if (lastSubstantiveQuery) {
      console.log('🎯 Using previous query for material search:', lastSubstantiveQuery);
      return searchDummyMaterials(lastSubstantiveQuery, limit);
    }
  }
  
  return searchDummyMaterials(query, limit);
}

// Helper function to detect if user is asking for materials about previous topic
function isRequestingMaterialsAboutPreviousTopic(query: string): boolean {
  const contextualPatterns = [
    'beri saya materi tentang itu',
    'berikan materi tentang itu',
    'rekomen materi tentang itu',
    'rekomendasi materi tentang itu',
    'materi tentang itu',
    'bahan belajar tentang itu',
    'sumber belajar tentang itu',
    'beri materi itu',
    'kasih materi itu',
    'materi untuk itu',
    'belajar tentang itu',
    'pelajari itu',
    'materi terkait itu',
    'rekomen materi materi tentang itu', // Your specific query
    'rekomen materi tentang it' // Alternative spelling
  ];
  
  return contextualPatterns.some(pattern => query.includes(pattern));
}

// Helper function to find the last substantial query from conversation
function findLastSubstantiveQuery(conversationHistory: any[]): string | null {
  // Look through conversation history in reverse order
  for (let i = conversationHistory.length - 1; i >= 0; i--) {
    const message = conversationHistory[i];
    
    // Skip if it's an assistant message
    if (message.role === 'assistant') continue;
    
    // Skip if it's a material request
    if (isRequestingMaterialsAboutPreviousTopic(message.content.toLowerCase())) continue;
    
    // This should be a substantial user query
    console.log('🎯 Found last substantive query:', message.content);
    return message.content;
  }
  
  return null;
} 
 