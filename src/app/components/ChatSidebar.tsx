'use client';

import { useState } from 'react';
import { useChatContext } from '../contexts/ChatContext';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const { 
    chats, 
    currentChatId, 
    createNewChat, 
    switchToChat, 
    deleteChat, 
    updateChatTitle 
  } = useChatContext();
  
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleNewChat = () => {
    createNewChat();
    onClose();
  };

  const handleSwitchChat = (chatId: string) => {
    switchToChat(chatId);
    onClose();
  };

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    if (confirm('Hapus chat ini?')) {
      deleteChat(chatId);
    }
  };

  const handleEditTitle = (e: React.MouseEvent, chat: { id: string; title: string }) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setEditTitle(chat.title);
  };

  const handleSaveTitle = () => {
    if (editingChatId && editTitle.trim()) {
      updateChatTitle(editingChatId, editTitle.trim());
    }
    setEditingChatId(null);
    setEditTitle('');
  };

  const handleCancelEdit = () => {
    setEditingChatId(null);
    setEditTitle('');
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hari ini';
    if (diffDays === 2) return 'Kemarin';
    if (diffDays <= 7) return `${diffDays} hari lalu`;
    
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        h-full w-80 bg-gray-900 border-r border-gray-700/50 flex flex-col
        ${isOpen ? 'fixed left-0 top-0 z-50 translate-x-0' : 'fixed left-0 top-0 z-50 -translate-x-full'} 
        lg:relative lg:translate-x-0 lg:z-auto
        transform transition-transform duration-300 ease-in-out
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700/50 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Riwayat Chat</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <button
            onClick={handleNewChat}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg px-4 py-2 font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Chat Baru
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-2 min-h-0">
          {chats.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>Belum ada chat</p>
              <p className="text-sm">Mulai chat baru untuk memulai</p>
            </div>
          ) : (
            <div className="space-y-1">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSwitchChat(chat.id)}
                  className={`
                    group relative p-3 rounded-lg cursor-pointer transition-all duration-200 
                    ${currentChatId === chat.id 
                      ? 'bg-blue-500/20 border border-blue-500/30' 
                      : 'hover:bg-gray-800/50'
                    }
                  `}
                >
                  {editingChatId === chat.id ? (
                    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveTitle();
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveTitle}
                          className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-white"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded text-white"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-sm font-medium truncate">
                            {chat.title}
                          </h3>
                          <p className="text-gray-400 text-xs mt-1">
                            {formatDate(chat.createdAt)}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleEditTitle(e, chat)}
                            className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white"
                            title="Edit judul"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => handleDeleteChat(e, chat.id)}
                            className="p-1 rounded hover:bg-red-600 text-gray-400 hover:text-white"
                            title="Hapus chat"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
