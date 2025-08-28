
'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import type { Pet } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PetSelectorCard } from "./pet-selector-card";

const lostPetFormSchema = z.object({
  petId: z.string({
    required_error: "Debes seleccionar una mascota.",
  }),
  lastSeenLocation: z.string().min(10, "La descripción debe tener al menos 10 caracteres."),
  notes: z.string().optional(),
});

type LostPetFormValues = z.infer<typeof lostPetFormSchema>;

interface LostPetFormProps {
    pets: Pet[];
}

export function LostPetForm({ pets }: LostPetFormProps) {
  const router = useRouter();
  const form = useForm<LostPetFormValues>({
    resolver: zodResolver(lostPetFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: LostPetFormValues) {
    const selectedPet = pets.find(p => p.id === data.petId);
    toast({
      title: "¡Alerta Creada!",
      description: `Se ha reportado a ${selectedPet?.name} como perdido.`,
    });
    router.push('/animales');
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="petId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>¿Qué animal se perdió?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                    >
                      {pets.map(pet => (
                        <FormItem key={pet.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={pet.id} className="sr-only" />
                          </FormControl>
                          <FormLabel className="font-normal w-full">
                            <PetSelectorCard pet={pet} selected={field.value === pet.id} />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                control={form.control}
                name="lastSeenLocation"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>¿Dónde fue visto por última vez?</FormLabel>
                    <FormControl>
                    <Textarea placeholder="Ej: Cerca de la plaza principal, por la calle San Martín." {...field} rows={3} />
                    </FormControl>
                     <FormDescription>
                        Sé lo más específico posible.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Notas adicionales (opcional)</FormLabel>
                    <FormControl>
                    <Textarea placeholder="Ej: Es asustadizo, no intentar agarrarlo. Lleva un collar rojo." {...field} rows={3} />
                    </FormControl>
                    <FormDescription>
                        Cualquier detalle extra puede ayudar.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />

          <Button type="submit" className="w-full">Generar Alerta de Búsqueda</Button>
        </form>
      </Form>
    </div>
  );
}
