'use client';

import { Message } from '../types';
import MessageBubble from './MessageBubble';
import { useEffect, useRef, useMemo } from 'react';

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize the content hash for dependency tracking
  const contentHash = useMemo(() => 
    messages.map(m => m.content).join(''), 
    [messages]
  );

  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'smooth') => {
    if (!isUserScrollingRef.current) {
      messagesEndRef.current?.scrollIntoView({ 
        behavior,
        block: 'end'
      });
    }
  };

  // Auto-scroll when messages change or content updates
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user') {
      scrollToBottom('auto');
    } else {
      scrollToBottom('smooth');
    }
  }, [messages]);

  // Monitor content changes within messages (for streaming)
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'assistant') {
      scrollToBottom('smooth');
    }
  }, [contentHash, messages]);

  // Detect user scrolling
  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      
      isUserScrollingRef.current = !isNearBottom;
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 2000);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}