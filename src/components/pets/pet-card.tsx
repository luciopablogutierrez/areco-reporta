
'use client'

import type { Pet } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { usePetStore } from "@/store/pets";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  const removePet = usePetStore((state) => state.removePet);

  const handleEdit = () => {
    toast({
      title: "Función en desarrollo",
      description: "Próximamente podrás editar los datos de tus mascotas.",
    });
  };

  const handleDelete = () => {
    removePet(pet.id);
    toast({
      title: "Mascota eliminada",
      description: `${pet.name} ha sido eliminado de tu registro.`,
      variant: "destructive",
    });
  };

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
        <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Pencil className="h-4 w-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente a <strong>{pet.name}</strong> de tus registros.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
