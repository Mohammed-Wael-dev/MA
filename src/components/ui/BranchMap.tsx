'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Star } from 'lucide-react';

// ── بيانات الفروع مع إحداثيات تقريبية (x%, y%) على خريطة الأردن ──
interface Branch {
    id: string;
    name: string;
    city: string;
    lat: number; // درجة الحرارة الجغرافية (للعرض)
    lng: number;
    x: number;   // موضع X على الخريطة %
    y: number;   // موضع Y على الخريطة %
    score: number;
    revenue: number;
    orders: number;
    growth: number;
    margin: number;
    avgBasket: number;
}

const branches: Branch[] = [
    { id: 'b1', name: 'سوق المنارة', city: 'عمّان', lat: 31.95, lng: 35.93, x: 48, y: 42, score: 59, revenue: 328505, orders: 2847, growth: 12.3, margin: 18.9, avgBasket: 18 },
    { id: 'b2', name: 'سوق سطح النجم', city: 'عمّان', lat: 31.85, lng: 35.88, x: 44, y: 48, score: 38, revenue: 97419, orders: 1204, growth: -3.1, margin: 25.1, avgBasket: 1 },
    { id: 'b3', name: 'سوق القويسمة', city: 'عمّان', lat: 31.97, lng: 36.01, x: 52, y: 41, score: 72, revenue: 214300, orders: 1980, growth: 18.7, margin: 21.8, avgBasket: 9 },
    { id: 'b4', name: 'سوق راس العين', city: 'عمّان', lat: 31.90, lng: 35.79, x: 40, y: 45, score: 55, revenue: 88600, orders: 980, growth: 5.4, margin: 19.4, avgBasket: 5 },
    { id: 'b5', name: 'سوق البقعة', city: 'البلقاء', lat: 32.06, lng: 35.87, x: 43, y: 35, score: 81, revenue: 298400, orders: 2540, growth: 24.5, margin: 23.1, avgBasket: 14 },
    { id: 'b6', name: 'سوق الدمام', city: 'إربد', lat: 32.55, lng: 35.85, x: 42, y: 10, score: 46, revenue: 158700, orders: 1430, growth: 2.1, margin: 17.6, avgBasket: 7 },
    { id: 'b7', name: 'سوق الخبر', city: 'الزرقاء', lat: 32.07, lng: 36.08, x: 56, y: 33, score: 75, revenue: 265700, orders: 2210, growth: 15.9, margin: 26.3, avgBasket: 12 },
    { id: 'b8', name: 'سوق جدة', city: 'الكرك', lat: 31.18, lng: 35.70, x: 38, y: 72, score: 35, revenue: 133500, orders: 1100, growth: -6.2, margin: 15.9, avgBasket: 4 },
];

function getScoreColor(score: number) {
    if (score >= 70) return '#00e5a0'; // --accent-green
    if (score >= 50) return '#f59e0b'; // --accent-amber
    if (score >= 35) return '#f97316';
    return '#ef4444'; // --accent-red
}

function getScoreBg(score: number) {
    if (score >= 70) return 'rgba(0,229,160,0.08)';
    if (score >= 50) return 'rgba(245,158,11,0.08)';
    if (score >= 35) return 'rgba(249,115,22,0.08)';
    return 'rgba(239,68,68,0.08)';
}

const fmt = (n: number) => new Intl.NumberFormat('en-US').format(n);

