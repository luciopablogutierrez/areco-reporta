
'use client'

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePetStore } from "@/store/pets";
import { PetCard } from "@/components/pets/pet-card";

function PetsIllustration() {
  return (
    <div 
      className="w-full max-w-sm"
      data-ai-hint="pets illustration"
    >
      <svg viewBox="0 0 250 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50,150 C 70,110 110,110 130,150" stroke="hsl(var(--muted-foreground))" fill="transparent" strokeWidth="2"/>
            <circle cx="90" cy="120" r="25" fill="hsl(var(--card))" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
            <circle cx="80" cy="115" r="3" fill="hsl(var(--foreground))" />
            <circle cx="100" cy="115" r="3" fill="hsl(var(--foreground))" />
            <path d="M 85,125 Q 90,135 95,125" stroke="hsl(var(--foreground))" fill="transparent" strokeWidth="1"/>
            
            <path d="M 150,150 C 140,130 160,130 170,150" stroke="hsl(var(--muted-foreground))" fill="transparent" strokeWidth="2"/>
            <path d="M 160,125 L 155,135 L 165,135 Z" fill="hsl(var(--card))" stroke="hsl(var(--muted-foreground))" strokeWidth="2"/>
            <circle cx="157" cy="130" r="1" fill="hsl(var(--foreground))" />
            <circle cx="163" cy="130" r="1" fill="hsl(var(--foreground))" />
            
            <path d="M125 180 Q 140 160 155 180" stroke="hsl(var(--muted-foreground))" fill="transparent" stroke-dasharray="4" stroke-width="1" />

            <path d="M100 80 Q 125 40 150 80" stroke="hsl(var(--muted-foreground))" fill="transparent" stroke-width="1.5" />
            <path d="M110 90 L 140 90" stroke="hsl(var(--muted-foreground))" fill="transparent" stroke-width="1.5" />

            <foreignObject x="50" y="20" width="150" height="40">
                <p xmlns="http://www.w3.org/1999/xhtml" style={{color: 'hsl(var(--primary))', textAlign: 'center', fontWeight: 600}}>
                    Gestiona tus mascotas
                </p>
            </foreignObject>
        </svg>
    </div>
  );
}


export default function MisAnimalesPage() {
    const pets = usePetStore((state) => state.pets);

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background">
            <header className="flex items-center p-4 border-b sticky top-0 bg-background z-10">
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
                    <div className="flex flex-grow flex-col items-center justify-center text-center p-4 h-full mt-[-60px]">
                        <PetsIllustration />
                        <p className="mt-4 text-lg text-muted-foreground">
                            No hay animales registrados.
                        </p>
                        <Link href="/animales/registro/nuevo" className="mt-4">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Registrar mi primer animal
                            </Button>
                        </Link>
                    </div>
                )}
            </main>

            {pets.length > 0 && (
                <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8">
                    <Link href="/animales/registro/nuevo">
                        <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
                            <Plus className="h-8 w-8" />
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
