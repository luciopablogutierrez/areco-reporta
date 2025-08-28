
'use client'

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, CloudRain, Wind, Calendar, Loader2 } from "lucide-react"
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface WeatherData {
    rain: number;
    wind: number;
    lastUpdated: Date;
}

export function TransparencyWidget() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data from a public service
        const timer = setTimeout(() => {
            setWeatherData({
                rain: Math.floor(Math.random() * 10), // Random value between 0-9
                wind: Math.floor(Math.random() * 15) + 5, // Random value between 5-19
                lastUpdated: new Date(),
            });
            setIsLoading(false);
        }, 1500); // Simulate a 1.5-second network delay

        return () => clearTimeout(timer);
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return (
                <>
                    <div className="flex gap-6 items-center">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-24" />
                    </div>
                    <Skeleton className="h-10 w-48" />
                </>
            );
        }

        if (weatherData) {
             return (
                <>
                    <div className="flex flex-wrap gap-x-6 gap-y-4 items-center">
                        <div className="flex items-center gap-2" title={`Lluvia acumulada en las últimas 24 horas. Medición de las ${format(weatherData.lastUpdated, "HH:mm")} hs.`}>
                            <CloudRain className="w-6 h-6 text-primary" />
                            <div>
                                <p className="font-bold text-lg">{weatherData.rain} mm</p>
                                <p className="text-xs text-muted-foreground">Lluvia (24hs)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2" title={`Velocidad del viento. Medición de las ${format(weatherData.lastUpdated, "HH:mm")} hs.`}>
                            <Wind className="w-6 h-6 text-primary" />
                            <div>
                                <p className="font-bold text-lg">{weatherData.wind} km/h</p>
                                <p className="text-xs text-muted-foreground">Viento</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-2" title="Fecha y hora de la última medición de datos.">
                            <Calendar className="w-6 h-6 text-primary" />
                            <div>
                                <p className="font-bold text-lg">{format(weatherData.lastUpdated, "dd/MM/yy")}</p>
                                <p className="text-xs text-muted-foreground">{format(weatherData.lastUpdated, "HH:mm 'hs'")}</p>
                            </div>
                        </div>
                    </div>
                    <Button asChild variant="outline">
                        <a href="https://www.areco.gob.ar/" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Portal de Transparencia
                        </a>
                    </Button>
                </>
            );
        }
        
        return <p className="text-destructive">No se pudieron cargar los datos del clima.</p>;
    }


    return (
        <Card>
            <CardContent className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                {renderContent()}
            </CardContent>
        </Card>
    )
}
