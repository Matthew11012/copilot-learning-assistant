'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Chat, Message, Material, MessageRole } from '../types';

interface ChatContextType {
  chats: Chat[];
  currentChatId: string | null;
  currentMessages: Message[];
  createNewChat: (title?: string) => string;
  switchToChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  updateChatTitle: (chatId: string, title: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [allMessages, setAllMessages] = useState<{ [chatId: string]: Message[] }>({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem('copilot-chats');
    const savedMessages = localStorage.getItem('copilot-messages');
    const savedCurrentChatId = localStorage.getItem('copilot-current-chat');

    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      // Convert date strings back to Date objects
      const chatsWithDates = parsedChats.map((chat: { id: string; title: string; createdAt: string }) => ({
        ...chat,
        createdAt: new Date(chat.createdAt)
      }));
      setChats(chatsWithDates);
    }

    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      // Convert date strings back to Date objects
      const messagesWithDates: { [chatId: string]: Message[] } = {};
      Object.entries(parsedMessages).forEach(([chatId, messages]) => {
        const messageArray = messages as { 
          id: string; 
          chatId: string; 
          role: MessageRole; 
          content: string; 
          imageUrl?: string; 
          recommendations: Material[]; 
          createdAt: string 
        }[];
        messagesWithDates[chatId] = messageArray.map((msg) => ({
          ...msg,
          createdAt: new Date(msg.createdAt)
        }));
      });
      setAllMessages(messagesWithDates);
    }

    if (savedCurrentChatId) {
      setCurrentChatId(savedCurrentChatId);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('copilot-chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('copilot-messages', JSON.stringify(allMessages));
  }, [allMessages]);

  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem('copilot-current-chat', currentChatId);
    }
  }, [currentChatId]);

  // Get current messages
  const currentMessages = currentChatId ? (allMessages[currentChatId] || []) : [];

  const createNewChat = (title?: string): string => {
    const newChatId = uuidv4();
    const newChat: Chat = {
      id: newChatId,
      title: title || 'Chat Baru',
      createdAt: new Date()
    };

    setChats(prev => [newChat, ...prev]); // Add to beginning for recent-first order
    setCurrentChatId(newChatId);
    setAllMessages(prev => ({ ...prev, [newChatId]: [] }));

    return newChatId;
  };

  const switchToChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    setAllMessages(prev => {
      const newMessages = { ...prev };
      delete newMessages[chatId];
      return newMessages;
    });

    // If deleting current chat, switch to another or create new
    if (currentChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id);
      } else {
        createNewChat();
      }
    }
  };

  const updateChatTitle = (chatId: string, title: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, title } : chat
    ));
  };

  const addMessage = (chatId: string, message: Message) => {
    setAllMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message]
    }));

    // Auto-update chat title based on first user message
    const messages = allMessages[chatId] || [];
    if (message.role === 'user' && messages.length === 0) {
      const title = message.content.length > 50 
        ? message.content.substring(0, 50) + '...'
        : message.content;
      updateChatTitle(chatId, title);
    }
  };

  const updateMessage = (chatId: string, messageId: string, updates: Partial<Message>) => {
    setAllMessages(prev => ({
      ...prev,
      [chatId]: (prev[chatId] || []).map(msg => 
        msg.id === messageId ? { ...msg, ...updates } : msg
      )
    }));
  };

  return (
    <ChatContext.Provider value={{
      chats,
      currentChatId,
      currentMessages,
      createNewChat,
      switchToChat,
      deleteChat,
      updateChatTitle,
      addMessage,
      updateMessage
    }}>
      {children}
    </ChatContext.Provider>
  );
}