export default function BranchMap() {
    const [selected, setSelected] = useState<Branch | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="glass-panel overflow-hidden" style={{ minHeight: '460px' }}>
            {/* رأس */}
            <div className="px-5 py-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>خريطة الفروع التفاعلية</h3>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>اضغط على أي فرع لعرض تفاصيله</p>
            </div>

            <div className="relative flex" style={{ height: '420px' }}>
                {/* الخريطة */}
                <div className="relative flex-1 overflow-hidden">
                    {/* خلفية بشبكة خريطة */}
                    <div className="absolute inset-0" style={{
                        background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.03) 0%, transparent 70%)',
                    }}>
                        {/* شبكة */}
                        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.07 }}>
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>

                        {/* خطوط الإسقاط (دوائر نطاق) */}
                        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.04 }}>
                            {[60, 120, 180].map(r => (
                                <circle key={r} cx="50%" cy="50%" r={r} fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="4 4" />
                            ))}
                        </svg>

                        {/* تسمية الخريطة */}
                        <div className="absolute bottom-3 left-3 text-[9px]" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
                            الأردن وما جاورها
                        </div>

                        {/* نقاط الفروع */}
                        {branches.map((b) => {
                            const isSelected = selected?.id === b.id;
                            const isHovered = hovered === b.id;
                            const color = getScoreColor(b.score);
                            const size = isSelected ? 22 : isHovered ? 18 : 14;

                            return (
                                <div key={b.id} style={{ position: 'absolute', left: `${b.x}%`, top: `${b.y}%`, transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: isSelected ? 30 : isHovered ? 20 : 10 }}
                                    onClick={() => setSelected(isSelected ? null : b)}
                                    onMouseEnter={() => setHovered(b.id)}
                                    onMouseLeave={() => setHovered(null)}>

                                    {/* نبضة */}
                                    {(isSelected || isHovered) && (
                                        <motion.div
                                            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                            style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color, width: size, height: size, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                        />
                                    )}

                                    {/* النقطة */}
                                    <motion.div
                                        animate={{ width: size, height: size }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        style={{ width: size, height: size, borderRadius: '50%', background: color, border: isSelected ? `3px solid white` : `2px solid ${color}`, boxShadow: `0 0 ${isSelected ? 16 : 8}px ${color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                        {isSelected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }} />}
                                    </motion.div>

                                    {/* اسم الفرع */}
                                    <div style={{
                                        position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                                        marginTop: 4, whiteSpace: 'nowrap', fontSize: 9, fontWeight: 600,
                                        color: isSelected ? color : 'var(--text-muted)',
                                        background: 'var(--bg-surface)',
                                        padding: '1px 4px', borderRadius: 3,
                                        border: isSelected ? `1px solid ${color}44` : 'none',
                                    }}>
                                        {b.name.split(' ').slice(0, 2).join(' ')}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* لوحة التفاصيل */}
                <AnimatePresence>
                    {selected && (
                        <motion.div
                            initial={{ opacity: 0, x: 40, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: 260 }}
                            exit={{ opacity: 0, x: 40, width: 0 }}
                            className="flex-shrink-0 border-r overflow-hidden"
                            style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
                        >
                            <div style={{ width: 260, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                {/* رأس البطاقة */}
                                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border-subtle)', background: getScoreBg(selected.score) }}>
                                    <div>
                                        <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{selected.name}</p>
                                        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{selected.city}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-center">
                                            <p className="text-lg font-bold" style={{ color: getScoreColor(selected.score) }} dir="ltr">{selected.score}%</p>
                                            <p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>الأداء</p>
                                        </div>
                                        <button onClick={() => setSelected(null)} style={{ color: 'var(--text-muted)' }}><X size={14} /></button>
                                    </div>
                                </div>

                                {/* شريط الأداء */}
                                <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                                    <div className="flex items-center justify-between text-[9px] mb-1" style={{ color: 'var(--text-muted)' }}>
                                        <span>درجة الأداء</span><span dir="ltr">{selected.score}/100</span>
                                    </div>
                                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${selected.score}%` }} transition={{ duration: 0.6, ease: 'easeOut' }}
                                            className="h-full rounded-full" style={{ background: `linear-gradient(to right, ${getScoreColor(selected.score)}, ${getScoreColor(selected.score)}88)` }} />
                                    </div>
                                </div>

                                {/* مقاييس */}
                                <div className="px-4 py-3 space-y-3 overflow-y-auto flex-1">
                                    {[
                                        { icon: DollarSign, label: 'الإيرادات', value: `${fmt(selected.revenue)} د.أ`, color: 'var(--accent-green)' },
                                        { icon: ShoppingCart, label: 'عدد الطلبات', value: fmt(selected.orders), color: 'var(--accent-blue)' },
                                        { icon: selected.growth >= 0 ? TrendingUp : TrendingDown, label: 'نمو المبيعات', value: `${selected.growth > 0 ? '+' : ''}${selected.growth}%`, color: selected.growth >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' },
                                        { icon: Star, label: 'هامش الربح', value: `${selected.margin}%`, color: 'var(--accent-amber)' },
                                        { icon: ShoppingCart, label: 'متوسط السلة', value: `${selected.avgBasket} د.أ`, color: 'var(--accent-purple)' },
                                    ].map(m => (
                                        <div key={m.label} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <m.icon size={12} style={{ color: m.color }} />
                                                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{m.label}</span>
                                            </div>
                                            <span className="text-xs font-semibold" style={{ color: m.color }} dir="ltr">{m.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* نبذة سريعة */}
                                <div className="px-4 py-2 border-t text-[10px]" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    {selected.growth >= 0
                                        ? `✅ الفرع يحقق نمواً إيجابياً بنسبة ${selected.growth}%`
                                        : `⚠️ الفرع يعاني تراجعاً بنسبة ${Math.abs(selected.growth)}%`}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* مفتاح الألوان */}
            <div className="px-5 py-2 border-t flex items-center gap-4 text-[10px]" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                {[{ label: 'ممتاز ≥ 70%', color: '#22c55e' }, { label: 'جيد 50-70%', color: '#eab308' }, { label: 'متوسط 35-50%', color: '#f97316' }, { label: 'ضعيف < 35%', color: '#ef4444' }].map(l => (
                    <div key={l.label} className="flex items-center gap-1.5">
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                        <span>{l.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
