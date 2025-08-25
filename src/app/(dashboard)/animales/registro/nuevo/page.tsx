
'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const animalFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio.").max(32, "El nombre no puede tener más de 32 caracteres."),
  castrated: z.enum(["yes", "no"], { required_error: "Debe seleccionar una opción." }),
  breed: z.string().min(1, "La raza es obligatoria.").max(32, "La raza no puede tener más de 32 caracteres."),
  weight: z.string().optional(),
  type: z.enum(["perro", "gato", "otro"], {
    required_error: "Debe seleccionar un tipo de animal.",
  }),
  color: z.string().optional(),
  sex: z.enum(["macho", "hembra"]).optional(),
});

type AnimalFormValues = z.infer<typeof animalFormSchema>;

const defaultValues: Partial<AnimalFormValues> = {};

export default function RegistroAnimalPage() {
  const form = useForm<AnimalFormValues>({
    resolver: zodResolver(animalFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const animalType = form.watch("type");

  function onSubmit(data: AnimalFormValues) {
    toast({
      title: "Formulario enviado:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center p-4 border-b sticky top-0 bg-background z-10">
        <Link href="/animales/registro" passHref>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-4 text-primary">Registro de animales</h1>
      </header>

      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de tu mascota" {...field} />
                    </FormControl>
                    <FormDescription>
                      Máximo 32 caracteres.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="castrated"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Castrado</FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant={field.value === 'yes' ? 'default' : 'outline'}
                          onClick={() => field.onChange('yes')}
                          className="w-24"
                        >
                          Sí
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'no' ? 'default' : 'outline'}
                          onClick={() => field.onChange('no')}
                          className="w-24"
                        >
                          No
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="breed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raza</FormLabel>
                    <FormControl>
                      <Input placeholder="Raza de tu mascota" {...field} />
                    </FormControl>
                     <FormDescription>
                      Máximo 32 caracteres.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (opcional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Peso en kg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de animal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="gato">Gato</SelectItem>
                        <SelectItem value="perro">Perro</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Color del pelaje" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {(animalType === 'perro' || animalType === 'gato') && (
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Sexo</FormLabel>
                      <FormControl>
                        <div className="flex gap-4">
                           <Button
                            type="button"
                            variant={field.value === 'macho' ? 'default' : 'outline'}
                            onClick={() => field.onChange('macho')}
                            className="w-24"
                          >
                            Macho
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === 'hembra' ? 'default' : 'outline'}
                            onClick={() => field.onChange('hembra')}
                            className="w-24"
                          >
                            Hembra
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}


              <Button type="submit" className="w-full">Guardar Animal</Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
