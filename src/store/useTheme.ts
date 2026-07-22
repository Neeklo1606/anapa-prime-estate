import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ---------- color utils ---------- */
export function hexToHslTriplet(hex: string): string {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hh = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: hh = (g - b) / d + (g < b ? 6 : 0); break;
      case g: hh = (b - r) / d + 2; break;
      case b: hh = (r - g) / d + 4; break;
    }
    hh /= 6;
  }
  return `${Math.round(hh * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function readableOn(hex: string): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#0F172A" : "#FFFFFF";
}

/* ---------- theme schema ---------- */
export type FontKey = "Inter" | "Manrope" | "Geist" | "Plus Jakarta Sans" | "SF Pro";
export type CardStyleKey = "classic" | "soft" | "glass" | "minimal" | "luxury" | "elevated" | "bordered" | "floating";
export type ButtonStyleKey = "fill" | "outline" | "soft" | "ghost";
export type AnimSpeedKey = "slow" | "normal" | "fast";

export interface Theme {
  name: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    card: string;
    border: string;
    text: string;
    muted: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    link: string;
    selection: string;
    focusRing: string;
    shadow: string;
    overlay: string;
  };
  radius: number;          // base rem
  font: FontKey;
  headingFont: FontKey;
  fontScale: number;       // 0.875 .. 1.125
  letterSpacing: number;   // em
  lineHeight: number;
  cardStyle: CardStyleKey;
  buttonStyle: ButtonStyleKey;
  buttonRadius: number;
  buttonHeight: number;
  shadow: { blur: number; opacity: number; distance: number; spread: number };
  glass: { blur: number; opacity: number };
  anim: { speed: AnimSpeedKey; hoverScale: number };
}

export const DEFAULT_THEME: Theme = {
  name: "Re-Apple Emerald",
  colors: {
    primary: "#173F36",
    accent: "#173F36",
    background: "#F7F9FB",
    surface: "#EEF1F5",
    card: "#FFFFFF",
    border: "#E3E7EC",
    text: "#22272F",
    muted: "#737C8A",
    success: "#20A37E",
    warning: "#F2A413",
    error: "#DC2626",
    info: "#173F36",
    link: "#173F36",
    selection: "#173F36",
    focusRing: "#173F36",
    shadow: "#22272F",
    overlay: "#22272F",
  },
  radius: 0.75,
  font: "Inter",
  headingFont: "Inter",
  fontScale: 1,
  letterSpacing: -0.015,
  lineHeight: 1.5,
  cardStyle: "soft",
  buttonStyle: "fill",
  buttonRadius: 0.75,
  buttonHeight: 40,
  shadow: { blur: 24, opacity: 0.08, distance: 8, spread: -4 },
  glass: { blur: 20, opacity: 0.78 },
  anim: { speed: "normal", hoverScale: 1.02 },
};

export const PRESETS: Record<string, Theme> = {
  "Premium Navy": DEFAULT_THEME,
  "Ocean Blue": {
    ...DEFAULT_THEME, name: "Ocean Blue",
    colors: { ...DEFAULT_THEME.colors, primary: "#0B4D8A", accent: "#0EA5E9", selection: "#0EA5E9", focusRing: "#0EA5E9", link: "#0EA5E9", info: "#0EA5E9" },
  },
  "Luxury Dark": {
    ...DEFAULT_THEME, name: "Luxury Dark",
    colors: { ...DEFAULT_THEME.colors, primary: "#D4AF37", accent: "#D4AF37", background: "#0B0F17", surface: "#11161F", card: "#141A24", border: "#1F2733", text: "#F2F4F8", muted: "#8A93A1", link: "#D4AF37", selection: "#D4AF37", focusRing: "#D4AF37" },
    cardStyle: "elevated",
  },
  "Minimal White": {
    ...DEFAULT_THEME, name: "Minimal White",
    colors: { ...DEFAULT_THEME.colors, primary: "#111111", accent: "#111111", border: "#EDEDED", muted: "#6B7280", link: "#111111", selection: "#111111", focusRing: "#111111" },
    cardStyle: "minimal", radius: 0.5,
  },
  "Nordic": {
    ...DEFAULT_THEME, name: "Nordic",
    colors: { ...DEFAULT_THEME.colors, primary: "#2E3440", accent: "#5E81AC", surface: "#ECEFF4", border: "#D8DEE9", link: "#5E81AC", selection: "#5E81AC", focusRing: "#5E81AC" },
    font: "Inter",
  },
  "Apple": {
    ...DEFAULT_THEME, name: "Apple",
    colors: { ...DEFAULT_THEME.colors, primary: "#1D1D1F", accent: "#0071E3", link: "#0071E3", selection: "#0071E3", focusRing: "#0071E3" },
    font: "SF Pro", headingFont: "SF Pro", radius: 0.875,
  },
  "Stripe": {
    ...DEFAULT_THEME, name: "Stripe",
    colors: { ...DEFAULT_THEME.colors, primary: "#0A2540", accent: "#635BFF", link: "#635BFF", selection: "#635BFF", focusRing: "#635BFF" },
  },
  "Linear": {
    ...DEFAULT_THEME, name: "Linear",
    colors: { ...DEFAULT_THEME.colors, primary: "#1F1F22", accent: "#5E6AD2", surface: "#FAFAFB", link: "#5E6AD2", selection: "#5E6AD2", focusRing: "#5E6AD2" },
    radius: 0.625, font: "Inter",
  },
  "Notion": {
    ...DEFAULT_THEME, name: "Notion",
    colors: { ...DEFAULT_THEME.colors, primary: "#1F1F1F", accent: "#2383E2", link: "#2383E2", selection: "#2383E2", focusRing: "#2383E2", border: "#E9E9E7", surface: "#F7F6F3" },
    cardStyle: "minimal",
  },
  "Emerald": {
    ...DEFAULT_THEME, name: "Emerald",
    colors: { ...DEFAULT_THEME.colors, primary: "#064E3B", accent: "#10B981", link: "#10B981", selection: "#10B981", focusRing: "#10B981" },
  },
  "Real Estate Gold": {
    ...DEFAULT_THEME, name: "Real Estate Gold",
    colors: { ...DEFAULT_THEME.colors, primary: "#1A1A1A", accent: "#B58A37", link: "#B58A37", selection: "#B58A37", focusRing: "#B58A37" },
    cardStyle: "luxury",
  },
  "Modern Graphite": {
    ...DEFAULT_THEME, name: "Modern Graphite",
    colors: { ...DEFAULT_THEME.colors, primary: "#2B2D31", accent: "#7C8595", surface: "#F4F5F7", link: "#7C8595", selection: "#7C8595", focusRing: "#7C8595" },
  },
};

/* ---------- apply to :root ---------- */
export function applyTheme(t: Theme) {
  const r = document.documentElement;
  const c = t.colors;
  const set = (k: string, v: string) => r.style.setProperty(k, v);

  // Color tokens (HSL triplets used by Tailwind via hsl(var(--x)))
  set("--background", hexToHslTriplet(c.background));
  set("--foreground", hexToHslTriplet(c.text));
  set("--card", hexToHslTriplet(c.card));
  set("--card-foreground", hexToHslTriplet(c.text));
  set("--popover", hexToHslTriplet(c.card));
  set("--popover-foreground", hexToHslTriplet(c.text));
  set("--primary", hexToHslTriplet(c.primary));
  set("--primary-foreground", hexToHslTriplet(readableOn(c.primary)));
  set("--secondary", hexToHslTriplet(c.surface));
  set("--secondary-foreground", hexToHslTriplet(c.text));
  set("--muted", hexToHslTriplet(c.surface));
  set("--muted-foreground", hexToHslTriplet(c.muted));
  set("--accent", hexToHslTriplet(c.accent));
  set("--accent-foreground", hexToHslTriplet(readableOn(c.accent)));
  set("--brand", hexToHslTriplet(c.accent));
  set("--brand-foreground", hexToHslTriplet(readableOn(c.accent)));
  set("--destructive", hexToHslTriplet(c.error));
  set("--destructive-foreground", "0 0% 100%");
  set("--success", hexToHslTriplet(c.success));
  set("--warning", hexToHslTriplet(c.warning));
  set("--border", hexToHslTriplet(c.border));
  set("--input", hexToHslTriplet(c.border));
  set("--ring", hexToHslTriplet(c.focusRing));
  set("--surface-1", hexToHslTriplet(c.surface));
  set("--surface-2", hexToHslTriplet(c.surface));
  set("--steel", hexToHslTriplet(c.border));

  // sidebar · derived from primary
  set("--sidebar-background", hexToHslTriplet(shade(c.primary, -0.08)));
  set("--sidebar-foreground", hexToHslTriplet(c.muted));
  set("--sidebar-primary", hexToHslTriplet(c.accent));
  set("--sidebar-primary-foreground", "0 0% 100%");
  set("--sidebar-accent", hexToHslTriplet(shade(c.primary, 0.06)));
  set("--sidebar-accent-foreground", "0 0% 100%");
  set("--sidebar-border", hexToHslTriplet(shade(c.primary, 0.1)));
  set("--sidebar-ring", hexToHslTriplet(c.accent));

  // Radius
  set("--radius", `${t.radius}rem`);
  set("--radius-btn", `${t.buttonRadius}rem`);
  set("--btn-h", `${t.buttonHeight}px`);

  // Typography
  set("--font-body", `'${t.font}', ui-sans-serif, system-ui, sans-serif`);
  set("--font-display", `'${t.headingFont}', '${t.font}', ui-sans-serif, system-ui, sans-serif`);
  set("--font-scale", `${t.fontScale}`);
  set("--letter-spacing", `${t.letterSpacing}em`);
  set("--line-height", `${t.lineHeight}`);
  r.style.fontSize = `${16 * t.fontScale}px`;

  // Shadows
  const sh = t.shadow;
  const sc = `${hexToHslTriplet(c.shadow)} / ${sh.opacity}`;
  set("--shadow-xs", `0 1px 2px hsl(${sc})`);
  set("--shadow-sm", `0 1px 2px hsl(${sc}), 0 1px 3px hsl(${sc})`);
  set("--shadow-md", `0 ${sh.distance / 2}px ${sh.blur / 2}px ${sh.spread}px hsl(${sc})`);
  set("--shadow-lg", `0 ${sh.distance}px ${sh.blur}px ${sh.spread}px hsl(${sc})`);
  set("--shadow-xl", `0 ${sh.distance * 1.6}px ${sh.blur * 1.8}px ${sh.spread}px hsl(${sc})`);

  // Glass
  set("--glass-blur", `${t.glass.blur}px`);
  set("--glass-opacity", `${t.glass.opacity}`);

  // Animation
  const dur = t.anim.speed === "slow" ? "0.5s" : t.anim.speed === "fast" ? "0.15s" : "0.3s";
  set("--anim-duration", dur);
  set("--hover-scale", `${t.anim.hoverScale}`);

  // Selection
  set("--selection-bg", c.selection + "26"); // 15% alpha
  set("--selection-fg", c.selection);

  // Card style class on root
  r.dataset.cardStyle = t.cardStyle;
  r.dataset.buttonStyle = t.buttonStyle;
}

function shade(hex: string, amount: number) {
  // amount positive = lighter, negative = darker
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const num = parseInt(full, 16);
  let r = (num >> 16) + Math.round(255 * amount);
  let g = ((num >> 8) & 0xff) + Math.round(255 * amount);
  let b = (num & 0xff) + Math.round(255 * amount);
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}

interface State {
  theme: Theme;
  customThemes: Theme[];
  setTheme: (t: Theme) => void;
  patch: <K extends keyof Theme>(k: K, v: Theme[K]) => void;
  patchColor: (k: keyof Theme["colors"], v: string) => void;
  saveCustom: (name: string) => void;
  loadPreset: (name: string) => void;
  reset: () => void;
  importJson: (json: string) => boolean;
  exportJson: () => string;
  exportCss: () => string;
}

export const useTheme = create<State>()(
  persist(
    (set, get) => ({
      theme: DEFAULT_THEME,
      customThemes: [],
      setTheme: (t) => { set({ theme: t }); applyTheme(t); },
      patch: (k, v) => {
        const t = { ...get().theme, [k]: v } as Theme;
        set({ theme: t }); applyTheme(t);
      },
      patchColor: (k, v) => {
        const t = { ...get().theme, colors: { ...get().theme.colors, [k]: v } };
        set({ theme: t }); applyTheme(t);
      },
      saveCustom: (name) => {
        const t = { ...get().theme, name };
        set({ customThemes: [...get().customThemes.filter(x => x.name !== name), t] });
      },
      loadPreset: (name) => {
        const t = PRESETS[name] ?? get().customThemes.find(x => x.name === name);
        if (t) { set({ theme: t }); applyTheme(t); }
      },
      reset: () => { set({ theme: DEFAULT_THEME }); applyTheme(DEFAULT_THEME); },
      importJson: (json) => {
        try {
          const t = JSON.parse(json) as Theme;
          if (!t.colors?.primary) return false;
          set({ theme: t }); applyTheme(t); return true;
        } catch { return false; }
      },
      exportJson: () => JSON.stringify(get().theme, null, 2),
      exportCss: () => {
        const t = get().theme;
        const lines = Object.entries(t.colors).map(([k, v]) =>
          `  --${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}: ${v};`);
        return `:root {\n${lines.join("\n")}\n  --radius: ${t.radius}rem;\n  --font-body: '${t.font}';\n}`;
      },
    }),
    { name: "ugakcent-theme", version: 3, migrate: () => ({ theme: DEFAULT_THEME, customThemes: [] }) as any },
  ),
);
