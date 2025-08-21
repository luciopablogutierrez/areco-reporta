

"use client"

import * as React from "react"
import { Filter, MapPin, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu"
import type { ReportCategory, ReportStatus } from "@/types"
import { Card, CardContent } from "../ui/card"
import { useFilterStore } from "@/store/filters"
import { categoryText, locationText, statusText } from "@/lib/i18n"
import { Badge } from "../ui/badge"

const statusOptions: { value: ReportStatus; label: string }[] = [
  { value: "pending", label: "Pendiente" },
  { value: "in_progress", label: "En Proceso" },
  { value: "resolved", label: "Resuelto" },
  { value: "rejected", label: "Rechazado" },
]

const categoryOptions: { value: ReportCategory; label: string }[] = Object.entries(categoryText).map(([value, label]) => ({
  value: value as ReportCategory,
  label,
}));

const locationOptions = Object.entries(locationText).map(([value, label]) => ({
    value: value as keyof typeof locationText,
    label,
}));

export function MapFilters() {
    const { 
        searchTerm, 
        selectedStatuses, 
        selectedCategories,
        selectedLocation,
        setSearchTerm, 
        toggleStatus,
        toggleCategory,
        setSelectedLocation,
        clearFilters,
    } = useFilterStore();

    const activeFiltersCount = selectedStatuses.length + selectedCategories.length + (selectedLocation ? 1 : 0) + (searchTerm ? 1 : 0);


  return (
    <Card className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl p-2">
        <CardContent className="p-2 space-y-2">
            <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Buscar incidencias..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-center">
                                <MapPin className="mr-2 h-4 w-4" />
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

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-center">
                                <Filter className="mr-2 h-4 w-4" />
                                Estado
                                {selectedStatuses.length > 0 && <span className="ml-2 rounded-full bg-primary text-primary-foreground text-xs px-2">{selectedStatuses.length}</span>}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Filtrar por estado</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {statusOptions.map((option) => (
                                <DropdownMenuCheckboxItem
                                    key={option.value}
                                    checked={selectedStatuses.includes(option.value)}
                                    onSelect={(e) => e.preventDefault()}
                                    onCheckedChange={() => toggleStatus(option.value)}
                                >
                                    {option.label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                             <Button variant="outline" className="w-full justify-center">
                                <Filter className="mr-2 h-4 w-4" />
                                Categoría
                                {selectedCategories.length > 0 && <span className="ml-2 rounded-full bg-primary text-primary-foreground text-xs px-2">{selectedCategories.length}</span>}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Filtrar por categoría</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {categoryOptions.map((option) => (
                                <DropdownMenuCheckboxItem
                                    key={option.value}
                                    checked={selectedCategories.includes(option.value)}
                                    onSelect={(e) => e.preventDefault()}
                                    onCheckedChange={() => toggleCategory(option.value)}
                                >
                                    {option.label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
             {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
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
                    {selectedStatuses.map(status => (
                        <Badge key={status} variant="outline" className="pl-2">
                            {statusText[status]}
                            <button onClick={() => toggleStatus(status)} className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                    {selectedCategories.map(category => (
                        <Badge key={category} variant="outline" className="pl-2">
                            {categoryText[category]}
                            <button onClick={() => toggleCategory(category)} className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20">
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

