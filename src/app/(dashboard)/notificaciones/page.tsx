
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check, Trash2 } from "lucide-react";
import type { Notification } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const mockNotifications: Notification[] = [
    {
        id: "1",
        type: "status_change",
        message: "Tu reporte 'Bache en calle San Martín' ha sido marcado como 'En Proceso'.",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
        id: "2",
        type: "new_comment",
        message: "Un administrador comentó en tu reporte 'Luminaria quemada en plaza central'.",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
        id: "3",
        type: "report_resolved",
        message: "¡Buenas noticias! Tu reporte 'Basura acumulada en esquina' ha sido resuelto.",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
        id: "4",
        type: "mention",
        message: "Has sido mencionado en un nuevo reporte sobre 'Señalización confusa'.",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    },
];


const notificationIcons = {
    status_change: <Badge className="bg-blue-500 text-white">Estado</Badge>,
    new_comment: <Badge className="bg-green-500 text-white">Comentario</Badge>,
    report_resolved: <Badge className="bg-primary text-primary-foreground">Resuelto</Badge>,
    mention: <Badge className="bg-purple-500 text-white">Mención</Badge>,
};


export default function NotificacionesPage() {
    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Bell className="w-8 h-8 text-primary"/>
                    Notificaciones
                </h1>
                <p className="text-muted-foreground">Aquí encontrarás las últimas actualizaciones sobre tus reportes.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Bandeja de Entrada</CardTitle>
                    <CardDescription>Tienes {mockNotifications.filter(n => !n.read).length} notificaciones sin leer.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y">
                        {mockNotifications.map(notification => (
                            <div key={notification.id} className={`flex items-start gap-4 p-4 ${!notification.read ? 'bg-primary/5' : ''}`}>
                                <div className="flex-shrink-0">
                                    {notificationIcons[notification.type]}
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm">{notification.message}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: es })}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                     {!notification.read && (
                                        <Button variant="ghost" size="icon" aria-label="Marcar como leída">
                                            <Check className="h-4 w-4" />
                                        </Button>
                                     )}
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" aria-label="Eliminar notificación">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="pt-6">
                    <Button variant="outline">Marcar todas como leídas</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
