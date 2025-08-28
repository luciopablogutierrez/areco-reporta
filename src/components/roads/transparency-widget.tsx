
'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, CloudRain, Wind } from "lucide-react"

export function TransparencyWidget() {
    return (
        <Card>
            <CardContent className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-2">
                        <CloudRain className="w-6 h-6 text-primary" />
                        <div>
                            <p className="font-bold text-lg">5 mm</p>
                            <p className="text-xs text-muted-foreground">Lluvia (24hs)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wind className="w-6 h-6 text-primary" />
                        <div>
                            <p className="font-bold text-lg">12 km/h</p>
                            <p className="text-xs text-muted-foreground">Viento</p>
                        </div>
                    </div>
                </div>
                <Button asChild variant="outline">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Portal de Transparencia
                    </a>
                </Button>
            </CardContent>
        </Card>
    )
}
