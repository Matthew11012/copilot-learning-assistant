'use client';

import { Material } from '../types';
import RecommendationCard from './RecommendationCard';

interface RecommendationsCarouselProps {
  materials: Material[];
}

export default function RecommendationsCarousel({ materials }: RecommendationsCarouselProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
      {materials.map((material) => (
        <RecommendationCard key={material.id} material={material} />
      ))}
    </div>
  );
}