
'use client'
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { mockReports } from '@/lib/mock-data';
import { MapFilters } from '@/components/map/map-filters';
import type { Report, ReportCategory, ReportStatus } from '@/types';
import { useFilterStore } from '@/store/filters';

const ReportsMap = dynamic(() => import('@/components/map/reports-map'), {
  ssr: false,
});

export default function MapaPage() {
  const { searchTerm, selectedStatuses, selectedCategories, setSearchTerm, setSelectedStatuses, setSelectedCategories } = useFilterStore();
  
  const filteredReports = useMemo(() => {
    return mockReports
      .filter(report => {
        // Filter by search term (title or description)
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          return (
            report.title.toLowerCase().includes(term) ||
            report.description.toLowerCase().includes(term)
          );
        }
        return true;
      })
      .filter(report => {
        // Filter by status
        if (selectedStatuses.length > 0) {
          return selectedStatuses.includes(report.status);
        }
        return true;
      })
      .filter(report => {
        // Filter by category
        if (selectedCategories.length > 0) {
            return selectedCategories.includes(report.category);
        }
        return true;
      });
  }, [mockReports, searchTerm, selectedStatuses, selectedCategories]);

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      <MapFilters />
      <div className="absolute inset-0 z-0">
        <ReportsMap reports={filteredReports} center={[-34.45, -59.5]} zoom={10} className="h-full w-full" />
      </div>
    </div>
  );
}
