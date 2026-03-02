'use client';

import React, { useState, useEffect } from 'react';
import { Search, Bell, Lock, ChevronDown, Clock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function Header() {
    const user = useAuthStore((s) => s.user);
    const [time, setTime] = useState('');

    useEffect(() => {
        const update = () => setTime(new Date().toLocaleTimeString('ar-JO', { hour: '2-digit', minute: '2-digit' }));
        update();
        const id = setInterval(update, 60000);
        return () => clearInterval(id);
    }, []);

    return (
        <header
            className="fixed top-0 left-0 z-30 h-16 flex items-center justify-between px-6 backdrop-blur-lg border-b"
            style={{
                right: '260px',
                background: 'var(--header-bg)',
                borderColor: 'var(--header-border)',
                transition: 'background 0.3s ease, border-color 0.3s ease',
            }}
        >
            {/* يسار: شعار + بحث */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ background: 'var(--header-search-bg)', border: '1px solid var(--header-search-border)' }}>
                    <Search size={16} style={{ color: 'var(--header-search-text)' }} />
                    <input
                        type="text"
                        placeholder="البحث في الوحدات والتقارير..."
                        className="bg-transparent border-none outline-none text-sm w-64"
                        style={{ color: 'var(--text-primary)' }}
                    />
                </div>
            </div>

            {/* يمين: الوقت + الأمان + الإشعارات + المستخدم */}
            <div className="flex items-center gap-4">
                {/* الوقت */}
                <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <Clock size={14} />
                    <span className="text-sm font-medium tabular-nums" dir="ltr">{time}</span>
                </div>

                {/* حالة الأمان */}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ background: 'var(--header-badge-bg)', border: '1px solid transparent' }}>
                    <Lock size={13} style={{ color: 'var(--header-badge-text)' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--header-badge-text)' }}>آمن</span>
                </div>

                {/* الإشعارات */}
                <button className="relative p-2 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
                    <Bell size={18} />
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: '#ef4444' }}>
                        3
                    </span>
                </button>

                {/* معلومات المستخدم */}
                <div className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'var(--accent-green)' }}>
                        {user?.role === 'admin' ? 'م' : 'ض'}
                    </div>
                    <div className="hidden md:block leading-tight">
                        <p className="text-sm font-semibold" style={{ color: 'var(--header-text)' }}>
                            مسؤول النظام
                        </p>
                        <p className="text-[10px]" style={{ color: 'var(--header-text-sub)' }}>
                            مدير النظام
                        </p>
                    </div>
                    <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
            </div>
        </header>
    );
}
