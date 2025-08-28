
'use client';

import { create } from 'zustand';
import type { ReportStatus, ReportCategory, LocationZone } from '@/types';

interface FilterState {
  searchTerm: string;
  selectedStatuses: ReportStatus[];
  selectedCategories: ReportCategory[];
  selectedLocation: LocationZone | null;
  setSearchTerm: (term: string) => void;
  setSelectedStatuses: (statuses: ReportStatus[]) => void;
  setSelectedCategories: (categories: ReportCategory[]) => void;
  setSelectedLocation: (location: LocationZone | null) => void;
  toggleStatus: (status: ReportStatus) => void;
  toggleCategory: (category: ReportCategory) => void;
  clearFilters: () => void;
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
  clearFilters: () =>
    set({
      searchTerm: '',
      selectedStatuses: [],
      selectedCategories: [],
      selectedLocation: null,
    }),
}));
