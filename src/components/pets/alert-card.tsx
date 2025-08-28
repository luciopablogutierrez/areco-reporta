
'use client'

import type { PetAlert } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { MapPin, Phone, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AlertCardProps {
  alert: PetAlert;
}

export function AlertCard({ alert }: AlertCardProps) {
  
  const handleContact = () => {
    toast({
        title: "Función en desarrollo",
        description: "Próximamente podrás contactar al dueño directamente.",
    })
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden">
             <Image src={alert.pet.image} alt={alert.pet.name} layout="fill" objectFit="cover" data-ai-hint="pet" />
             <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">SE BUSCA</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-3">
        <CardTitle className="text-xl">{alert.pet.name}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            Visto por última vez en: <span className="font-semibold text-foreground">{alert.lastSeenLocation}</span>
        </div>
        {alert.notes && <p className="text-sm text-muted-foreground pt-1 border-t mt-2 ">{alert.notes}</p>}
        
        <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary">{alert.pet.type}</Badge>
            <Badge variant="secondary">{alert.pet.breed}</Badge>
            {alert.pet.sex && <Badge variant="secondary">{alert.pet.sex}</Badge>}
        </div>

      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4 bg-secondary/30">
        <p className="text-xs text-muted-foreground w-full text-center">
            Reportado {formatDistanceToNow(alert.alertCreatedAt.toDate(), { addSuffix: true, locale: es })}
        </p>
        <Button className="w-full" onClick={handleContact}>
            <Phone className="mr-2 h-4 w-4" />
            Tengo información
        </Button>
      </CardFooter>
    </Card>
  );
}
