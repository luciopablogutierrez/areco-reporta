
'use client'
import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { mockReports } from '@/lib/mock-data';
import { MapFilters } from '@/components/map/map-filters';
import type { Report, ReportStatus } from '@/types';

const ReportsMap = dynamic(() => import('@/components/map/reports-map'), {
  ssr: false,
});

export default function MapaPage() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<ReportStatus[]>([]);

  const filteredReports = useMemo(() => {
    return reports
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
      });
  }, [reports, searchTerm, selectedStatuses]);

  const handleFilterChange = (statuses: ReportStatus[]) => {
    setSelectedStatuses(statuses);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      <MapFilters onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />
      <div className="absolute inset-0 z-0">
        <ReportsMap reports={filteredReports} center={[-34.23, -59.48]} zoom={11} className="h-full w-full" />
      </div>
    </div>
  );
}
