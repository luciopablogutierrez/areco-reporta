
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { categoryText } from "@/lib/i18n";
import { ReportCategory, RuralRoadStatus } from "@/types";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";

const reportCategoryColors: Record<ReportCategory, string> = {
    'baches': 'bg-red-500',
    'alumbrado': 'bg-amber-500',
    'basura': 'bg-teal-500',
    'senalizacion': 'bg-blue-500',
    'espacios_verdes': 'bg-green-500',
    'infraestructura': 'bg-purple-600',
    'accesibilidad': 'bg-fuchsia-600',
    'otros': 'bg-gray-500',
};

const roadStatusStyles: Record<RuralRoadStatus, { color: string, style: string, text: string }> = {
    'Verde': { color: 'bg-green-500', style: 'border-solid', text: "Transitable" },
    'Amarillo': { color: 'bg-amber-500', style: 'border-dashed', text: "Con Precaución" },
    'Rojo': { color: 'bg-red-500', style: 'border-dotted', text: "Intransitable" },
};

export function MapLegend() {
    return (
        <div className="absolute bottom-4 right-4 z-10 w-full max-w-xs">
            <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1" className="border-none">
                    <Card>
                        <AccordionTrigger className="p-4">
                            <CardHeader className="p-0 flex-row items-center gap-3">
                                <HelpCircle className="w-6 h-6 text-primary" />
                                <CardTitle>Leyenda del Mapa</CardTitle>
                            </CardHeader>
                        </AccordionTrigger>
                        <AccordionContent>
                            <CardContent className="space-y-4 pt-0">
                                <div>
                                    <h4 className="font-semibold mb-2 text-sm">Reportes Ciudadanos</h4>
                                    <div className="space-y-1">
                                        {Object.entries(categoryText).map(([key, label]) => (
                                            <div key={key} className="flex items-center gap-3">
                                                <div className={cn("w-4 h-4 rounded-full flex-shrink-0", reportCategoryColors[key as ReportCategory])} />
                                                <span className="text-xs">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 text-sm">Estado de Caminos Rurales</h4>
                                    <div className="space-y-2">
                                        {Object.entries(roadStatusStyles).map(([status, { color, text }]) => (
                                            <div key={status} className="flex items-center gap-3">
                                                 <div className={cn("w-4 h-4 rounded-full flex-shrink-0", color)} />
                                                <div className="flex-grow">
                                                    <p className="text-xs font-medium">{status}</p>
                                                    <p className="text-xs text-muted-foreground">{text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
