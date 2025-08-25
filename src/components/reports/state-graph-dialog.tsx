
'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type { Report, ReportUpdate } from "@/types";
import { ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { statusText } from "@/lib/i18n";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface StateGraphDialogProps {
  report: Report;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors: Record<string, string> = {
    pending: 'bg-destructive',
    in_progress: 'bg-secondary-foreground',
    resolved: 'bg-primary',
    rejected: 'bg-muted-foreground',
};

export function StateGraphDialog({ report, open, onOpenChange }: StateGraphDialogProps) {

  const statusHistory = [
    {
      newStatus: 'pending',
      createdAt: report.createdAt,
      userId: 'Ciudadano',
      message: 'Incidencia creada'
    },
    ...(report.history ?? [])
  ] as (ReportUpdate | { newStatus: 'pending', createdAt: any, userId: string, message: string })[];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Historial del Reporte</DialogTitle>
          <DialogDescription>
            Línea de tiempo de los cambios para el reporte: "{report.title}"
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="w-full whitespace-nowrap">
            <div className="relative py-4 px-2">
                <div className="flex items-start gap-4">
                {statusHistory.map((update, index) => (
                    <div key={index} className="flex items-center">
                    {/* State Node */}
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className={`border-2 rounded-lg p-3 w-40 text-center ${index === statusHistory.length - 1 ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}>
                            <div className="flex items-center gap-2 justify-center mb-1">
                                <div className={`w-3 h-3 rounded-full ${statusColors[update.newStatus!] || 'bg-gray-400'}`} />
                                <span className="text-base font-bold">{statusText[update.newStatus as keyof typeof statusText]}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {format(update.createdAt.toDate(), "d MMM, yyyy", { locale: es })}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {format(update.createdAt.toDate(), "HH:mm 'hs'", { locale: es })}
                            </p>
                            <p className="text-xs font-semibold mt-2">
                                por {'userId' in update && update.userId === 'Ciudadano' ? 'Ciudadano' : 'Admin'}
                            </p>
                        </div>
                    </div>

                    {/* Connector */}
                    {index < statusHistory.length - 1 && (
                        <div className="flex flex-col items-center min-w-[150px] max-w-[150px] px-2 text-center">
                            <p className="text-xs text-muted-foreground whitespace-normal mb-2">
                                {'message' in update && update.message}
                            </p>
                            <div className="w-full h-px bg-border relative">
                               <ChevronRight className="w-6 h-6 text-muted-foreground absolute right-[-12px] top-1/2 -translate-y-1/2 bg-background" />
                            </div>
                        </div>
                    )}
                    </div>
                ))}
                </div>
            </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
