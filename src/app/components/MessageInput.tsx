'use client';

import { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface MessageInputProps {
  onSendMessage: (message: string, imageFile?: File) => void;
  isLoading: boolean;
}

export default function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Maximum file size (3MB)
  const MAX_FILE_SIZE = 3 * 1024 * 1024;
  
  const processFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setImageError('Image too large. Maximum size is 3MB.');
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      setImageError('Invalid file type. Please upload an image.');
      return;
    }
    
    setImageError(null);
    setImageFile(file);
    
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
  };
  
  // Handle file drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    noClick: true, 
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.file.size > MAX_FILE_SIZE) {
          setImageError('Image too large. Maximum size is 3MB.');
        } else {
          setImageError('Invalid file type. Please upload an image.');
        }
        return;
      }
      
      if (acceptedFiles.length > 0) {
        processFile(acceptedFiles[0]);
      }
    },
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    onDropAccepted: () => setIsDragOver(false),
    onDropRejected: () => setIsDragOver(false),
  });
  
  // Handle clipboard paste
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      // Only handle paste when the input is focused or the container is focused
      if (!containerRef.current?.contains(document.activeElement)) return;
      
      const items = e.clipboardData?.items;
      if (!items) return;
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            processFile(file);
          }
          break;
        }
      }
    };
    
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  });
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    e.target.value = '';
  };
  
  const handleSubmit = () => {
    if (isLoading || (!message.trim() && !imageFile)) return;
    
    onSendMessage(message, imageFile || undefined);
    setMessage('');
    setImageFile(null);
    
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    setImageError(null);
  };
  
  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };
  
  return (
    <div 
      ref={containerRef}
      className="space-y-3"
      tabIndex={-1} // Make container focusable for paste detection
    >
      {/* Image error message */}
      {imageError && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-lg p-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {imageError}
        </div>
      )}
      
      {/* Image preview */}
      {imagePreview && (
        <div className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
          <div className="relative">
            <Image
              src={imagePreview}
              alt="Image preview"
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-300">Image attached</p>
            <p className="text-xs text-gray-500 truncate">{imageFile?.name}</p>
          </div>
        </div>
      )}
      
      <div 
        {...getRootProps()}
        className={`relative bg-gray-800/80 backdrop-blur-sm rounded-2xl border transition-all duration-200 ${
          isFocused || isDragActive || isDragOver
            ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' 
            : 'border-gray-600/50'
        } ${isDragActive || isDragOver ? 'bg-blue-500/5 border-blue-400' : ''}`}
      >
        {/* Drag overlay */}
        {(isDragActive || isDragOver) && (
          <div className="absolute inset-0 bg-blue-500/10 border-2 border-dashed border-blue-500/50 rounded-2xl flex items-center justify-center z-10">
            <div className="text-center">
              <svg className="w-8 h-8 text-blue-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-blue-400 text-sm font-medium">Drop your image here</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-3 p-4">
          {/* Image upload button */}
          <div className="flex-shrink-0">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer p-2 rounded-xl hover:bg-gray-700/50 transition-colors group flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </label>
          </div>
          
          {/* Message input */}
          <textarea
            ref={inputRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Tanya saya apa saja tentang pelajaran Anda... (Drag & drop gambar atau tempel dari clipboard)"
            className="flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none resize-none min-h-[24px] max-h-[120px] py-0"
            rows={1}
            disabled={isLoading}
          />
          
          {/* Send button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || (!message.trim() && !imageFile)}
            className={`flex-shrink-0 p-2 rounded-xl transition-all duration-200 ${
              isLoading || (!message.trim() && !imageFile)
                ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>
        
        <input {...getInputProps()} />
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        Tekan Enter untuk mengirim • Shift + Enter untuk baris baru • Drag & drop gambar di mana saja • Ctrl+V untuk menempel gambar
      </p>
    </div>
  );
}