// src/app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, Material } from './types';
import Image from 'next/image';

// Component imports will go here once we create them
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import RecommendationsCarousel from './components/RecommendationsCarousel';
import { compressImage, fileToBase64 } from './utils/imageProcessing';

export default function Home() {
  // State for chat
  const [chatId, setChatId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize chat
  useEffect(() => {
    // Create a new chat session if none exists
    if (!chatId) {
      setChatId(uuidv4());
    }
  }, [chatId]);

  // Function to send a message
  const handleSendMessage = async (content: string, imageFile?: File) => {
    if (!content.trim() && !imageFile) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Create a new user message
      const userMessage: Message = {
        id: uuidv4(),
        chatId,
        role: 'user',
        content,
        createdAt: new Date()
      };
      
      // Process image if present
      let imageUrl = '';
      if (imageFile) {
        try {
          // Compress the image
          const compressedImage = await compressImage(imageFile);
          
          // Convert to base64 for preview and API
          imageUrl = await fileToBase64(compressedImage);
          
          // Add the image URL to the user message
          userMessage.imageUrl = imageUrl;
        } catch (err) {
          console.error('Error processing image:', err);
          setError('Failed to process image. Please try again with a different image.');
          setIsLoading(false);
          return;
        }
      }
      
      // Add user message to state
      setMessages(prev => [...prev, userMessage]);
      
      // Send message to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          imageUrl,
          chatId,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      const data = await response.json();
      
      // Add assistant message to state
      const assistantMessage: Message = {
        id: uuidv4(),
        chatId,
        role: 'assistant',
        content: data.answer,
        recommendations: data.recommendations,
        createdAt: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-gray-900/80 border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014.846 21H9.154a3.374 3.374 0 00-2.914-1.453L5.69 19z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Copilot Learning Assistant</h1>
                <p className="text-sm text-gray-400">Your AI-powered learning companion</p>
              </div>
            </div>
            
            <button className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full h-[calc(100vh-80px)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome to Your Learning Journey
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Ask me anything about your studies and I'll provide personalized explanations with curated learning materials to help you master any subject.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                    <h3 className="font-semibold text-blue-400 mb-2">📚 Study Help</h3>
                    <p className="text-sm text-gray-300">Get explanations for complex concepts</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                    <h3 className="font-semibold text-purple-400 mb-2">🎯 Practice Problems</h3>
                    <p className="text-sm text-gray-300">Solve problems step by step</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                    <h3 className="font-semibold text-green-400 mb-2">📖 Learning Materials</h3>
                    <p className="text-sm text-gray-300">Discover curated resources</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                    <h3 className="font-semibold text-orange-400 mb-2">🖼️ Visual Learning</h3>
                    <p className="text-sm text-gray-300">Upload images for analysis</p>
                  </div>
                </div>
              </div>
            ) : (
              <MessageList messages={messages} />
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-4 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
          <div className="max-w-3xl mx-auto">
            <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}