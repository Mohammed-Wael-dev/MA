'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';

// ── بنية البيانات ──
interface TreeNode {
    id: string;
    label: string;
    labelEn?: string;
    value: number;
    children?: TreeNode[];
}

const treeData: TreeNode = {
    id: 'root',
    label: 'صافي المبيعات',
    labelEn: 'Net Sales',
    value: 421924,
    children: [
        {
            id: 'b1', label: 'سوق المنارة', value: 328505,
            children: [
                {
                    id: 'c1', label: 'منتجات غذائية', value: 191753,
                    children: [
                        { id: 's1', label: 'حبوب', value: 45443, children: [{ id: 'p1', label: 'أرز مطبوخ ممتاز', value: 5988 }, { id: 'p2', label: 'أرز حبة متوسطة', value: 3927 }, { id: 'p3', label: 'أرز بسمتي ممتاز', value: 3719 }, { id: 'p4', label: 'أرز أصفر سنوات الخير', value: 3283 }, { id: 'p5', label: 'أرز صواريخ حبة م...', value: 2971 }] },
                        { id: 's2', label: 'ساس', value: 34106 },
                        { id: 's3', label: 'حليب', value: 29993 },
                        { id: 's4', label: 'زيوت', value: 23541 },
                        { id: 's5', label: 'بقوليات مقلغة', value: 10093 },
                        { id: 's6', label: 'مشروبات', value: 8754 },
                        { id: 's7', label: 'منتجات طبية', value: 8322 },
                        { id: 's8', label: 'نهارات وأعشاب', value: 8234 },
                        { id: 's9', label: 'حلويات', value: 6364 },
                    ]
                },
                { id: 'c2', label: 'غير مصنف', value: 60086 },
                { id: 'c3', label: 'مستلزمات منزلية', value: 27232 },
                { id: 'c4', label: 'العناية الشخصية', value: 26823 },
                { id: 'c5', label: 'منتظمات', value: 16231 },
                { id: 'c6', label: 'منتجات ورقية', value: 5748 },
                { id: 'c7', label: 'مستلزمات الأطفال', value: 356 },
                { id: 'c8', label: 'أجهزة وإلكترونيات', value: 168 },
                { id: 'c9', label: 'فرفاشية', value: 108 },
            ]
        },
        {
            id: 'b2', label: 'سوق سطح النجم', value: 97419,
            children: [
                { id: 'c10', label: 'منتجات غذائية', value: 55283 },
                { id: 'c11', label: 'مستلزمات منزلية', value: 18421 },
                { id: 'c12', label: 'العناية الشخصية', value: 14200 },
                { id: 'c13', label: 'مشروبات', value: 9515 },
            ]
        },
    ],
};

type Level = { label: string; node: TreeNode };

// ── مكوّن عنصر الشجرة ──
function TreeItem({ node, max, selected, onClick }: {
    node: TreeNode;
    max: number;
    selected: boolean;
    onClick: () => void;
}) {
    const pct = Math.round((node.value / max) * 100);
    return (
        <button
            onClick={onClick}
            className="w-full text-right transition-all rounded-md p-2 mb-1"
            style={{
                background: selected ? 'rgba(37,99,235,0.12)' : 'transparent',
                border: `1px solid ${selected ? '#2563eb' : 'transparent'}`,
            }}
        >
            {/* شريط التقدم الأزرق */}
            <div className="mb-1.5 h-[5px] rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: selected ? '#2563eb' : '#3b82f6' }}
                />
            </div>
            <p className="text-[11px] font-medium leading-tight text-right truncate max-w-[140px]" style={{ color: selected ? '#93c5fd' : 'var(--text-secondary)' }}>
                {node.label}
            </p>
            <p className="text-xs font-semibold mt-0.5" style={{ color: selected ? '#60a5fa' : 'var(--text-muted)' }} dir="ltr">
                {node.value.toLocaleString('en-US')}
            </p>
        </button>
    );
}

