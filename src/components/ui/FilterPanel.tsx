'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, RotateCcw, ChevronDown, Search, Check } from 'lucide-react';

interface FilterOption {
    value: string;
    label: string;
}

interface FilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: () => void;
    onReset: () => void;
    isLoading?: boolean;
}

const years: FilterOption[] = [
    { value: '2026', label: '2026' },
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
];

const quarters: FilterOption[] = [
    { value: 'Q1', label: 'Q1 (Jan-Mar)' },
    { value: 'Q2', label: 'Q2 (Apr-Jun)' },
    { value: 'Q3', label: 'Q3 (Jul-Sep)' },
    { value: 'Q4', label: 'Q4 (Oct-Dec)' },
];

const branches: FilterOption[] = [
    { value: 'amman-central', label: 'Amman Central' },
    { value: 'irbid-main', label: 'Irbid Main' },
    { value: 'zarqa', label: 'Zarqa Branch' },
    { value: 'aqaba', label: 'Aqaba Port' },
    { value: 'madaba', label: 'Madaba City' },
    { value: 'salt', label: 'Salt Downtown' },
    { value: 'karak', label: 'Karak Branch' },
    { value: 'mafraq', label: 'Mafraq North' },
];

const categories: FilterOption[] = [
    { value: 'groceries', label: 'Groceries' },
    { value: 'meat', label: 'Meat & Poultry' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'household', label: 'Household' },
    { value: 'baby-care', label: 'Baby Care' },
];

function MultiSelect({ label, options, selected, onChange }: {
    label: string;
    options: FilterOption[];
    selected: string[];
    onChange: (vals: string[]) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filtered = options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
    );

    const toggle = (val: string) => {
        onChange(
            selected.includes(val)
                ? selected.filter((v) => v !== val)
                : [...selected, val]
        );
    };

    return (
        <div className="relative">
            <label className="text-[11px] font-medium uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>
                {label}
            </label>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                style={{ background: '#0f1729', border: '1px solid #1e293b', color: selected.length ? '#e2e8f0' : '#64748b' }}
            >
                <span>{selected.length ? `${selected.length} selected` : 'Select...'}</span>
                <ChevronDown size={14} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute z-50 left-0 right-0 mt-1 rounded-lg overflow-hidden"
                        style={{ background: '#1a2035', border: '1px solid #334155', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    >
                        <div className="p-2 border-b" style={{ borderColor: '#1e293b' }}>
                            <div className="flex items-center gap-2 px-2 py-1 rounded-md" style={{ background: '#0f1729' }}>
                                <Search size={12} style={{ color: '#64748b' }} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-transparent text-xs outline-none flex-1"
                                    style={{ color: '#e2e8f0' }}
                                />
                            </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                            {filtered.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => toggle(opt.value)}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-[#243347] transition-colors"
                                    style={{ color: selected.includes(opt.value) ? '#00e5a0' : '#94a3b8' }}
                                >
                                    <div
                                        className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0"
                                        style={{
                                            borderColor: selected.includes(opt.value) ? '#00e5a0' : '#334155',
                                            background: selected.includes(opt.value) ? 'rgba(0,229,160,0.1)' : 'transparent',
                                        }}
                                    >
                                        {selected.includes(opt.value) && <Check size={10} />}
                                    </div>
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SingleSelect({ label, options, selected, onChange }: {
    label: string;
    options: FilterOption[];
    selected: string;
    onChange: (val: string) => void;
}) {
    return (
        <div>
            <label className="text-[11px] font-medium uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>
                {label}
            </label>
            <select
                value={selected}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: '#0f1729', border: '1px solid #1e293b', color: '#e2e8f0' }}
            >
                <option value="">All</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}

export default function FilterPanel({ isOpen, onClose, onApply, onReset, isLoading }: FilterPanelProps) {
    const [selectedYear, setSelectedYear] = useState('2025');
    const [selectedQuarter, setSelectedQuarter] = useState('');
    const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 lg:hidden"
                        style={{ background: 'rgba(0,0,0,0.5)' }}
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: 320, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 320, opacity: 0 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-16 bottom-0 w-80 z-50 flex flex-col overflow-hidden"
                        style={{ background: '#0d1321', borderLeft: '1px solid #1e293b' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#1e293b' }}>
                            <div className="flex items-center gap-2">
                                <Filter size={16} style={{ color: '#00e5a0' }} />
                                <h3 className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>Filters</h3>
                            </div>
                            <button onClick={onClose} className="p-1 rounded hover:bg-[#1e2a3a] transition-colors">
                                <X size={16} style={{ color: '#64748b' }} />
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-5">
                            {/* Date Drill Down */}
                            <div className="pb-4 border-b" style={{ borderColor: '#1e293b' }}>
                                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#64748b' }}>
                                    📅 Time Period
                                </p>
                                <div className="space-y-3">
                                    <SingleSelect label="Year" options={years} selected={selectedYear} onChange={setSelectedYear} />
                                    <SingleSelect label="Quarter" options={quarters} selected={selectedQuarter} onChange={setSelectedQuarter} />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="pb-4 border-b" style={{ borderColor: '#1e293b' }}>
                                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#64748b' }}>
                                    📍 Location
                                </p>
                                <MultiSelect label="Branches" options={branches} selected={selectedBranches} onChange={setSelectedBranches} />
                            </div>

                            {/* Products */}
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#64748b' }}>
                                    📦 Products
                                </p>
                                <MultiSelect label="Categories" options={categories} selected={selectedCategories} onChange={setSelectedCategories} />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-4 border-t flex gap-3" style={{ borderColor: '#1e293b' }}>
                            <button
                                onClick={onReset}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                                style={{ background: '#1e2a3a', color: '#94a3b8', border: '1px solid #334155' }}
                            >
                                <RotateCcw size={14} />
                                Reset
                            </button>
                            <button
                                onClick={onApply}
                                disabled={isLoading}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
                                style={{
                                    background: isLoading ? 'rgba(0,229,160,0.3)' : 'linear-gradient(135deg, #00e5a0, #00c48a)',
                                    color: '#0a0e17',
                                }}
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: '#0a0e17', borderTopColor: 'transparent' }} />
                                ) : (
                                    <>
                                        <Filter size={14} />
                                        Apply
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
