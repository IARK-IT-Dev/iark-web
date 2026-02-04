'use client';

import { useState, useEffect } from 'react';
import { DormCard } from './DormCard';
import { createClient } from '@/lib/supabase/client';

export interface Dormitory {
  id: string;
  name: string;
  city: string;
  province: string;
  image_url: string;
  total_rooms: number;
  occupied_rooms: number;
  description: string;
}

export interface AsramaGallerySectionProps {
  className?: string;
}

export function AsramaGallerySection({ className = '' }: AsramaGallerySectionProps) {
  const [dormitories, setDormitories] = useState<Dormitory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDormitories() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('dormitories')
        .select('*');

      if (error) {
        console.error('Error fetching dormitories:', error);
      } else {
        setDormitories(data || []);
      }
      setLoading(false);
    }

    fetchDormitories();
  }, []);

  return (
    <section className={`relative py-24 px-8 bg-white overflow-hidden ${className}`}>
      {/* Subtle gradient orbs background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-iark-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-iark-yellow/5 rounded-full blur-3xl" />

      {/* Decorative elements */}
      <div className="absolute top-32 right-1/4 w-10 h-10 bg-iark-blue rounded-full opacity-20 animate-pulse-slow" />
      <div className="absolute top-2/3 left-16 w-8 h-8 bg-iark-red rounded-full opacity-20 animate-drift" />
      <div className="absolute bottom-1/4 right-20 w-12 h-12 bg-iark-yellow rounded-full opacity-30 animate-pulse-slow" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Decorative element */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-iark-red/10 rounded-full flex items-center justify-center animate-pulse-slow">
            <div className="w-6 h-6 bg-iark-red rounded-full" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-iark-black">
          Asrama Rumah Kepemimpinan
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Rumah kedua bagi mahasiswa RK tersebar di berbagai kota di Indonesia
        </p>

        {/* Dorm Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-iark-red border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dormitories.map((dorm, index) => (
              <DormCard key={dorm.id} dormitory={dorm} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
