
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
      <path d="M158.5 106.8c-1.2-1-2.9-1-4.1 0l-16.5 13.1c-1.2 1-1.2 2.7 0 3.7l16.5 13.1c1.2 1 2.9 1 4.1 0l16.5-13.1c1.2-1 1.2-2.7 0-3.7l-16.5-13.1z" fill="currentColor" />
      <path d="M162.2 101.4c-1.3-0.4-2.7-0.4-4 0l-16.5 5.5c-1.3 0.4-2.2 1.6-2.2 3v26.3c0 1.3 0.9 2.5 2.2 3l16.5 5.5c1.3 0.4 2.7 0.4 4 0l16.5-5.5c1.3-0.4 2.2-1.6 2.2-3v-26.3c0-1.3-0.9-2.5-2.2-3l-16.5-5.5z" fill="#E0E0E0" />
      <path d="M148.6 94.5c-2.4-2.4-5.7-3.8-9.2-3.8h-18.8c-3.5 0-6.8 1.4-9.2 3.8-2.4 2.4-3.8 5.7-3.8 9.2v18.8c0 3.5 1.4 6.8 3.8 9.2 2.4 2.4 5.7 3.8 9.2 3.8h18.8c3.5 0 6.8-1.4 9.2-3.8 2.4-2.4 3.8-5.7 3.8-9.2v-18.8c0-3.5-1.4-6.8-3.8-9.2z" fill="currentColor" />
      <circle cx="125" cy="110" r="3" fill="white" />
      <circle cx="140" cy="110" r="3" fill="white" />
      <path d="M132.5 118c0 1.1-0.9 2-2 2s-2-0.9-2-2 0.9-2 2-2 2 0.9 2 2z" fill="white" />
      <path d="M132.5 122c-1.1 0-2-0.9-2-2s0.9-2 2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M132.5 122c1.1 0 2-0.9 2-2s-0.9-2-2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Dog */}
      <path d="M96.4 135.2c-7-1.8-12.4-7.5-13.8-14.6-0.5-2.4-0.1-4.8 1.1-6.9 1.2-2.1 3.2-3.8 5.6-4.7 6.4-2.5 13.3 0.3 17.1 5.6 1.7 2.4 2.6 5.2 2.6 8.1 0 7.8-6.3 14.1-14.1 14.1-2.9 0-5.6-0.9-8-2.4l-0.5-0.3z" fill="currentColor"/>
      <path d="M94.6 120.1c-1.8-1-4-1.3-6-0.7-2 0.6-3.6 2.1-4.4 4.1-1.4 3.4 0.1 7.3 3.5 8.7 1.8 0.7 3.8 0.7 5.5 0.1 2.4-0.9 4.3-2.9 5.1-5.3l-3.7-6.9z" fill="#E0E0E0"/>
      <path d="M78.8 116.1c-2.3-2.6-4-5.8-4.8-9.2-0.8-3.4-0.5-6.9 0.8-10.2 1.3-3.3 3.7-6.2 6.8-8.3 3.1-2.1 6.8-3.3 10.6-3.3h1c7.8 0 14.9 4.5 18.1 11.5l-10.3 19.3c-2.8-2.6-6.4-4.2-10.3-4.2-3.6 0-7 1.4-9.5 3.8l-2.4-0.1z" fill="#E0E0E0"/>
      <path d="M112.5 98.6c0 4.3-3.5 7.8-7.8 7.8s-7.8-3.5-7.8-7.8c0-4.3 3.5-7.8 7.8-7.8s7.8 3.4 7.8 7.8z" fill="currentColor"/>
      <circle cx="98.3" cy="98.6" r="1.5" fill="white" />
      <path d="M104.7 106.4c-4.3 0-7.8-3.5-7.8-7.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
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
