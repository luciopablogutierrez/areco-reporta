
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Pet } from '@/types';

interface PetState {
  pets: Pet[];
  addPet: (pet: Pet) => void;
  removePet: (petId: string) => void;
  updatePet: (pet: Pet) => void;
}

export const usePetStore = create<PetState>()(
  persist(
    (set) => ({
      pets: [],
      addPet: (pet) => set((state) => ({ pets: [...state.pets, pet] })),
      removePet: (petId) =>
        set((state) => ({
          pets: state.pets.filter((p) => p.id !== petId),
        })),
      updatePet: (updatedPet) =>
        set((state) => ({
          pets: state.pets.map((p) => (p.id === updatedPet.id ? updatedPet : p)),
        })),
    }),
    {
      name: 'pet-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // This is a custom reviver to correctly handle Date objects
      reviver: (key, value) => {
        if (key === 'createdAt' && typeof value === 'string') {
          return { toDate: () => new Date(value) };
        }
        return value;
      },
       // This is a custom replacer to correctly handle Date objects
      replacer: (key, value) => {
        if (key === 'createdAt' && value && typeof value === 'object' && 'toDate' in value) {
          return value.toDate().toISOString();
        }
        return value;
      }
    }
  )
);
