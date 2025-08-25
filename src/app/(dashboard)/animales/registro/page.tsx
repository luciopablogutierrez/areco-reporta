
'use client'

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function PetsIllustration() {
  return (
    <svg
      width="250"
      height="200"
      viewBox="0 0 250 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-muted-foreground/30"
    >
        {/* Cat */}
        <path d="M82.3 108.4c-1.3-1-3.2-1-4.5 0l-18.1 13.1c-1.3 1-1.3 2.7 0 3.7l18.1 13.1c1.3 1 3.2 1 4.5 0l18.1-13.1c1.3-1 1.3-2.7 0-3.7L82.3 108.4z" fill="#E0E0E0"/>
        <path d="M86.4 102.8c-1.5-0.4-3-0.4-4.5 0l-18.1 5.5c-1.5 0.4-2.5 1.6-2.5 3v26.3c0 1.3 1 2.5 2.5 3l18.1 5.5c1.5 0.4 3 0.4 4.5 0l18.1-5.5c1.5-0.4 2.5-1.6 2.5-3v-26.3c0-1.3-1-2.5-2.5-3l-18.1-5.5z" fill="currentColor"/>
        <path d="M71.2 96c-2.7-2.4-6.3-3.8-10.1-3.8H40.4c-3.8 0-7.5 1.4-10.1 3.8-2.7 2.4-4.2 5.7-4.2 9.2v18.8c0 3.5 1.5 6.8 4.2 9.2 2.7 2.4 6.3 3.8 10.1 3.8h20.7c3.8 0 7.5-1.4 10.1-3.8 2.7-2.4 4.2-5.7 4.2-9.2V105.2c0-3.5-1.5-6.8-4.2-9.2z" fill="#E0E0E0"/>
        <circle cx="47" cy="111.5" r="3" fill="white"/>
        <circle cx="63.5" cy="111.5" r="3" fill="white"/>
        <path d="M55.2 119.5c0 1.1-0.9 2-2 2s-2-0.9-2-2 0.9-2 2-2 2 0.9 2 2z" fill="white"/>
        <path d="M55.2 123.5c-1.1 0-2-0.9-2-2s0.9-2 2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M55.2 123.5c1.1 0 2-0.9 2-2s-0.9-2-2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>

        {/* Dog */}
        <path d="M185.8 99.1c-7.7-1.8-13.6-7.5-15.2-14.6-0.5-2.4-0.1-4.8 1.2-6.9 1.3-2.1 3.5-3.8 6.1-4.7 7-2.5 14.6 0.3 18.8 5.6 1.9 2.4 2.8 5.2 2.8 8.1 0 7.8-6.9 14.1-15.5 14.1-3.2 0-6.2-0.9-8.8-2.4l-0.5-0.3z" fill="currentColor"/>
        <path d="M183.8 84c-2-1-4.4-1.3-6.6-0.7-2.2 0.6-4 2.1-4.8 4.1-1.5 3.4 0.1 7.3 3.8 8.7 2 .7 4.1.7 6.1 0.1 2.6-0.9 4.7-2.9 5.6-5.3l-4.1-6.9z" fill="#E0E0E0"/>
        <path d="M166.9 80c-2.5-2.6-4.4-5.8-5.3-9.2-0.9-3.4-0.6-6.9 0.9-10.2s4-6.2 7.5-8.3c3.4-2.1 7.5-3.3 11.6-3.3h1.1c8.6 0 16.4 4.5 19.9 11.5l-11.3 19.3c-3.1-2.6-7-4.2-11.3-4.2-4 0-7.7 1.4-10.4 3.8l-2.6-0.1z" fill="#E0E0E0"/>
        <path d="M202.2 62.5c0 4.3-3.8 7.8-8.6 7.8s-8.6-3.5-8.6-7.8c0-4.3 3.8-7.8 8.6-7.8s8.6 3.4 8.6 7.8z" fill="currentColor"/>
        <circle cx="187.2" cy="62.5" r="1.5" fill="white"/>
        <path d="M193.6 70.3c-4.7 0-8.6-3.5-8.6-7.8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>

        {/* Horse */}
        <path d="M136.7 141.5L125 152.4c-0.6 0.5-1.4 0.8-2.2 0.8s-1.6-0.3-2.2-0.8l-11.7-10.9c-1.2-1.1-1.3-2.9-0.2-4.1l5.5-5.9c1.1-1.2 2.9-1.3 4.1-0.2l2.6 2.4c0.6 0.6 1.4 0.8 2.2 0.8s1.6-0.3 2.2-0.8l2.6-2.4c1.2-1.1 2.9-1.1 4.1 0.2l5.5 5.9c1.1 1.2 1 3-0.2 4.1z" fill="#E0E0E0"/>
        <path d="M141.5 130.8c-3.9-8.4-12.7-13.8-22.5-13.8h-1.6c-9.8 0-18.6 5.4-22.5 13.8l-2.6 5.6c-0.8 1.7-0.1 3.7 1.5 4.6l10.2 5.1c0.8 0.4 1.7 0.6 2.6 0.6h20.8c0.9 0 1.8-0.2 2.6-0.6l10.2-5.1c1.6-0.8 2.3-2.9 1.5-4.6l-2.6-5.6z" fill="currentColor"/>
        <path d="M122.8 117h-5.6c-1.5 0-2.8-1.2-2.8-2.8v-11.1c0-1.5 1.2-2.8 2.8-2.8h5.6c1.5 0 2.8 1.2 2.8 2.8v11.1c0 1.5-1.2 2.8-2.8 2.8z" fill="#E0E0E0"/>
        <path d="M125 100.4c0-2.6-2.1-4.7-4.7-4.7h-10.6c-2.6 0-4.7 2.1-4.7 4.7v5.6c0 2.6 2.1 4.7 4.7 4.7h10.6c2.6 0 4.7-2.1 4.7-4.7v-5.6z" fill="#E0E0E0"/>
        <circle cx="112.5" cy="103.2" r="1" fill="white"/>
        <circle cx="119.5" cy="103.2" r="1" fill="white"/>
    </svg>
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
                <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
                    <Plus className="h-8 w-8" />
                </Button>
            </div>
        </div>
    );
}
