import type { Report, ReportCategory, ReportStatus } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, MapPin, Tag, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { categoryText, statusText } from "@/lib/i18n";

interface ReportCardProps {
  report: Report;
}

const statusVariant: Record<ReportStatus, "default" | "secondary" | "destructive" | "outline"> = {
    pending: 'destructive',
    in_progress: 'secondary',
    resolved: 'default',
    rejected: 'outline'
};


export function ReportCard({ report }: ReportCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
            <CardTitle className="text-lg">{report.title}</CardTitle>
            <Badge variant={statusVariant[report.status]}>{statusText[report.status]}</Badge>
        </div>
        <CardDescription className="flex items-center gap-2 pt-1 text-xs">
            <MapPin className="w-3 h-3"/> {report.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {report.images.length > 0 && (
            <div className="rounded-md overflow-hidden aspect-video relative">
                <Image src={report.images[0]} alt={report.title} layout="fill" objectFit="cover" data-ai-hint="urban problem" />
            </div>
        )}
        <p className="text-sm text-muted-foreground">{report.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground bg-secondary/30 p-4">
        <div className="flex items-center gap-2">
            <Tag className="w-3 h-3" />
            <span>{categoryText[report.category]}</span>
        </div>
        <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            <span>{format(report.createdAt.toDate(), "d MMM, yyyy", { locale: es })}</span>
        </div>
        <div className="flex items-center gap-2">
            <ThumbsUp className="w-3 h-3" />
            <span>{report.upvotes}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
