
'use client';

import { create } from 'zustand';
import type { PetType } from '@/types';

type Location = 'san_antonio_de_areco' | 'villa_lia' | 'vagues' | 'duggan';

interface PetFilterState {
  searchTerm: string;
  selectedTypes: PetType[];
  selectedLocation: Location | null;
  setSearchTerm: (term: string) => void;
  toggleType: (type: PetType) => void;
  setSelectedLocation: (location: Location | null) => void;
  clearFilters: () => void;
}

export const usePetFilterStore = create<PetFilterState>((set) => ({
  searchTerm: '',
  selectedTypes: [],
  selectedLocation: null,
  setSearchTerm: (term) => set({ searchTerm: term }),
  toggleType: (type) =>
    set((state) => ({
      selectedTypes: state.selectedTypes.includes(type)
        ? state.selectedTypes.filter((t) => t !== type)
        : [...state.selectedTypes, type],
    })),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  clearFilters: () =>
    set({
      searchTerm: '',
      selectedTypes: [],
      selectedLocation: null,
    }),
}));
