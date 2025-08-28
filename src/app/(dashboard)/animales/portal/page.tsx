
'use client'

import React from 'react';
import { AlertCard } from "@/components/pets/alert-card";
import { useAlertStore } from "@/store/alerts";
import { usePetFilterStore } from "@/store/petFilters";
import { Dog, Search } from "lucide-react";
import { PetFilters } from '@/components/pets/pet-filters';
import { locationTagMap } from '@/lib/i18n';

export default function PortalPage() {
    const alerts = useAlertStore((state) => state.alerts);
    const { searchTerm, selectedTypes, selectedLocation } = usePetFilterStore();
    
    const filteredAlerts = React.useMemo(() => {
        return alerts.filter(alert => {
            const term = searchTerm.toLowerCase();
            const searchMatch = term ? 
                alert.pet.name.toLowerCase().includes(term) || 
                alert.lastSeenLocation.toLowerCase().includes(term) ||
                alert.pet.breed.toLowerCase().includes(term) : true;
            
            const typeMatch = selectedTypes.length > 0 ? selectedTypes.includes(alert.pet.type) : true;
            
            // Note: This location filter is a simple string match. 
            // In a real app, this would likely be a more robust geo-search.
            const locationMatch = selectedLocation ? alert.lastSeenLocation.toLowerCase().includes(selectedLocation.toLowerCase()) : true;

            return searchMatch && typeMatch && locationMatch && alert.status === 'active';
        });
    }, [alerts, searchTerm, selectedTypes, selectedLocation]);

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
                <Dog className="w-8 h-8 text-primary"/>
                Portal de Animales
            </h1>
            <p className="text-muted-foreground">Alertas de búsqueda, adopciones y noticias de la comunidad.</p>
        </div>

        <PetFilters />
        
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Alertas de Búsqueda Recientes</h2>
                <p className="text-muted-foreground">Animales perdidos reportados por la comunidad. Ayúdanos a encontrarlos.</p>
            </div>
            {filteredAlerts.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAlerts.map(alert => (
                        <AlertCard key={alert.id} alert={alert} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center">
                    <Search className="w-12 h-12 text-muted-foreground mb-4"/>
                    <h3 className="text-xl font-semibold">No se encontraron alertas</h3>
                    <p className="text-muted-foreground mt-2 max-w-sm">Prueba a cambiar los filtros de búsqueda o revisa más tarde.</p>
                </div>
            )}
        </div>
    </div>
  );
}
