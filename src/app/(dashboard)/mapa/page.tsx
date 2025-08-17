
'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { mockReports } from '@/lib/mock-data';
import { ReportCategory, ReportStatus } from '@/types';
import { ListFilter } from 'lucide-react';

const ReportsMap = dynamic(() => import('@/components/map/reports-map'), {
  ssr: false,
});

const categories: { id: ReportCategory, name: string }[] = [
    { id: 'baches', name: 'Baches' },
    { id: 'alumbrado', name: 'Alumbrado' },
    { id: 'basura', name: 'Basura' },
    { id: 'senalizacion', name: 'Señalización' },
    { id: 'espacios_verdes', name: 'Espacios Verdes' },
    { id: 'infraestructura', name: 'Infraestructura' },
    { id: 'otros', name: 'Otros' },
];

export default function MapaPage() {
  const [filteredReports, setFilteredReports] = useState(mockReports);

  // In a real app, these would be managed with state and affect `filteredReports`
  const handleFilterChange = () => {
    // This is a placeholder for filter logic
    console.log("Filtering reports...");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <ReportsMap reports={filteredReports} />
      </div>
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListFilter className="w-5 h-5" />
              Filtrar Reportes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Categorías</Label>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox id={category.id} />
                    <label
                      htmlFor={category.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="status-select">Estado</Label>
              <Select>
                <SelectTrigger id="status-select">
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="in_progress">En Proceso</SelectItem>
                  <SelectItem value="resolved">Resuelto</SelectItem>
                  <SelectItem value="rejected">Rechazado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
                <Label htmlFor="radius-slider">Radio de búsqueda (km)</Label>
                <div className="flex items-center gap-4">
                    <Slider defaultValue={[5]} max={20} step={1} id="radius-slider" />
                    <span className="text-sm font-medium w-8 text-center">5</span>
                </div>
            </div>

            <Button className="w-full" onClick={handleFilterChange}>
              Aplicar Filtros
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
