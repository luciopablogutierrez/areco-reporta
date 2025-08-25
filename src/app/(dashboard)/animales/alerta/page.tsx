
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


export default function AlertaAnimalPerdidoPage() {
    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
            <header className="flex items-center p-4 border-b">
                <Link href="/animales">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <h1 className="text-xl font-bold ml-4 text-primary">Alerta Animal Perdido</h1>
            </header>
            
            <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <PetsIllustration />
                <p className="mt-4 text-lg text-muted-foreground">
                    Primero debes registrar un animal para poder reportarlo como perdido.
                </p>
                <Link href="/animales/registro/nuevo" className="mt-4">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Registrar mi primer animal
                    </Button>
                </Link>
            </main>
        </div>
    );
}
