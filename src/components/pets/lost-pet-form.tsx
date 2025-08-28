
'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
import type { Pet, PetAlert } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PetSelectorCard } from "./pet-selector-card";
import { useAlertStore } from "@/store/alerts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { locationText } from "@/lib/i18n";
import { Input } from "../ui/input";

const locationOptions = Object.entries(locationText).map(([value, label]) => ({
    value: value as keyof typeof locationText,
    label,
}));

const lostPetFormSchema = z.object({
  petId: z.string({
    required_error: "Debes seleccionar una mascota.",
  }),
  zone: z.string({
    required_error: "Debes seleccionar la zona donde se perdió."
  }),
  lastSeenLocation: z.string().min(10, "La descripción de la ubicación debe tener al menos 10 caracteres."),
  notes: z.string().optional(),
});

type LostPetFormValues = z.infer<typeof lostPetFormSchema>;

interface LostPetFormProps {
    pets: Pet[];
}

export function LostPetForm({ pets }: LostPetFormProps) {
  const router = useRouter();
  const addAlert = useAlertStore((state) => state.addAlert);

  const form = useForm<LostPetFormValues>({
    resolver: zodResolver(lostPetFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: LostPetFormValues) {
    const selectedPet = pets.find(p => p.id === data.petId);
    if (!selectedPet) return;

    const newAlert: PetAlert = {
        id: `alert-${crypto.randomUUID()}`,
        pet: selectedPet,
        type: 'lost',
        zone: data.zone as keyof typeof locationText,
        lastSeenDetails: data.lastSeenLocation,
        notes: data.notes,
        alertCreatedAt: { toDate: () => new Date() },
        status: 'active',
    };

    addAlert(newAlert);

    toast({
      title: "¡Alerta Creada!",
      description: `Se ha reportado a ${selectedPet?.name} como perdido. La alerta ya es visible en el portal.`,
    });
    router.push('/animales/portal');
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="zone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Zona donde se perdió</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione una zona" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {locationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                
                <FormField
                    control={form.control}
                    name="lastSeenLocation"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Ubicación y detalles</FormLabel>
                        <FormControl>
                        <Input placeholder="Ej: Cerca de la plaza" {...field} />
                        </FormControl>
                        <FormDescription>
                            Sé lo más específico posible.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            
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