// ── المكوّن الرئيسي ──
export default function TreeDrillDown() {
    // مسار الحفر: [ { label: column-title, node: selected } ]
    const [path, setPath] = useState<Level[]>([]);

    // الأعمدة الحالية
    const columns: { title: string; titleAr: string; nodes: TreeNode[] }[] = [];

    // أضف البيانات الجذرية كعمود أول
    const rootChildren = treeData.children || [];
    columns.push({ title: 'Branch', titleAr: 'الفرع', nodes: rootChildren });

    // أعمدة ديناميكية بناءً على المسار
    for (let i = 0; i < path.length; i++) {
        const children = path[i].node.children;
        if (children && children.length > 0) {
            const nextTitles = ['Category', 'SubCategory', 'Product Na...'];
            const nextTitlesAr = ['الفئة', 'الفئة الفرعية', 'المنتج'];
            columns.push({
                title: nextTitles[i] || `Level ${i + 2}`,
                titleAr: nextTitlesAr[i] || `المستوى ${i + 2}`,
                nodes: children,
            });
        }
    }

    // القيمة القصوى لكل عمود
    const getMax = (nodes: TreeNode[]) => Math.max(...nodes.map(n => n.value));

    const handleSelect = (colIdx: number, node: TreeNode) => {
        // إذا نقر على نفس العنصر المحدد → إلغاء
        if (path[colIdx]?.node.id === node.id) {
            setPath(path.slice(0, colIdx));
        } else {
            setPath([...path.slice(0, colIdx), { label: columns[colIdx].title, node }]);
        }
    };

    const removeFilter = (idx: number) => {
        setPath(path.slice(0, idx));
    };

    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = 0; // RTL: scroll to start
        }
    }, [path.length]);

    return (
        <div className="glass-panel overflow-hidden">
            {/* رأس */}
            <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Decomposition Tree — التحليل الهرمي للمبيعات
                </h3>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    اضغط على أي عنصر للتعمق في التفاصيل • الفرع ← الفئة ← الفئة الفرعية ← المنتج
                </p>
            </div>

            {/* شريط الفلاتر */}
            <AnimatePresence>
                {path.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="flex items-center gap-2 px-5 py-2 border-b flex-wrap"
                        style={{ borderColor: 'var(--border-subtle)' }}
                    >
                        {path.map((lvl, i) => (
                            <span key={lvl.node.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                                style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.3)', color: '#93c5fd' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{lvl.label}</span>
                                <span style={{ color: '#60a5fa' }}>{lvl.node.label}</span>
                                <button onClick={() => removeFilter(i)} className="opacity-60 hover:opacity-100 transition-opacity">
                                    <X size={10} />
                                </button>
                            </span>
                        ))}
                        {path.length > 0 && (
                            <button onClick={() => setPath([])} className="text-[10px] underline" style={{ color: 'var(--text-muted)' }}>
                                مسح الكل
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* جسم الشجرة */}
            <div ref={scrollRef} className="flex overflow-x-auto p-5 gap-0 items-start" dir="ltr">

                {/* عمود الجذر: Net Sales */}
                <div className="flex-shrink-0 flex flex-col items-start justify-center ml-2" style={{ minWidth: '110px' }}>
                    <div className="p-2 rounded-md" style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.25)' }}>
                        <p className="text-[10px] font-semibold" style={{ color: '#60a5fa' }}>Net Sales</p>
                        <p className="text-sm font-bold" style={{ color: '#93c5fd' }} dir="ltr">
                            {treeData.value.toLocaleString('en-US')}
                        </p>
                    </div>
                </div>

                {/* خط توصيل من الجذر */}
                <ConnectorLine />

                {/* أعمدة ديناميكية */}
                {columns.map((col, colIdx) => {
                    const selectedNode = path[colIdx]?.node;
                    const maxVal = getMax(col.nodes);
                    return (
                        <React.Fragment key={`col-${colIdx}`}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: colIdx * 0.05 }}
                                className="flex-shrink-0"
                                style={{ minWidth: '160px', maxWidth: '160px' }}
                            >
                                {/* رأس العمود */}
                                <div className="flex items-center justify-between mb-2 px-1">
                                    <span className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                                        {col.title}
                                    </span>
                                    {selectedNode && colIdx < path.length && (
                                        <button onClick={() => removeFilter(colIdx)}
                                            className="p-0.5 rounded transition-colors"
                                            style={{ color: 'var(--text-muted)' }}>
                                            <X size={10} />
                                        </button>
                                    )}
                                </div>

                                {/* العناصر */}
                                <div className="space-y-0">
                                    {col.nodes.slice(0, 10).map((node) => (
                                        <TreeItem
                                            key={node.id}
                                            node={node}
                                            max={maxVal}
                                            selected={selectedNode?.id === node.id}
                                            onClick={() => handleSelect(colIdx, node)}
                                        />
                                    ))}
                                    {col.nodes.length > 10 && (
                                        <div className="flex justify-center pt-1">
                                            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* خطوط التوصيل بين الأعمدة */}
                            {colIdx < columns.length - 1 && (
                                <ConnectorLine selected={!!selectedNode} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

// ── خط التوصيل ──
function ConnectorLine({ selected = true }: { selected?: boolean }) {
    return (
        <div className="flex-shrink-0 flex items-center justify-center" style={{ width: '28px', paddingTop: '40px' }}>
            <div style={{
                width: '24px',
                height: '2px',
                background: selected ? 'rgba(37,99,235,0.6)' : 'var(--border-subtle)',
                transition: 'background 0.3s',
            }} />
        </div>
    );
}
