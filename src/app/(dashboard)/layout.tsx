'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useSidebarStore } from '@/store/sidebarStore';
import { useThemeStore } from '@/store/themeStore';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import GlobalFilterBar from '@/components/ui/GlobalFilterBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const isCollapsed = useSidebarStore((s) => s.isCollapsed);
    const mode = useThemeStore((s) => s.mode);
    const router = useRouter();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode);
    }, [mode]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <div className="w-10 h-10 border-2 rounded-full animate-spin"
                    style={{ borderColor: 'var(--accent-green)', borderTopColor: 'transparent' }} />
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
            <Sidebar />
            <Header />
            <main
                className="pt-16 min-h-screen content-transition"
                style={{ marginRight: isCollapsed ? '72px' : '260px' }}
            >
                {/* شريط الفلاتر — فوق كل محتوى الصفحة */}
                <div style={{ padding: '8px 24px 0' }}>
                    <GlobalFilterBar />
                </div>
                <div className="p-6 pt-2">
                    {children}
                </div>
            </main>
        </div>
    );
}
