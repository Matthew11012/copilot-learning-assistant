// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
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
  const [recommendations, setRecommendations] = useState<Material[]>([]);
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
        createdAt: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Update recommendations
      setRecommendations(data.recommendations || []);
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-white dark:bg-gray-800 shadow">
        <Image
          src="/next.svg" // Replace with your logo
          alt="Copilot Learning Assistant"
          width={120}
          height={30}
          priority
        />
        <h1 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">
          Copilot Learning Assistant
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Chat area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4" style={{ scrollBehavior: 'smooth' }}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-2xl font-semibold mb-2">Welcome to Copilot Learning Assistant</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  Ask me anything about your studies, and I&apos;ll help you find the right materials to learn from.
                </p>
              </div>
            ) : (
              <MessageList messages={messages} />
            )}
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 text-sm">
              {error}
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="p-4 bg-gray-100 dark:bg-gray-800">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Recommended Learning Materials
              </h3>
              <RecommendationsCarousel materials={recommendations} />
            </div>
          )}

          {/* Input area */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}