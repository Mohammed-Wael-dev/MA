// ═══════════════════════════════════════════════════════════════
// MILITARY CONSUMER CORPORATION — DESIGN TOKEN SYSTEM
// Strategic Intelligence Platform — Design Foundation
// ═══════════════════════════════════════════════════════════════

export const colors = {
  // ── Core Backgrounds ──
  bg: {
    primary: '#0a0e17',    // Deep space
    secondary: '#111827',  // Graphite
    panel: '#1a2035',      // Navy panel
    elevated: '#1e2a3a',   // Elevated surface
    hover: '#243347',      // Hover state
    input: '#0f1729',      // Input fields
  },

  // ── Borders ──
  border: {
    subtle: '#1e293b',
    default: '#334155',
    strong: '#475569',
    focus: '#00e5a0',
  },

  // ── Text ──
  text: {
    primary: '#e2e8f0',
    secondary: '#94a3b8',
    muted: '#64748b',
    inverse: '#0a0e17',
    accent: '#00e5a0',
  },

  // ── Accent Colors ──
  accent: {
    green: '#00e5a0',      // Tactical green
    greenDim: '#00e5a033', // Tactical green dimmed
    cyan: '#00d4ff',       // Neon cyan (AI)
    cyanDim: '#00d4ff33',  // Neon cyan dimmed
    amber: '#f59e0b',      // Warning amber
    amberDim: '#f59e0b33',
    red: '#ef4444',        // Alert red
    redDim: '#ef444433',
    blue: '#3b82f6',       // Info blue
    blueDim: '#3b82f633',
    purple: '#a855f7',     // Special purple
    purpleDim: '#a855f733',
  },

  // ── Semantic ──
  semantic: {
    success: '#00e5a0',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#00d4ff',
    processing: '#a855f7',
  },

  // ── Chart Palette ──
  chart: [
    '#00e5a0', '#00d4ff', '#3b82f6', '#a855f7',
    '#f59e0b', '#ef4444', '#ec4899', '#14b8a6',
    '#8b5cf6', '#06b6d4',
  ],
} as const;

export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.8125rem',  // 13px
    base: '0.875rem', // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
  sidebar: {
    expanded: '280px',
    collapsed: '72px',
  },
  header: {
    height: '64px',
  },
  page: {
    padding: '24px',
  },
} as const;

export const shadows = {
  glow: {
    green: '0 0 20px rgba(0, 229, 160, 0.3), 0 0 60px rgba(0, 229, 160, 0.1)',
    cyan: '0 0 20px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1)',
    amber: '0 0 20px rgba(245, 158, 11, 0.3)',
    red: '0 0 20px rgba(239, 68, 68, 0.3)',
  },
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
  elevated: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
} as const;

export const animation = {
  transition: {
    fast: '150ms ease',
    default: '250ms ease',
    slow: '400ms ease',
  },
} as const;
