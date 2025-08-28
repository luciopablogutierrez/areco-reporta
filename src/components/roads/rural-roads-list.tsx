
'use client'

import type { RuralRoad, RuralRoadStatus } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

interface RuralRoadsListProps {
    roads: RuralRoad[]
    onRoadSelect: (road: RuralRoad) => void
    selectedRoadId?: string | null
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


export function RuralRoadsList({ roads, onRoadSelect, selectedRoadId }: RuralRoadsListProps) {
    const totalRoads = roads.length
    const roadsByStatus = roads.reduce((acc, road) => {
        acc[road.status] = (acc[road.status] || 0) + 1
        return acc
    }, {} as Record<RuralRoadStatus, number>)

    return (
        <Card className="h-[calc(100vh-14rem)] flex flex-col">
            <CardHeader>
                <CardTitle>Lista de Caminos</CardTitle>
                <CardDescription>
                    {totalRoads} caminos monitoreados. Seleccione uno para ver detalles.
                </CardDescription>
                <div className="flex pt-2 gap-2">
                    {Object.entries(roadsByStatus).map(([status, count]) => (
                        <div key={status} className="flex items-center gap-2 text-sm">
                            <span className={cn("w-3 h-3 rounded-full", statusColors[status as RuralRoadStatus])} />
                            <span>{count}</span>
                        </div>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
                <ScrollArea className="h-full">
                    <div className="divide-y divide-border">
                    {roads.map(road => (
                        <div 
                            key={road.id} 
                            onClick={() => onRoadSelect(road)}
                            className={cn(
                                "p-4 cursor-pointer hover:bg-accent transition-colors",
                                selectedRoadId === road.id && "bg-accent"
                            )}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{road.name}</span>
                                <span className={cn(
                                    "w-4 h-4 rounded-full border-2", 
                                    statusBorderColors[road.status], 
                                    statusColors[road.status]
                                )}></span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{road.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                                Act. {formatDistanceToNow(road.updatedAt.toDate(), { addSuffix: true, locale: es })}
                            </p>
                        </div>
                    ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
