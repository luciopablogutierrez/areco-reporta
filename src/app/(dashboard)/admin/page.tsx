
import { ReportList } from "@/components/admin/report-list";
import { ReportStats } from "@/components/admin/report-stats";
import { MessageChecker } from "@/components/admin/message-checker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockReports } from "@/lib/mock-data";
import { Shield, FileText, CheckCircle, Clock } from "lucide-react";

export default function AdminPage() {
  const totalReports = mockReports.length;
  const resolvedReports = mockReports.filter(r => r.status === 'resolved').length;
  const resolvedPercentage = totalReports > 0 ? ((resolvedReports / totalReports) * 100).toFixed(1) : 0;
  
  // Dummy data for percentage changes
  const totalReportsChange = "+20.1% desde el mes pasado";
  const resolvedPercentageChange = "+5.2% desde el mes pasado";
  const responseTimeChange = "-8% desde el mes pasado";


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary"/>
            Panel de Administración
        </h1>
        <p className="text-muted-foreground">Métricas y gestión de reportes de ArecoReporta.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reportes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReports}</div>
            <p className="text-xs text-muted-foreground">{totalReportsChange}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes Resueltos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedPercentage}%</div>
            <p className="text-xs text-muted-foreground">{resolvedPercentageChange}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo de Respuesta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 días</div>
            <p className="text-xs text-muted-foreground">{responseTimeChange}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <ReportStats />
        <MessageChecker />
      </div>

      <ReportList />
    </div>
  )
}
