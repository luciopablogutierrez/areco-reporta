
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PetAlert } from '@/types';
import { mockPetAlerts } from '@/lib/mock-pets';

interface AlertState {
  alerts: PetAlert[];
  addAlert: (alert: PetAlert) => void;
  resolveAlert: (alertId: string) => void;
}

export const useAlertStore = create<AlertState>()(
  persist(
    (set) => ({
      alerts: mockPetAlerts, // Initialize with mock data
      addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
      resolveAlert: (alertId) =>
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === alertId ? { ...a, status: 'resolved' } : a
          ),
        })),
    }),
    {
      name: 'alert-storage',
      storage: createJSONStorage(() => localStorage),
       // This is a custom reviver to correctly handle Date objects
      reviver: (key, value) => {
        if ((key === 'createdAt' || key === 'alertCreatedAt') && typeof value === 'string') {
          return { toDate: () => new Date(value) };
        }
        return value;
      },
       // This is a custom replacer to correctly handle Date objects
      replacer: (key, value) => {
        if ((key === 'createdAt' || key === 'alertCreatedAt') && value && typeof value === 'object' && 'toDate' in value) {
          return value.toDate().toISOString();
        }
        return value;
      }
    }
  )
);
