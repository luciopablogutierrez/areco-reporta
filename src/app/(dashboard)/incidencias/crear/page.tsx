
'use client'

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Camera, Home, Mail, MapPin, Phone, Search, Loader2 } from 'lucide-react';
import { mockReports } from '@/lib/mock-data';
import type { Report } from '@/types';
import { useToast } from '@/hooks/use-toast';

const ReportsMap = dynamic(() => import('@/components/map/reports-map'), {
  ssr: false,
});

interface NominatimResult {
    place_id: number;
    lat: string;
    lon: string;
    display_name: string;
}


export default function CrearIncidenciaPage() {
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [mapCenter, setMapCenter] = useState<[number, number]>([-34.23, -59.48]);
    const [reports, setReports] = useState<Report[]>(mockReports);
    const [addressQuery, setAddressQuery] = useState('');
    const [addressResults, setAddressResults] = useState<NominatimResult[]>([]);
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);
    const { toast } = useToast();


    const handleMapClick = (latlng: { lat: number; lng: number }) => {
        setSelectedLocation(latlng);
        setMapCenter([latlng.lat, latlng.lng]);
    };

    const handleSearchAddress = useCallback(async () => {
        if (addressQuery.length < 5) {
            setAddressResults([]);
            return;
        };
        setIsLoadingAddress(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressQuery + ', San Antonio de Areco, Buenos Aires, Argentina')}&format=json&limit=5`);
            const data: NominatimResult[] = await response.json();
            setAddressResults(data);
        } catch (error) {
            console.error('Error fetching address:', error);
            toast({
                title: "Error de Búsqueda",
                description: "No se pudo buscar la dirección. Intente de nuevo.",
                variant: "destructive",
            });
        } finally {
            setIsLoadingAddress(false);
        }
    }, [addressQuery, toast]);

    const handleSelectAddress = (result: NominatimResult) => {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        setAddressQuery(result.display_name);
        setSelectedLocation({ lat, lng });
        setMapCenter([lat, lng]);
        setAddressResults([]);
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
                            <Input 
                                id="location" 
                                placeholder="Escriba la calle para buscar..." 
                                className="pl-10"
                                value={addressQuery}
                                onChange={(e) => setAddressQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSearchAddress();
                                    }
                                }}
                            />
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="absolute right-1 top-1/2 -translate-y-1/2"
                                onClick={handleSearchAddress}
                                disabled={isLoadingAddress}
                            >
                                {isLoadingAddress ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                            </Button>
                        </div>
                        {addressResults.length > 0 && (
                            <div className="relative">
                                <ul className="absolute z-10 w-full bg-card border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                                    {addressResults.map((result) => (
                                        <li 
                                            key={result.place_id} 
                                            className="px-4 py-2 cursor-pointer hover:bg-accent"
                                            onClick={() => handleSelectAddress(result)}
                                        >
                                            <p className="text-sm font-medium">{result.display_name}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
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
            <ReportsMap 
                reports={reports} 
                onMapClick={handleMapClick} 
                center={mapCenter} 
                zoom={14} 
                className="h-full w-full rounded-lg shadow-lg"
                selectedLocation={selectedLocation}
            />
        </div>
      </div>
    </div>
  );
}

    