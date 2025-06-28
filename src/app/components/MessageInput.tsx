'use client';

import { useState, useRef } from 'react';
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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Maximum file size 3MB
  const MAX_FILE_SIZE = 3 * 1024 * 1024; 
  
  // Handle file drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    onDrop: (acceptedFiles, rejectedFiles) => {
      // Handle rejected files (too large, wrong type, etc.)
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.file.size > MAX_FILE_SIZE) {
          setImageError('Image too large. Maximum size is 3MB.');
        } else {
          setImageError('Invalid file type. Please upload an image.');
        }
        return;
      }
      
      setImageError(null);
      const file = acceptedFiles[0];
      setImageFile(file);
      
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    },
  });
  
  // Handle message submission
  const handleSubmit = () => {
    if (isLoading || (!message.trim() && !imageFile)) return;
    
    onSendMessage(message, imageFile || undefined);
    setMessage('');
    setImageFile(null);
    
    // Revoke the object URL to avoid memory leaks
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    
    // Focus input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  
  // Handle enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  // Remove image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageError(null);
  };
  
  return (
    <div className="space-y-2">
      {/* Image error message */}
      {imageError && (
        <div className="text-red-500 text-sm">{imageError}</div>
      )}
      
      {/* Image preview */}
      {imagePreview && (
        <div className="relative inline-block">
          <Image
            src={imagePreview}
            alt="Image preview"
            width={100}
            height={100}
            className="rounded-md object-cover"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            aria-label="Remove image"
          >
            ×
          </button>
        </div>
      )}
      
      <div className="flex items-end gap-2">
        {/* Image upload button */}
        <div
          {...getRootProps()}
          className="flex-shrink-0 cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <input {...getInputProps()} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-500 dark:text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
        
        {/* Message input */}
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tanyakan sesuatu tentang pelajaran Anda..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
          rows={1}
          disabled={isLoading}
        />
        
        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || (!message.trim() && !imageFile)}
          className="flex-shrink-0 bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}