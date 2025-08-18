
"use client"

import * as React from "react"
import { Check, Filter, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import type { ReportCategory, ReportStatus } from "@/types"
import { Card } from "../ui/card"
import { useFilterStore } from "@/store/filters"
import { categoryText } from "@/lib/i18n"

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

export function MapFilters() {
    const { 
        searchTerm, 
        selectedStatuses, 
        selectedCategories, 
        setSearchTerm, 
        toggleStatus,
        toggleCategory
    } = useFilterStore();

  return (
    <Card className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-lg p-2">
        <div className="flex items-center gap-2">
            <div className="relative flex-1">
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
