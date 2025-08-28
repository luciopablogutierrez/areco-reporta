
'use client'

import { AlertCard } from "@/components/pets/alert-card";
import { useAlertStore } from "@/store/alerts";
import { Dog } from "lucide-react";

export default function PortalPage() {
    const alerts = useAlertStore((state) => state.alerts);
    const activeAlerts = alerts.filter(alert => alert.status === 'active');

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
                <Dog className="w-8 h-8 text-primary"/>
                Portal de Animales
            </h1>
            <p className="text-muted-foreground">Alertas de búsqueda, adopciones y noticias de la comunidad.</p>
        </div>
        
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Alertas de Búsqueda Recientes</h2>
                <p className="text-muted-foreground">Animales perdidos reportados por la comunidad. Ayúdanos a encontrarlos.</p>
            </div>
            {activeAlerts.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activeAlerts.map(alert => (
                        <AlertCard key={alert.id} alert={alert} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <h3 className="text-xl font-semibold">No hay alertas activas</h3>
                    <p className="text-muted-foreground mt-2">Por el momento, no hay animales reportados como perdidos.</p>
                </div>
            )}
        </div>
    </div>
  );
}
