
import type { ReportCategory, ReportPriority, ReportStatus } from "@/types";

export const statusText: Record<ReportStatus, string> = {
    pending: 'Pendiente',
    in_progress: 'En Proceso',
    resolved: 'Resuelto',
    rejected: 'Rechazado'
};

export const priorityText: Record<ReportPriority, string> = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
    urgent: 'Urgente'
};

export const categoryText: Record<ReportCategory, string> = {
    baches: 'Baches',
    alumbrado: 'Alumbrado',
    basura: 'Basura',
    senalizacion: 'Señalización',
    espacios_verdes: 'Espacios Verdes',
    infraestructura: 'Infraestructura',
    accesibilidad: 'Accesibilidad',
    otros: 'Otros'
};

export const locationText = {
    san_antonio_de_areco: 'San Antonio de Areco',
    villa_lia: 'Villa Lía',
    vagues: 'Vagues',
    duggan: 'Duggan'
};

export const locationTagMap = {
    san_antonio_de_areco: 'san_antonio_de_areco',
    villa_lia: 'villa_lia',
    vagues: 'vagues',
    duggan: 'duggan'
};
