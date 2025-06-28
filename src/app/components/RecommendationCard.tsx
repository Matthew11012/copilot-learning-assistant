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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1" />
          </svg>
        );
      case 'article':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'pdf':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <a
      href={material.contentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 w-72 bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
    >
      {/* Thumbnail */}
      <div className="relative h-36 w-full overflow-hidden">
        <Image
          src={material.thumbnailUrl}
          alt={material.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Type badge */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
          {getTypeIcon()}
          <span className="capitalize">{material.type}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-100 line-clamp-1 group-hover:text-blue-400 transition-colors">
            {material.title}
          </h3>
        </div>
        
        <p className="text-sm text-gray-300 line-clamp-2 mb-3 leading-relaxed">
          {material.summary}
        </p>
        
        <div className="flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded-md border ${getLevelColor()}`}>
            {material.level}
          </span>
          
          <span className="text-xs text-gray-400 capitalize bg-gray-700/50 px-2 py-1 rounded-md">
            {material.topic}
          </span>
        </div>
      </div>
    </a>
  );
}