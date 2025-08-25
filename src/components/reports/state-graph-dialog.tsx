
'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type { Report, ReportUpdate } from "@/types";
import { ChevronRight, Circle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { statusText } from "@/lib/i18n";

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
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Gráfico de Estados</DialogTitle>
          <DialogDescription>
            Historial de cambios para el reporte: "{report.title}"
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="overflow-x-auto pb-4">
            <div className="flex items-start space-x-2">
              {statusHistory.map((update, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex flex-col items-center w-36">
                    <div className={`p-2 rounded-md w-full ${index === statusHistory.length - 1 ? 'bg-primary/10 border-primary border' : 'bg-secondary'}`}>
                      <div className="flex items-center gap-2 justify-center">
                          <div className={`w-2.5 h-2.5 rounded-full ${statusColors[update.newStatus!] || 'bg-gray-400'}`} />
                          <span className="text-sm font-medium">{statusText[update.newStatus as keyof typeof statusText]}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 text-center px-1">
                      <p className="font-semibold">{'userId' in update && update.userId === 'Ciudadano' ? 'Ciudadano' : 'Admin'}</p>
                      <p>{format(update.createdAt.toDate(), "d MMM, yyyy - HH:mm", { locale: es })}</p>
                    </div>
                  </div>

                  {index < statusHistory.length - 1 && (
                    <div className="flex flex-col items-center min-w-[120px] max-w-[120px] mx-2 pt-1">
                        <p className="text-xs text-center text-muted-foreground mb-1 break-words">{'message' in update && update.message}</p>
                        <ChevronRight className="w-8 h-8 text-muted-foreground mt-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
