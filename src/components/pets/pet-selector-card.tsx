
import type { Pet } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface PetSelectorCardProps {
  pet: Pet;
  selected: boolean;
}

export function PetSelectorCard({ pet, selected }: PetSelectorCardProps) {
  return (
    <div 
        className={cn(
            "border-2 rounded-lg p-2 cursor-pointer transition-all relative",
            selected ? "border-primary shadow-lg" : "border-border hover:border-primary/50"
        )}
    >
        {selected && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 z-10">
                <CheckCircle className="h-4 w-4" />
            </div>
        )}
        <div className={cn("aspect-square relative rounded-md overflow-hidden", selected ? "" : "grayscale-[50%]")}>
            <Image 
                src={pet.image} 
                alt={pet.name} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint="pet"
                className={cn("transition-all", selected ? "scale-105" : "scale-100")}
            />
        </div>
        <p className="text-center font-semibold mt-2 truncate">{pet.name}</p>
    </div>
  );
}
