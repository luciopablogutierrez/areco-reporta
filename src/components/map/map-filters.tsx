
"use client"

import * as React from "react"
import { Check, Filter, MapPin, Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
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
import { Card } from "../ui/card"
import { useFilterStore } from "@/store/filters"
import { categoryText, locationText } from "@/lib/i18n"

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
        setSelectedLocation
    } = useFilterStore();

  return (
    <Card className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-2xl p-2">
        <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Buscar incidencias..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-shrink-0">
                    <MapPin className="mr-2 h-4 w-4" />
                    {selectedLocation ? locationText[selectedLocation] : "Filtrar por Zona"}
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
                <Button variant="outline" className="flex-shrink-0">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrar Estado
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
                <Button variant="outline" className="flex-shrink-0">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrar Categoría
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
    </Card>
  )
}
