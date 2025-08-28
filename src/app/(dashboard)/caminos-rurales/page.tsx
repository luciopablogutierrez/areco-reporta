
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
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const ReportsMap = dynamic(() => import('@/components/map/reports-map'), {
  ssr: false,
});

export default function CaminosRuralesPage() {
  const [selectedRoad, setSelectedRoad] = useState<RuralRoad | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([-34.25, -59.48]);
  const [mapZoom, setMapZoom] = useState<number>(12);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleRoadSelect = (road: RuralRoad) => {
    setSelectedRoad(road);
    if (road.coordinates.length > 0) {
      setMapCenter(road.coordinates[0] as LatLngTuple);
      setMapZoom(14);
    }
  };

  const handleSubscribe = (road: RuralRoad) => {
    toast({
        title: "Suscripción Activada",
        description: `Recibirás notificaciones sobre el estado del camino '${road.name}'.`,
    });
  };

  const handleSheetClose = () => {
    setSelectedRoad(null);
  };

  return (
    <div className="space-y-6">
        <header>
            <h1 className="text-3xl font-bold flex items-center gap-3">
                <Tractor className="w-8 h-8 text-primary"/>
                Estado de Caminos Rurales
            </h1>
            <p className="text-muted-foreground">Información sobre la transitabilidad de la red vial rural de San Antonio de Areco.</p>
        </header>
        
        <TransparencyWidget />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start h-[calc(100vh-20rem)]">
            <div className="md:col-span-1 lg:col-span-1 h-full">
                <RuralRoadsList 
                    roads={mockRuralRoads} 
                    onRoadSelect={handleRoadSelect}
                    selectedRoadId={selectedRoad?.id}
                    onSubscribe={handleSubscribe}
                />
            </div>
            <div className="hidden md:block md:col-span-2 lg:col-span-3 h-full">
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

        {isMobile && selectedRoad && (
            <Sheet open={!!selectedRoad} onOpenChange={(open) => !open && handleSheetClose()}>
                <SheetContent side="bottom" className="h-[85vh] flex flex-col p-0">
                   <SheetHeader className="p-4">
                        <SheetTitle>{selectedRoad.name}</SheetTitle>
                        <SheetDescription>{selectedRoad.description}</SheetDescription>
                   </SheetHeader>
                   <div className="flex-grow">
                        <ReportsMap 
                            center={mapCenter}
                            zoom={mapZoom}
                            className="h-full w-full"
                            roads={mockRuralRoads}
                            reports={[]}
                            selectedRoadId={selectedRoad?.id}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        )}
    </div>
  );
}
