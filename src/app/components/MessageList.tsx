'use client';

import { Message } from '../types';
import MessageBubble from './MessageBubble';
import { useEffect, useRef } from 'react';

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    // Use a small timeout to ensure DOM updates are complete
    const scrollTimeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'  // Ensure it scrolls to the end
      });
    }, 100);
    
    return () => clearTimeout(scrollTimeout);
  }, [messages]);

  return (
    <div className="w-full">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}