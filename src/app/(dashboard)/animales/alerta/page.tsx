
'use client'

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePetStore } from "@/store/pets";
import { LostPetForm } from "@/components/pets/lost-pet-form";

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
                    Registra tus mascotas
                </p>
            </foreignObject>
        </svg>
    </div>
  );
}


export default function AlertaAnimalPerdidoPage() {
    const pets = usePetStore((state) => state.pets);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="flex items-center p-4 border-b sticky top-0 bg-background z-10">
                <Link href="/animales">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <h1 className="text-xl font-bold ml-4 text-primary">Alerta Animal Perdido</h1>
            </header>
            
            <main className="flex-grow p-4 md:p-6">
                {pets.length > 0 ? (
                    <LostPetForm pets={pets} />
                ) : (
                    <div className="flex flex-grow flex-col items-center justify-center text-center p-4 h-full mt-[-60px]">
                        <PetsIllustration />
                        <p className="mt-4 text-lg text-muted-foreground max-w-sm">
                            Primero debes registrar un animal para poder reportarlo como perdido.
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
        </div>
    );
}
