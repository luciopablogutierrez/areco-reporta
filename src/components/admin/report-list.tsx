import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockReports } from "@/lib/mock-data"
import type { ReportStatus, ReportPriority } from "@/types"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { priorityText, statusText, categoryText } from "@/lib/i18n"
import { Button } from "../ui/button"
import Link from "next/link"

const statusVariant: Record<ReportStatus, "default" | "secondary" | "destructive" | "outline"> = {
    pending: 'destructive',
    in_progress: 'secondary',
    resolved: 'default',
    rejected: 'outline'
};


export function ReportList() {
  const recentReports = [...mockReports].sort((a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()).slice(0, 7);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Reportes Recientes</CardTitle>
            <CardDescription>Los últimos 7 reportes creados en la plataforma.</CardDescription>
        </div>
        <Link href="/reportes">
            <Button variant="outline">Ver todos</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.title}</TableCell>
                 <TableCell>{categoryText[report.category]}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[report.status]}>{statusText[report.status]}</Badge>
                </TableCell>
                <TableCell>{formatDistanceToNow(report.createdAt.toDate(), { addSuffix: true, locale: es })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
