'use client';

import { create } from 'zustand';

interface SidebarState {
    isCollapsed: boolean;
    activeSection: string;
    toggleSidebar: () => void;
    setActiveSection: (section: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    isCollapsed: false,
    activeSection: 'dashboard',
    toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    setActiveSection: (section) => set({ activeSection: section }),
}));
