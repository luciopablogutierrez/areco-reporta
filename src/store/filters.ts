'use client';

import { create } from 'zustand';
import type { ReportStatus, ReportCategory } from '@/types';

type Location = 'san_antonio_de_areco' | 'villa_lia' | 'vagues' | 'duggan';

interface FilterState {
  searchTerm: string;
  selectedStatuses: ReportStatus[];
  selectedCategories: ReportCategory[];
  selectedLocation: Location | null;
  setSearchTerm: (term: string) => void;
  setSelectedStatuses: (statuses: ReportStatus[]) => void;
  setSelectedCategories: (categories: ReportCategory[]) => void;
  setSelectedLocation: (location: Location | null) => void;
  toggleStatus: (status: ReportStatus) => void;
  toggleCategory: (category: ReportCategory) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchTerm: '',
  selectedStatuses: [],
  selectedCategories: [],
  selectedLocation: null,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedStatuses: (statuses) => set({ selectedStatuses: statuses }),
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  toggleStatus: (status) =>
    set((state) => ({
      selectedStatuses: state.selectedStatuses.includes(status)
        ? state.selectedStatuses.filter((s) => s !== status)
        : [...state.selectedStatuses, status],
    })),
  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),
}));
