'use client';

import { create } from 'zustand';
import type { ReportStatus, ReportCategory } from '@/types';

interface FilterState {
  searchTerm: string;
  selectedStatuses: ReportStatus[];
  selectedCategories: ReportCategory[];
  setSearchTerm: (term: string) => void;
  setSelectedStatuses: (statuses: ReportStatus[]) => void;
  setSelectedCategories: (categories: ReportCategory[]) => void;
  toggleStatus: (status: ReportStatus) => void;
  toggleCategory: (category: ReportCategory) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchTerm: '',
  selectedStatuses: [],
  selectedCategories: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedStatuses: (statuses) => set({ selectedStatuses: statuses }),
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
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
