'use client';

import { Message } from '../types';
import Image from 'next/image';
import ContentRenderer from './ContentRenderer';
import RecommendationsCarousel from './RecommendationsCarousel';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`w-full`}>
      <div className={`w-full px-4 sm:px-6 lg:px-8 py-6 ${isUser ? 'flex justify-end' : ''}`}>
        <div className={`flex gap-3 sm:gap-4 lg:gap-6 ${isUser ? 'max-w-[85%] sm:max-w-[75%] lg:max-w-[60%]' : 'w-full pr-4 sm:pr-6 lg:pr-8'}`}>
          {/* Avatar for assistant */}
          {!isUser && (
            <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014.846 21H9.154a3.374 3.374 0 00-2.914-1.453L5.69 19z" />
              </svg>
            </div>
          )}
          
          <div className={`flex-1 ${isUser ? 'flex justify-end' : ''}`}>
            {/* Message content container */}
            <div
              className={`${
                isUser
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-md px-5 py-4'
                  : 'text-gray-100 w-full max-w-full sm:max-w-4xl lg:max-w-6xl'
              }`}
            >
              {/* Display image if present */}
              {message.imageUrl && (
                <div className={`${isUser ? 'mb-4' : 'mb-5'}`}>
                  <Image
                    src={message.imageUrl}
                    alt="Attached image"
                    width={400}
                    height={250}
                    className="rounded-lg max-w-full object-cover"
                  />
                </div>
              )}
              
              {/* Message content */}
              <div className="message-content">
                {isUser ? (
                  // For user messages, simple text display
                  <div className="whitespace-pre-wrap text-base sm:text-lg leading-relaxed">
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className={`text-base${i > 0 ? 'mt-3' : ''}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  // For assistant messages, use the ContentRenderer
                  <ContentRenderer content={message.content} />
                )}
              </div>
              
              
            </div>
          </div>
          
          
        </div>
      </div>
      
      {/* Recommendations - only for assistant messages */}
      {!isUser && message.recommendations && message.recommendations.length > 0 && (
        <div>
          <div className="w-full px-4 sm:px-6 lg:px-8 pb-6 pr-4 sm:pr-8 lg:pr-16">
            <div className="ml-12 sm:ml-14 lg:ml-15">
              <h4 className="text-sm font-medium text-gray-300 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Recommended Learning Materials
              </h4>
              <RecommendationsCarousel materials={message.recommendations} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}