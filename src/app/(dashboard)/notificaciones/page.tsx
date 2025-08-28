
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check, Trash2, Info } from "lucide-react";
import type { Notification } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useNotificationStore } from "@/store/notifications";
import { toast } from "@/hooks/use-toast";

const notificationIcons: Record<Notification['type'], React.ReactElement> = {
    status_change: <Badge className="bg-blue-500 text-white">Estado</Badge>,
    new_comment: <Badge className="bg-green-500 text-white">Comentario</Badge>,
    report_resolved: <Badge className="bg-primary text-primary-foreground">Resuelto</Badge>,
    mention: <Badge className="bg-purple-500 text-white">Mención</Badge>,
    pet_info: <Badge className="bg-cyan-500 text-white">Mascotas</Badge>,
};


export default function NotificacionesPage() {
    const { notifications, markAsRead, markAllAsRead, clearAll } = useNotificationStore();
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAllRead = () => {
        markAllAsRead();
        toast({
            title: "Notificaciones actualizadas",
            description: "Todas las notificaciones han sido marcadas como leídas."
        })
    }

    const handleClearAll = () => {
        clearAll();
        toast({
            title: "Notificaciones eliminadas",
            description: "Se ha limpiado tu bandeja de entrada.",
            variant: "destructive"
        })
    }

    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Bell className="w-8 h-8 text-primary"/>
                    Notificaciones
                </h1>
                <p className="text-muted-foreground">Aquí encontrarás las últimas actualizaciones sobre tus reportes y mascotas.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Bandeja de Entrada</CardTitle>
                    <CardDescription>Tienes {unreadCount} notificaciones sin leer.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    {notifications.length > 0 ? (
                        <div className="divide-y">
                            {notifications.map(notification => (
                                <div key={notification.id} className={`flex items-start gap-4 p-4 ${!notification.read ? 'bg-primary/5' : ''}`}>
                                    <div className="flex-shrink-0 mt-1">
                                        {notificationIcons[notification.type] || <Info />}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm">{notification.message}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: es })}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        {notification.read ? (
                                            <Button variant="ghost" size="icon" disabled className="text-muted-foreground">
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        ) : (
                                            <Button variant="ghost" size="icon" aria-label="Marcar como leída" onClick={() => markAsRead(notification.id)}>
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-16 border-t">
                            <h3 className="text-xl font-semibold">Bandeja de entrada vacía</h3>
                            <p className="text-muted-foreground mt-2">No tienes notificaciones nuevas.</p>
                        </div>
                    )}
                </CardContent>
                {notifications.length > 0 && (
                    <CardFooter className="pt-6 flex justify-between">
                        <Button variant="outline" onClick={handleMarkAllRead} disabled={unreadCount === 0}>Marcar todas como leídas</Button>
                        <Button variant="destructive" onClick={handleClearAll}>Limpiar bandeja</Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}
