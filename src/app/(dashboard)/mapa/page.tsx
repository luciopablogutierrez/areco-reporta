
'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { mockReports } from '@/lib/mock-data';

const ReportsMap = dynamic(() => import('@/components/map/reports-map'), {
  ssr: false,
});

export default function MapaPage() {
  const [filteredReports, setFilteredReports] = useState(mockReports);

  return (
    <div className="h-[calc(100vh-8rem)] w-full">
        <ReportsMap reports={filteredReports} center={[-34.27, -59.4]} zoom={11} className="h-full w-full rounded-lg shadow-lg" />
    </div>
  );
}
