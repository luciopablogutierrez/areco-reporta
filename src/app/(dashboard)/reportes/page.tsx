
'use client'

import * as React from 'react';
import { ReportCard } from "@/components/reports/report-card";
import { mockReports } from "@/lib/mock-data";
import { FileText, PlusCircle, Search, MapPin, X, Filter } from "lucide-react";
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import type { Report, ReportCategory, ReportStatus } from '@/types';
import Link from 'next/link';
import { categoryText, statusText, locationText, locationTagMap } from '@/lib/i18n';
import { useFilterStore } from '@/store/filters';
import { Badge } from '@/components/ui/badge';
import { StateGraphDialog } from '@/components/reports/state-graph-dialog';

const statusOptions: { value: ReportStatus; label: string }[] = [
  { value: "pending", label: "Pendiente" },
  { value: "in_progress", label: "En Proceso" },
  { value: "resolved", label: "Resuelto" },
  { value: "rejected", label: "Rechazado" },
];

const categoryOptions: { value: ReportCategory; label: string }[] = Object.entries(categoryText).map(([value, label]) => ({
  value: value as ReportCategory,
  label,
}));

const locationOptions = Object.entries(locationText).map(([value, label]) => ({
    value: value as keyof typeof locationText,
    label,
}));


export default function ReportesPage() {
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
    
    // In a real app, this would be fetched state
    const [reports, setReports] = React.useState<Report[]>(mockReports);
    const [selectedReportForGraph, setSelectedReportForGraph] = React.useState<Report | null>(null);

    const handleUpvote = (reportId: string, userId: string = 'user1') => {
        setReports(prevReports => {
            const newReports = prevReports.map(report => {
                if (report.id === reportId) {
                    if (report.upvotedBy.includes(userId)) {
                        // User already upvoted, do nothing or allow to un-vote
                        return report;
                    }
                    return {
                        ...report,
                        upvotes: report.upvotes + 1,
                        upvotedBy: [...report.upvotedBy, userId],
                    };
                }
                return report;
            });
            return newReports;
        });
    };

    const handleStatusClick = (report: Report) => {
        setSelectedReportForGraph(report);
    };

  // In a real app, this would fetch reports for the logged-in user
  const userReports = reports.filter(r => r.userId === 'user1' || r.userId === 'user2');

  const filteredReports = React.useMemo(() => {
    return userReports
      .filter(report => {
        // Filter by search term
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          return report.title.toLowerCase().includes(term) || report.description.toLowerCase().includes(term);
        }
        return true;
      })
      .filter(report => {
        // Filter by status
        if (selectedStatuses.length > 0) {
          return selectedStatuses.includes(report.status);
        }
        return true;
      })
      .filter(report => {
        // Filter by category
        if (selectedCategories.length > 0) {
          return selectedCategories.includes(report.category);
        }
        return true;
      })
      .filter(report => {
        // Filter by location
        if (selectedLocation) {
          return report.tags.includes(locationTagMap[selectedLocation]);
        }
        return true;
      });
  }, [userReports, searchTerm, selectedStatuses, selectedCategories, selectedLocation]);

  const activeFiltersCount = selectedStatuses.length + selectedCategories.length + (selectedLocation ? 1 : 0) + (searchTerm ? 1 : 0);

  return (
    <>
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary"/>
                Mis Reportes
            </h1>
            <p className="text-muted-foreground">Encuentra y gestiona todas tus incidencias reportadas.</p>
        </div>
        <Link href="/incidencias/crear">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4"/>
                Crear Incidencia
            </Button>
        </Link>
      </div>

       <div className="space-y-4 p-4 border rounded-lg bg-card">
            <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por título o descripción..."
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
                            <DropdownMenuLabel>Estado del Reporte</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {statusOptions.map((option) => (
                                <DropdownMenuCheckboxItem
                                    key={option.value}
                                    checked={selectedStatuses.includes(option.value)}
                                    onCheckedChange={() => toggleStatus(option.value)}
                                    onSelect={(e) => e.preventDefault()}
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
                            <DropdownMenuLabel>Categoría del Reporte</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {categoryOptions.map((option) => (
                                <DropdownMenuCheckboxItem
                                    key={option.value}
                                    checked={selectedCategories.includes(option.value)}
                                    onCheckedChange={() => toggleCategory(option.value)}
                                    onSelect={(e) => e.preventDefault()}
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
        </div>

      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map(report => (
            <ReportCard 
                key={report.id} 
                report={report} 
                onUpvote={() => handleUpvote(report.id)}
                isUpvoted={report.upvotedBy.includes('user1')}
                onStatusClick={handleStatusClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold">No se encontraron reportes</h3>
            <p className="text-muted-foreground mt-2">Prueba a cambiar los filtros o crea una nueva incidencia.</p>
        </div>
      )}
    </div>
    {selectedReportForGraph && (
        <StateGraphDialog
            report={selectedReportForGraph}
            open={!!selectedReportForGraph}
            onOpenChange={(open) => {
                if (!open) {
                    setSelectedReportForGraph(null);
                }
            }}
        />
    )}
    </>
  );
}
