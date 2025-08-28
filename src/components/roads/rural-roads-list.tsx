
'use client'

import type { RuralRoad, RuralRoadStatus } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Bell, Map } from "lucide-react"
import { Button } from "../ui/button"

interface RuralRoadsListProps {
    roads: RuralRoad[]
    onRoadSelect: (road: RuralRoad) => void
    selectedRoadId?: string | null
    onSubscribe: (road: RuralRoad) => void
}

const statusColors: Record<RuralRoadStatus, string> = {
    'Verde': 'bg-green-500',
    'Amarillo': 'bg-amber-500',
    'Rojo': 'bg-red-500',
}

const statusBorderColors: Record<RuralRoadStatus, string> = {
    'Verde': 'border-green-500',
    'Amarillo': 'border-amber-500',
    'Rojo': 'border-red-500',
}


export function RuralRoadsList({ roads, onRoadSelect, selectedRoadId, onSubscribe }: RuralRoadsListProps) {
    const totalRoads = roads.length
    const roadsByStatus = roads.reduce((acc, road) => {
        acc[road.status] = (acc[road.status] || 0) + 1
        return acc
    }, {} as Record<RuralRoadStatus, number>)

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <CardTitle>Lista de Caminos</CardTitle>
                <div className="flex flex-wrap pt-2 gap-4 text-sm text-muted-foreground">
                    {(['Verde', 'Amarillo', 'Rojo'] as RuralRoadStatus[]).map((status) => (
                        <div key={status} className="flex items-center gap-2 font-medium">
                            <span className={cn("w-3 h-3 rounded-full", statusColors[status])} />
                            <span>{status}:</span>
                            <span className="text-foreground">{roadsByStatus[status] || 0}</span>
                        </div>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-grow overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="divide-y divide-border">
                    {roads.map(road => (
                        <div 
                            key={road.id} 
                            className={cn(
                                "p-3 cursor-pointer hover:bg-accent/50 transition-colors group",
                                selectedRoadId === road.id && !('ontouchstart' in window) && "bg-accent"
                            )}
                            onClick={() => onRoadSelect(road)}
                        >
                            <div className="flex justify-between items-start gap-2">
                                <div className="flex-grow">
                                    <span className="font-medium pr-2">{road.name}</span>
                                    <p className="text-sm text-muted-foreground mt-1">{road.description}</p>
                                </div>
                                <span className={cn(
                                    "w-4 h-4 mt-1 rounded-full border-2 flex-shrink-0", 
                                    statusBorderColors[road.status], 
                                    statusColors[road.status]
                                )}></span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-xs text-muted-foreground">
                                    Act. {format(road.updatedAt.toDate(), "dd/MM/yy, HH:mm 'hs'", { locale: es })}
                                </p>
                                <div className="flex items-center gap-1">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-muted-foreground hover:text-primary md:hidden"
                                        aria-label="Ver en mapa"
                                    >
                                        <Map className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSubscribe(road);
                                        }}
                                        aria-label="Suscribirse a notificaciones"
                                    >
                                        <Bell className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
