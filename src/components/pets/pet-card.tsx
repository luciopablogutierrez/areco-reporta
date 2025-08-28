
import type { Pet } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="aspect-video relative rounded-md overflow-hidden">
             <Image src={pet.image} alt={pet.name} layout="fill" objectFit="cover" data-ai-hint="pet" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <CardTitle className="text-xl">{pet.name}</CardTitle>
        <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{pet.type}</Badge>
            <Badge variant="outline">{pet.breed}</Badge>
            {pet.sex && <Badge variant="outline">{pet.sex}</Badge>}
        </div>
        <p className="text-sm text-muted-foreground pt-2">
            Registrado el: {format(pet.createdAt.toDate(), "d 'de' MMMM, yyyy", { locale: es })}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4 bg-secondary/30">
        <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive">
            <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
