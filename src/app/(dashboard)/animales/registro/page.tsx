
'use client'

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePetStore } from "@/store/pets";
import { PetCard } from "@/components/pets/pet-card";

function PetsIllustration() {
  return (
    <div 
      className="w-[250px] h-[200px] bg-muted/30 rounded-lg flex items-center justify-center"
      data-ai-hint="pets illustration"
    >
        <span className="text-muted-foreground">Imagen</span>
    </div>
  );
}


export default function MisAnimalesPage() {
    const pets = usePetStore((state) => state.pets);

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background">
            <header className="flex items-center p-4 border-b">
                <Link href="/animales">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <h1 className="text-xl font-bold ml-4 text-primary">Mis animales</h1>
            </header>
            
            <main className="flex-grow p-4 md:p-6">
                {pets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pets.map(pet => (
                            <PetCard key={pet.id} pet={pet} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-grow flex-col items-center justify-center text-center p-4">
                        <PetsIllustration />
                        <p className="mt-4 text-lg text-muted-foreground">
                            No hay animales registrados
                        </p>
                    </div>
                )}
            </main>

            <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8">
                <Link href="/animales/registro/nuevo">
                    <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
                        <Plus className="h-8 w-8" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
