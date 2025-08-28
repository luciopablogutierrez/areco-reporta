
'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { mockRuralRoads } from '@/lib/mock-roads';
import type { RuralRoad } from '@/types';
import { RuralRoadsList } from '@/components/roads/rural-roads-list';
import { Tractor } from 'lucide-react';
import { LatLngTuple } from 'leaflet';
import { TransparencyWidget } from '@/components/roads/transparency-widget';
import { useToast } from '@/hooks/use-toast';

const ReportsMap = dynamic(() => import('@/components/map/reports-map'), {
  ssr: false,
});

export default function CaminosRuralesPage() {
  const [selectedRoad, setSelectedRoad] = useState<RuralRoad | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([-34.25, -59.48]);
  const [mapZoom, setMapZoom] = useState<number>(12);
  const { toast } = useToast();

  const handleRoadSelect = (road: RuralRoad) => {
    setSelectedRoad(road);
    // Center map on the first coordinate of the road
    if (road.coordinates.length > 0) {
      setMapCenter(road.coordinates[0] as LatLngTuple);
      setMapZoom(14); // Zoom in closer to the selected road
    }
  };

  const handleSubscribe = (road: RuralRoad) => {
    toast({
        title: "Suscripción Activada",
        description: `Recibirás notificaciones sobre el estado del camino '${road.name}'.`,
    });
  };

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
                <Tractor className="w-8 h-8 text-primary"/>
                Estado de Caminos Rurales
            </h1>
            <p className="text-muted-foreground">Información sobre la transitabilidad de la red vial rural de San Antonio de Areco.</p>
        </div>
        
        <TransparencyWidget />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
                <RuralRoadsList 
                    roads={mockRuralRoads} 
                    onRoadSelect={handleRoadSelect}
                    selectedRoadId={selectedRoad?.id}
                    onSubscribe={handleSubscribe}
                />
            </div>
            <div className="lg:col-span-2 h-[calc(100vh-22rem)] sticky top-8">
                 <ReportsMap 
                    center={mapCenter}
                    zoom={mapZoom}
                    className="h-full w-full rounded-lg shadow-lg"
                    roads={mockRuralRoads}
                    reports={[]}
                    selectedRoadId={selectedRoad?.id}
                />
            </div>
        </div>
    </div>
  );
}
