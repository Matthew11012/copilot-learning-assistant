'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, Material } from './types';
import { useChatContext } from './contexts/ChatContext';

// Component imports 
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import ChatSidebar from './components/ChatSidebar';
import { compressImage, fileToBase64 } from './utils/imageProcessing';

export default function Home() {
  const { 
    currentChatId, 
    currentMessages, 
    createNewChat, 
    addMessage, 
    updateMessage 
  } = useChatContext();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Initialize with a new chat if none exists
  useEffect(() => {
    if (!currentChatId) {
      createNewChat();
    }
  }, [currentChatId, createNewChat]);

  // Function to send a message with streaming
  const handleSendMessage = async (content: string, imageFile?: File) => {
    if (!content.trim() && !imageFile) return;
    if (!currentChatId) return;
    
    setIsLoading(true);
    setError(null);
    
    // Create assistant message ID outside try-catch for error handling
    const assistantMessageId = uuidv4();
    
    try {
      // Process image if present
      let imageUrl = '';
      if (imageFile) {
        try {
          const compressedImage = await compressImage(imageFile);
          imageUrl = await fileToBase64(compressedImage);
        } catch (err) {
          console.error('Error processing image:', err);
          setError('Failed to process image. Please try again with a different image.');
          setIsLoading(false);
          return;
        }
      }

      // Create and add user message
      const userMessage: Message = {
        id: uuidv4(),
        chatId: currentChatId,
        role: 'user',
        content,
        imageUrl: imageUrl || undefined,
        recommendations: [],
        createdAt: new Date()
      };
      
      addMessage(currentChatId, userMessage);

      // Create placeholder assistant message
      const assistantMessage: Message = {
        id: assistantMessageId,
        chatId: currentChatId,
        role: 'assistant',
        content: '',
        recommendations: [],
        createdAt: new Date()
      };
      
      addMessage(currentChatId, assistantMessage);

      // Start streaming request
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          imageUrl,
          chatId: currentChatId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let buffer = '';
      let streamingContent = '';
      let recommendations: Material[] = [];

      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                switch (data.type) {
                  case 'start':
                    recommendations = data.recommendations || [];
                    break;
                    
                  case 'content':
                    streamingContent += data.content;
                    updateMessage(currentChatId, assistantMessageId, {
                      content: streamingContent,
                      recommendations
                    });
                    break;
                    
                  case 'complete':
                    console.log('Streaming complete');
                    break;
                    
                  case 'error':
                    console.error('Streaming error:', data.content);
                    streamingContent = data.content;
                    updateMessage(currentChatId, assistantMessageId, {
                      content: streamingContent
                    });
                    break;
                }
              } catch (parseError) {
                console.error('Error parsing SSE data:', parseError);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      
      if (currentChatId) {
        updateMessage(currentChatId, assistantMessageId, {
          content: 'Sorry, I encountered an error. Please try again.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex overflow-hidden min-w-0">
      {/* Sidebar - Always visible on desktop, overlay on mobile */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <ChatSidebar isOpen={true} onClose={() => {}} />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        <ChatSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <header className="flex-shrink-0 backdrop-blur-md bg-gray-900/80 border-b border-gray-700/50">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014.846 21H9.154a3.374 3.374 0 00-2.914-1.453L5.69 19z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Asisten Belajar Copilot</h1>
                  <p className="text-sm text-gray-400">Teman belajar AI yang siap membantu Anda</p>
                </div>
              </div>
              
              <button 
                onClick={() => createNewChat()}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Chat Baru
              </button>
            </div>
          </div>
        </header>

        {/* Chat Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-2 sm:px-4 lg:px-6 py-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {currentMessages.length === 0 ? (
                              <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto px-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Selamat datang di Perjalanan Belajar Anda
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
                    Tanya saya apa saja tentang pelajaran Anda dan saya akan memberikan penjelasan yang personal dengan materi belajar yang relevan untuk membantu Anda menguasai setiap pelajaran.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                                      <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700/50">
                      <h3 className="font-semibold text-blue-400 mb-1 sm:mb-2 text-sm sm:text-base">📚 Bantuan Belajar</h3>
                      <p className="text-xs sm:text-sm text-gray-300">Dapatkan penjelasan untuk konsep yang kompleks</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700/50">
                      <h3 className="font-semibold text-purple-400 mb-1 sm:mb-2 text-sm sm:text-base">🎯 Latihan Soal</h3>
                      <p className="text-xs sm:text-sm text-gray-300">Selesaikan soal secara bertahap</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700/50">
                      <h3 className="font-semibold text-green-400 mb-1 sm:mb-2 text-sm sm:text-base">📖 Materi Belajar</h3>
                      <p className="text-xs sm:text-sm text-gray-300">Temukan sumber belajar yang relevan</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700/50">
                      <h3 className="font-semibold text-orange-400 mb-1 sm:mb-2 text-sm sm:text-base">🖼️ Belajar Visual</h3>
                      <p className="text-xs sm:text-sm text-gray-300">Unggah gambar untuk analisis</p>
                    </div>
                </div>
              </div>
            ) : (
              <MessageList messages={currentMessages} />
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mx-2 sm:mx-4 lg:mx-6 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex-shrink-0 p-2 sm:p-4 lg:p-6 border-t border-gray-700/50">
            <div className="max-w-4xl mx-auto">
              <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}