
'use client';

import { create } from 'zustand';
import type { PetType, LocationZone } from '@/types';

interface PetFilterState {
  searchTerm: string;
  selectedTypes: PetType[];
  selectedLocation: LocationZone | null;
  setSearchTerm: (term: string) => void;
  toggleType: (type: PetType) => void;
  setSelectedLocation: (location: LocationZone | null) => void;
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
