
'use client'
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { mockRuralRoads } from '@/lib/mock-roads';
import { MapFilters } from '@/components/map/map-filters';
import type { RuralRoad } from '@/types';

const ReportsMap = dynamic(() => import('@/components/map/reports-map'), {
  ssr: false,
});

export default function CaminosRuralesPage() {
  
  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      <div className="absolute inset-0 z-0">
        <ReportsMap 
            center={[-34.25, -59.48]} 
            zoom={12} 
            className="h-full w-full"
            roads={mockRuralRoads}
            reports={[]}
        />
      </div>
    </div>
  );
}
