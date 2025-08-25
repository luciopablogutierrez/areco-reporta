
'use client'

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
            <header className="flex items-center p-4 border-b">
                <Link href="/animales">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <h1 className="text-xl font-bold ml-4 text-primary">Mis animales</h1>
            </header>
            
            <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <PetsIllustration />
                <p className="mt-4 text-lg text-muted-foreground">
                    No hay animales registrados
                </p>
            </main>

            <div className="fixed bottom-16 right-4">
                <Link href="/animales/registro/nuevo">
                    <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
                        <Plus className="h-8 w-8" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
