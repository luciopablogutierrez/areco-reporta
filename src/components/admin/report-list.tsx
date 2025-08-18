import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockReports } from "@/lib/mock-data"
import type { ReportStatus, ReportPriority } from "@/types"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

const statusVariant: Record<ReportStatus, "default" | "secondary" | "destructive" | "outline"> = {
    pending: 'destructive',
    in_progress: 'secondary',
    resolved: 'default',
    rejected: 'outline'
};

const statusText: Record<ReportStatus, string> = {
    pending: 'Pendiente',
    in_progress: 'En Proceso',
    resolved: 'Resuelto',
    rejected: 'Rechazado'
};

const priorityText: Record<ReportPriority, string> = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
    urgent: 'Urgente'
};

export function ReportList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reportes Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReports.slice(0, 5).map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.title}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[report.status]}>{statusText[report.status]}</Badge>
                </TableCell>
                <TableCell>{priorityText[report.priority]}</TableCell>
                <TableCell>{formatDistanceToNow(report.createdAt.toDate(), { addSuffix: true, locale: es })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
