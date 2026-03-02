'use client';

import { create } from 'zustand';

export interface FilterState {
    // ── فلاتر لحظية (فرع + فترة) ──
    activeBranch: string;
    activePeriod: string;

    // ── فلاتر متقدمة ──
    year: string;
    quarter: string;
    month: string;
    day: string;
    branch: string[];
    market: string[];
    region: string[];
    productCategory: string[];
    subcategory: string[];
    product: string[];
    salesType: string;
    paymentType: string;
    discountRange: [number, number];
    employee: string[];
    agreement: string[];
    season: string;
    holiday: string;
    isApplied: boolean;
    isLoading: boolean;
}

interface FilterActions {
    setActiveBranch: (branch: string) => void;
    setActivePeriod: (period: string) => void;
    setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
    applyFilters: () => void;
    resetFilters: () => void;
    setLoading: (loading: boolean) => void;
}

const defaultFilters: FilterState = {
    activeBranch: 'all',
    activePeriod: 'month',
    year: new Date().getFullYear().toString(),
    quarter: '',
    month: '',
    day: '',
    branch: [],
    market: [],
    region: [],
    productCategory: [],
    subcategory: [],
    product: [],
    salesType: '',
    paymentType: '',
    discountRange: [0, 100],
    employee: [],
    agreement: [],
    season: '',
    holiday: '',
    isApplied: false,
    isLoading: false,
};

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
    ...defaultFilters,
    setActiveBranch: (branch) => set({ activeBranch: branch }),
    setActivePeriod: (period) => set({ activePeriod: period }),
    setFilter: (key, value) => set({ [key]: value, isApplied: false }),
    applyFilters: () => set({ isApplied: true, isLoading: true }),
    resetFilters: () => set({ ...defaultFilters }),
    setLoading: (loading) => set({ isLoading: loading }),
}));
