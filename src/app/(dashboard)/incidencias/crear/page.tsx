
'use client'

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Camera, Home, Mail, MapPin, Phone, Search, Loader2, Info, X, Trash2, ShieldCheck, KeyRound } from 'lucide-react';
import { mockReports } from '@/lib/mock-data';
import { mockRuralRoads } from '@/lib/mock-roads';
import type { Report, RuralRoad } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/use-debounce';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { categoryText } from '@/lib/i18n';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ReportsMap = dynamic(() => import('@/components/map/reports-map'), {
  ssr: false,
});

interface NominatimResult {
    place_id: number;
    lat: string;
    lon: string;
    display_name: string;
}

const incidenciaFormSchema = z.object({
    location: z.object({
        lat: z.number(),
        lng: z.number(),
    }, { required_error: "Debe seleccionar una ubicación en el mapa." }),
    addressQuery: z.string().min(1, "La dirección es obligatoria."),
    addressDetails: z.string().optional(),
    category: z.string({ required_error: "Debe seleccionar una categoría."}),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres.").max(500, "Máximo 500 caracteres."),
    images: z.array(z.instanceof(File)).max(5, "Puedes subir un máximo de 5 imágenes.").optional(),
    shareData: z.boolean().default(true),
    contactAddress: z.string().optional(),
    contactEmail: z.string().email("Debe ser un email válido."),
    contactPhone: z.string().min(8, "Debe ser un número de teléfono válido."),
});

type IncidenciaFormValues = z.infer<typeof incidenciaFormSchema>;

