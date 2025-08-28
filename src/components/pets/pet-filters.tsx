
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePetFilterStore } from "@/store/petFilters";
import { Dog, Cat, GitCommitHorizontal, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { locationText } from "@/lib/i18n";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";
import type { PetType } from "@/types";

const typeOptions: { value: PetType, label: string, icon: React.ElementType }[] = [
    { value: "perro", label: "Perro", icon: Dog },
    { value: "gato", label: "Gato", icon: Cat },
    { value: "otro", label: "Otro", icon: GitCommitHorizontal },
]

const locationOptions = Object.entries(locationText).map(([value, label]) => ({
    value: value as keyof typeof locationText,
    label,
}));

export function PetFilters() {
    const {
        searchTerm,
        selectedTypes,
        selectedLocation,
        setSearchTerm,
        toggleType,
        setSelectedLocation,
        clearFilters,
    } = usePetFilterStore();

    const activeFiltersCount = selectedTypes.length + (selectedLocation ? 1 : 0) + (searchTerm ? 1 : 0);

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Buscar por nombre, raza o zona..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-muted-foreground hidden md:block">Tipo:</p>
                        {typeOptions.map(({ value, label, icon: Icon }) => (
                            <Button 
                                key={value}
                                variant={selectedTypes.includes(value) ? "default" : "outline"}
                                onClick={() => toggleType(value)}
                                className="flex-1 md:flex-initial"
                            >
                                <Icon className="mr-2 h-4 w-4"/>
                                {label}
                            </Button>
                        ))}
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-center md:w-auto">
                                {selectedLocation ? locationText[selectedLocation] : "Zona"}
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Filtrar por Zona</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={selectedLocation ?? ""} onValueChange={(value) => setSelectedLocation(value as any)}>
                                    {locationOptions.map((option) => (
                                        <DropdownMenuRadioItem key={option.value} value={option.value}>
                                            {option.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                                {selectedLocation && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <Button variant="ghost" className="w-full justify-start" size="sm" onClick={() => setSelectedLocation(null)}>
                                            <X className="mr-2 h-4 w-4"/>
                                            Limpiar filtro
                                        </Button>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                 {activeFiltersCount > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
                        <p className="text-sm font-medium">Filtros activos:</p>
                        {searchTerm && (
                            <Badge variant="outline" className="pl-2">
                                Búsqueda: {searchTerm}
                                <button onClick={() => setSearchTerm('')} className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20">
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                        {selectedLocation && (
                            <Badge variant="outline" className="pl-2">
                                {locationText[selectedLocation]}
                                <button onClick={() => setSelectedLocation(null)} className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20">
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                        {selectedTypes.map(type => (
                            <Badge key={type} variant="outline" className="pl-2">
                                {typeOptions.find(t => t.value === type)?.label}
                                <button onClick={() => toggleType(type)} className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20">
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                        <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs" onClick={clearFilters}>
                            Limpiar todo
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
