
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
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Gráfico de Estados</DialogTitle>
          <DialogDescription>
            Historial de cambios para el reporte: "{report.title}"
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-4">
            {statusHistory.map((update, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center w-32">
                  <div className={`p-2 rounded-md ${index === statusHistory.length - 1 ? 'bg-primary/10 border-primary border' : 'bg-secondary'}`}>
                    <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${statusColors[update.newStatus!] || 'bg-gray-400'}`} />
                        <span className="text-sm font-medium">{statusText[update.newStatus as keyof typeof statusText]}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 text-center">
                    <p>{'userId' in update && update.userId === 'Ciudadano' ? 'Ciudadano' : 'Admin'}</p>
                    <p>{format(update.createdAt.toDate(), "d MMM, yyyy", { locale: es })}</p>
                  </div>
                </div>

                {index < statusHistory.length - 1 && (
                  <div className="flex flex-col items-center min-w-[100px] px-2">
                      <p className="text-xs text-center text-muted-foreground mb-1 truncate">{'message' in update && update.message}</p>
                      <ChevronRight className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
