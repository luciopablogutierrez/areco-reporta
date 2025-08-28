
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Notification } from '@/types';

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
];

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: mockNotifications,
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
        })),
      markAsRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
        })),
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      clearAll: () => set({ notifications: [] }),
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => localStorage),
      // Custom reviver/replacer to handle Date objects
      reviver: (key, value) => {
        if (key === 'createdAt' && typeof value === 'string') {
          return new Date(value);
        }
        return value;
      },
      replacer: (key, value) => {
        if (key === 'createdAt' && value instanceof Date) {
          return value.toISOString();
        }
        return value;
      },
    }
  )
);
