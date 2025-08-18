'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Camera, Home, Mail, MapPin, Phone, Search } from 'lucide-react';
import { mockReports } from '@/lib/mock-data';
import type { Report } from '@/types';

const ReportsMap = dynamic(() => import('@/components/map/reports-map'), {
  ssr: false,
});

export default function CrearIncidenciaPage() {
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [reports, setReports] = useState<Report[]>(mockReports);

    const handleMapClick = (latlng: { lat: number; lng: number }) => {
        setSelectedLocation(latlng);
        // You could also reverse-geocode here to get an address
    };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Crear Incidencia</h1>
                <p className="text-muted-foreground">Reporta un problema en tu comunidad para que podamos solucionarlo.</p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle>Detalles de la Incidencia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="location">Ubicación de la incidencia *</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="location" placeholder="Escriba la calle o haga clic en el mapa" className="pl-10" />
                            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
                                <Search className="h-5 w-5" />
                            </Button>
                        </div>
                         {selectedLocation && (
                            <p className="text-xs text-muted-foreground">
                                Coordenadas seleccionadas: {selectedLocation.lat.toFixed(5)}, {selectedLocation.lng.toFixed(5)}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address-details">Detalles de la dirección</Label>
                        <Input id="address-details" placeholder="Por ejemplo: En la zona de aparcamiento (opcional)" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción de la incidencia *</Label>
                        <Textarea id="description" placeholder="Por ejemplo: Hay tres bolsas de basura en la zona de aparcamiento del supermercado" rows={4}/>
                    </div>
                    <div className="space-y-2">
                        <Label>Agregar foto</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                            <Camera className="h-10 w-10 text-muted-foreground mb-2"/>
                            <p className="text-sm text-muted-foreground mb-2">Arrastra y suelta tus fotos aquí o</p>
                            <Button variant="outline" asChild>
                                <label htmlFor="photo-upload">
                                    Seleccionar Archivos
                                    <input id="photo-upload" type="file" className="sr-only" multiple accept="image/*" />
                                </label>
                            </Button>
                             <p className="text-xs text-muted-foreground mt-2">Puedes añadir hasta 50 MB de archivos adjuntos</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="share-data" defaultChecked />
                        <Label htmlFor="share-data" className="font-normal text-sm">Compartir los datos en el mapa público</Label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Mis Datos</CardTitle>
                     <CardDescription>
                        Estos datos no se mostrarán públicamente. Se facilitan a la organización para la gestión.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Al crear una incidencia usted se compromete a aceptar nuestros <a href="#" className="text-primary hover:underline">términos y condiciones</a>.
                    </p>
                     <div className="space-y-2">
                        <Label htmlFor="contact-address">Dirección (Opcional)</Label>
                        <div className="relative">
                            <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="contact-address" placeholder="Ingrese aquí la dirección del notificador (opcional)" className="pl-10" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Datos de contacto</Label>
                         <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="email" type="email" placeholder="lucio.gutierrez@gmail.com" defaultValue="lucio.gutierrez@gmail.com" className="pl-10" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone">Número de teléfono</Label>
                        <div className="relative">
                             <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="phone" type="tel" placeholder="Ingrese aquí el número de teléfono" className="pl-10" />
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Button size="lg" className="w-full">
                Enviar Incidencia
            </Button>
        </div>
        <div className="h-[calc(100vh-8rem)] sticky top-8">
            <ReportsMap reports={reports} onMapClick={handleMapClick} center={[-34.23, -59.48]} zoom={11} className="h-full w-full rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
}
