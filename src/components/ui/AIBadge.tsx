'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface AIBadgeProps {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    confidence?: number;
}

export default function AIBadge({ label = 'AI Powered', size = 'sm', confidence }: AIBadgeProps) {
    const sizes = {
        sm: 'text-[10px] px-2 py-0.5 gap-1',
        md: 'text-xs px-3 py-1 gap-1.5',
        lg: 'text-sm px-4 py-1.5 gap-2',
    };

    const iconSizes = { sm: 10, md: 14, lg: 16 };

    return (
        <motion.div
            className={`inline-flex items-center rounded-full font-semibold uppercase tracking-wider ${sizes[size]}`}
            style={{
                background: 'rgba(0, 212, 255, 0.1)',
                color: '#00d4ff',
                border: '1px solid rgba(0, 212, 255, 0.25)',
                boxShadow: '0 0 12px rgba(0, 212, 255, 0.1)',
            }}
            animate={{ boxShadow: ['0 0 12px rgba(0,212,255,0.1)', '0 0 20px rgba(0,212,255,0.2)', '0 0 12px rgba(0,212,255,0.1)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
            <Brain size={iconSizes[size]} />
            {label}
            {confidence !== undefined && (
                <span className="ml-1 opacity-70">{confidence}%</span>
            )}
        </motion.div>
    );
}

export function AIConfidenceMeter({ value, label }: { value: number; label: string }) {
    const getColor = (v: number) => {
        if (v >= 85) return '#00e5a0';
        if (v >= 70) return '#00d4ff';
        if (v >= 50) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>{label}</span>
                <span className="text-xs font-bold" style={{ color: getColor(value) }}>{value}%</span>
            </div>
            <div className="progress-bar">
                <motion.div
                    className="progress-bar-fill"
                    style={{ background: getColor(value) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
}