function getSqDist(p: {lat: number, lng: number}, p1: {lat: number, lng: number}, p2: {lat: number, lng: number}) {
    let x = p1.lat, y = p1.lng;
    let dx = p2.lat - x, dy = p2.lng - y;

    if (dx !== 0 || dy !== 0) {
        const t = ((p.lat - x) * dx + (p.lng - y) * dy) / (dx * dx + dy * dy);
        if (t > 1) {
            x = p2.lat;
            y = p2.lng;
        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }
    dx = p.lat - x;
    dy = p.lng - y;
    return dx * dx + dy * dy;
}


export default function CrearIncidenciaPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [mapCenter, setMapCenter] = useState<[number, number]>([-34.23, -59.48]);
    
    // Address Search State
    const [addressQuery, setAddressQuery] = useState('');
    const [addressResults, setAddressResults] = useState<NominatimResult[]>([]);
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);
    const debouncedSearchTerm = useDebounce(addressQuery, 500);

    // Verification Flow State
    const [verificationCode, setVerificationCode] = useState("");
    const [isSendingCode, setIsSendingCode] = useState(false);
    const [isVerifyingCode, setIsVerifyingCode] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [generatedCode, setGeneratedCode] = useState("");


    const [roadStatusAlert, setRoadStatusAlert] = useState<{road: RuralRoad} | null>(null);
    

    const form = useForm<IncidenciaFormValues>({
        resolver: zodResolver(incidenciaFormSchema),
        defaultValues: {
            shareData: true,
            images: [],
        },
        mode: 'onBlur'
    });

    const selectedLocation = form.watch('location');
    const imageFiles = form.watch('images') || [];
    const contactEmail = form.watch('contactEmail');

    const checkLocationOnRuralRoad = useCallback((latlng: { lat: number, lng: number }) => {
        const proximityThreshold = 0.00001; 
        let onRoad = null;
        for (const road of mockRuralRoads) {
            for (let i = 0; i < road.coordinates.length - 1; i++) {
                const p1 = { lat: road.coordinates[i][0], lng: road.coordinates[i][1] };
                const p2 = { lat: road.coordinates[i+1][0], lng: road.coordinates[i+1][1] };
                if (getSqDist(latlng, p1, p2) < proximityThreshold) {
                    onRoad = road;
                    break;
                }
            }
            if (onRoad) break;
        }
        if (onRoad && (onRoad.status === 'Amarillo' || onRoad.status === 'Rojo')) {
            setRoadStatusAlert({ road: onRoad });
        } else {
            setRoadStatusAlert(null);
        }
    }, []);

    const handleMapClick = (latlng: { lat: number; lng: number }) => {
        form.setValue('location', latlng, { shouldValidate: true });
        setMapCenter([latlng.lat, latlng.lng]);
        setAddressQuery(`Ubicación en mapa: ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`);
        form.setValue('addressQuery', `Ubicación en mapa: ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`);
        checkLocationOnRuralRoad(latlng);
    };

    const handleSearchAddress = useCallback(async (query: string) => {
        if (query.length < 5 || query.startsWith("Ubicación en mapa")) return;
        setIsLoadingAddress(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', San Antonio de Areco, Buenos Aires, Argentina')}&format=json&limit=5`);
            const data: NominatimResult[] = await response.json();
            setAddressResults(data);
        } catch (error) {
            console.error('Error fetching address:', error);
            toast({ title: "Error de Búsqueda", description: "No se pudo buscar la dirección.", variant: "destructive" });
        } finally {
            setIsLoadingAddress(false);
        }
    }, [toast]);

    useEffect(() => {
        if (debouncedSearchTerm) handleSearchAddress(debouncedSearchTerm);
        else setAddressResults([]);
    }, [debouncedSearchTerm, handleSearchAddress]);

    const handleSelectAddress = (result: NominatimResult) => {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        const location = { lat, lng };

        setAddressQuery(result.display_name);
        form.setValue('addressQuery', result.display_name);
        form.setValue('location', location, { shouldValidate: true });
        setMapCenter([lat, lng]);
        setAddressResults([]);
        checkLocationOnRuralRoad(location);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const currentFiles = form.getValues('images') || [];
            form.setValue('images', [...currentFiles, ...files]);
        }
    };
    
    const handleRemoveImage = (index: number) => {
        const currentFiles = form.getValues('images') || [];
        form.setValue('images', currentFiles.filter((_, i) => i !== index));
    };

    const handleSendVerificationCode = async () => {
        const isEmailValid = await form.trigger('contactEmail');
        if (!isEmailValid) return;
        
        setIsSendingCode(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(code);
        setIsCodeSent(true);
        setIsSendingCode(false);

        toast({
            title: "Código de Verificación Enviado",
            description: `Hemos enviado un código a ${contactEmail}. (Código para demo: ${code})`,
            duration: 10000,
        });
    };

    const handleVerifyCode = async () => {
        setIsVerifyingCode(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (verificationCode === generatedCode) {
            setIsVerified(true);
            toast({
                title: "¡Email Verificado!",
                description: "Ahora puedes completar y enviar tu incidencia.",
            });
        } else {
            toast({
                title: "Código Incorrecto",
                description: "El código que ingresaste no es válido. Inténtalo de nuevo.",
                variant: "destructive",
            });
        }
        setIsVerifyingCode(false);
    };

    function onSubmit(data: IncidenciaFormValues) {
        console.log(data);
        toast({
          title: "Incidencia Enviada Correctamente",
          description: "Gracias por tu colaboración. Tu reporte ha sido registrado.",
        });
        router.push('/reportes');
    }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Crear Incidencia</h1>
                <p className="text-muted-foreground">Reporta un problema en tu comunidad para que podamos solucionarlo.</p>
            </header>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="text-primary"/>
                        Verificación de Contacto
                    </CardTitle>
                    <CardDescription>
                        Para asegurar la validez del reporte, por favor verifica tu email. Estos datos son obligatorios y no se mostrarán públicamente.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <fieldset disabled={isVerified} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email de contacto *</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="tu@email.com"
                                    icon={<Mail />}
                                    button={!isCodeSent && {
                                        label: "Enviar Código",
                                        onClick: handleSendVerificationCode,
                                        loading: isSendingCode,
                                        disabled: !contactEmail || !!form.getFieldState('contactEmail').error
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Celular o Teléfono *</FormLabel>
                            <FormControl>
                                <Input
                                type="tel"
                                placeholder="Tu número de teléfono"
                                icon={<Phone />}
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </fieldset>
                    
                     {isCodeSent && !isVerified && (
                        <div className="space-y-4 pt-4 border-t">
                             <FormField
                                control={form.control}
                                name="verificationCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Código de Verificación *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ingresa el código de 6 dígitos"
                                                icon={<KeyRound />}
                                                value={verificationCode}
                                                onChange={(e) => setVerificationCode(e.target.value)}
                                                maxLength={6}
                                                button={{
                                                    label: "Verificar Código",
                                                    onClick: handleVerifyCode,
                                                    loading: isVerifyingCode,
                                                    disabled: verificationCode.length !== 6,
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </div>
                    )}
                    {isVerified && (
                        <Alert variant="default" className="bg-green-50 border-green-200">
                           <ShieldCheck className="h-4 w-4 text-green-600" />
                           <AlertTitle className="text-green-800">Contacto Verificado</AlertTitle>
                           <AlertDescription className="text-green-700">
                               ¡Gracias! Ahora puedes completar los detalles de la incidencia a continuación.
                           </AlertDescription>
                       </Alert>
                    )}
                </CardContent>
            </Card>

            <fieldset disabled={!isVerified} className={cn("space-y-6 transition-opacity", !isVerified && "opacity-50 cursor-not-allowed")}>
                <Card>
                    <CardHeader>
                        <CardTitle>Detalles de la Incidencia</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Ubicación de la incidencia *</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Escriba la calle para buscar o haga click en el mapa..." 
                                    icon={<MapPin/>}
                                    value={addressQuery}
                                    onChange={(e) => {
                                        setAddressQuery(e.target.value);
                                        form.setValue('addressQuery', e.target.value);
                                    }}
                                    endIcon={isLoadingAddress ? <Loader2 className="animate-spin" /> : <Search />}
                                />
                            </FormControl>
                            {addressResults.length > 0 && (
                                <div className="relative z-10 w-full">
                                <ul className="absolute w-full bg-card border rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {addressResults.map((result) => (
                                        <li key={result.place_id} className="px-4 py-2 cursor-pointer hover:bg-accent" onClick={() => handleSelectAddress(result)}>
                                            <p className="text-sm font-medium">{result.display_name}</p>
                                        </li>
                                    ))}
                                </ul>
                                </div>
                            )}
                            <FormMessage />
                            {roadStatusAlert && (
                                <Alert className="mt-4" variant={roadStatusAlert.road.status === 'Rojo' ? 'destructive' : 'default'}>
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Atención: Camino con Transitabilidad Limitada</AlertTitle>
                                    <AlertDescription>
                                        El camino '{roadStatusAlert.road.name}' se encuentra en estado '{roadStatusAlert.road.status}'. 
                                        {roadStatusAlert.road.description}
                                    </AlertDescription>
                                </Alert>
                            )}
                            </FormItem>
                        )}
                        />
                        
                        <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Categoría *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccione una categoría para el reporte" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {Object.entries(categoryText).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Descripción de la incidencia *</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Por ejemplo: Hay tres bolsas de basura en la zona de aparcamiento del supermercado" rows={4} {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Agregar foto (opcional)</FormLabel>
                            <FormControl>
                                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                                    <Camera className="h-10 w-10 text-muted-foreground mb-2"/>
                                    <p className="text-sm text-muted-foreground mb-2">Arrastra y suelta tus fotos aquí o</p>
                                    <Button variant="outline" asChild>
                                        <label htmlFor="photo-upload">
                                            Seleccionar Archivos
                                            <input id="photo-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleFileChange} />
                                        </label>
                                    </Button>
                                    <p className="text-xs text-muted-foreground mt-2">Puedes añadir hasta 5 imágenes.</p>
                                </div>
                            </FormControl>
                            {imageFiles.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                    {imageFiles.map((file, index) => (
                                        <div key={index} className="relative group aspect-square">
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={`previsualización ${index + 1}`}
                                                fill
                                                className="rounded-md object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                        <FormField
                        control={form.control}
                        name="shareData"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <Label htmlFor="share-data" className="font-normal text-sm">Compartir los datos en el mapa público</Label>
                            </div>
                            </FormItem>
                        )}
                        />
                    </CardContent>
                </Card>
            
                <Button type="submit" size="lg" className="w-full" disabled={!form.formState.isValid || !selectedLocation}>
                    Enviar Incidencia
                </Button>
            </fieldset>
        </div>
        <div className="h-[calc(100vh-8rem)] sticky top-8">
            <div className={cn("absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center transition-opacity", isVerified ? "opacity-0 pointer-events-none" : "opacity-100")}>
                <div className="text-center p-4 bg-background/80 rounded-lg shadow-xl">
                    <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="font-semibold text-lg">Verifica tu contacto para continuar</p>
                    <p className="text-muted-foreground text-sm">Completa el paso anterior para habilitar el formulario.</p>
                </div>
            </div>
            <ReportsMap 
                reports={mockReports} 
                roads={mockRuralRoads}
                onMapClick={handleMapClick} 
                center={mapCenter} 
                zoom={14} 
                className="h-full w-full rounded-lg shadow-lg"
                selectedLocation={selectedLocation}
            />
        </div>
      </form>
    </Form>
    </div>
  );
}
