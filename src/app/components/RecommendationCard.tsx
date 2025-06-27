'use client';

import { Material } from '../types';
import Image from 'next/image';

interface RecommendationCardProps {
  material: Material;
}

export default function RecommendationCard({ material }: RecommendationCardProps) {
  // Get icon based on material type
  const getTypeIcon = () => {
    switch (material.type) {
      case 'video':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        );
      case 'article':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        );
      case 'pdf':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  // Get level badge color
  const getLevelColor = () => {
    switch (material.level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <a
      href={material.contentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-64 bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Thumbnail */}
      <div className="relative h-32 w-full">
        <Image
          src={material.thumbnailUrl}
          alt={material.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
          {getTypeIcon()}
          <span>{material.type}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
            {material.title}
          </h3>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
          {material.summary}
        </p>
        
        <div className="flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded ${getLevelColor()}`}>
            {material.level}
          </span>
          
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {material.topic}
          </span>
        </div>
      </div>
    </a>
  );
}