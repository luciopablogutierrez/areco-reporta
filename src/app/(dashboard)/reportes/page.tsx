import { ReportCard } from "@/components/reports/report-card";
import { mockReports } from "@/lib/mock-data";
import { FileText } from "lucide-react";

export default function ReportesPage() {
  // In a real app, this would fetch reports for the logged-in user
  const userReports = mockReports.filter(r => r.userId === 'user1' || r.userId === 'user2');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary"/>
            Mis Reportes
        </h1>
      </div>
      {userReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No has creado ningún reporte todavía.</p>
        </div>
      )}
    </div>
  );
}
