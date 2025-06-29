'use client';

import { Material } from '../types';
import RecommendationCard from './RecommendationCard';

interface RecommendationsCarouselProps {
  materials: Material[];
}

export default function RecommendationsCarousel({ materials }: RecommendationsCarouselProps) {
  return (
    <div className="relative">
      <div 
        className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-custom"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 #1F2937'
        }}
      >
        {materials.map((material) => (
          <RecommendationCard key={material.id} material={material} />
        ))}
      </div>
      
      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          height: 6px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #3B82F6, #8B5CF6);
          border-radius: 3px;
          transition: background 0.2s ease;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #2563EB, #7C3AED);
        }
        
        .scrollbar-custom::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </div>
  );
}