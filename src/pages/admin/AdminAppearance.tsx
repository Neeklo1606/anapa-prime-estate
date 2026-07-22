import { useState, useRef } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import {
  useTheme, PRESETS, DEFAULT_THEME, applyTheme,
  type FontKey, type CardStyleKey, type ButtonStyleKey, type AnimSpeedKey,
} from "@/store/useTheme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Palette, Type, Square as SquareIcon, Layers, Sparkles, Download, Upload,
  RotateCcw, Save, Check, Wand2, Pipette,
} from "lucide-react";
import { toast } from "sonner";

const FONTS: FontKey[] = ["Inter", "Manrope", "Geist", "Plus Jakarta Sans", "SF Pro"];
const CARD_STYLES: CardStyleKey[] = ["classic", "soft", "glass", "minimal", "luxury", "elevated", "bordered", "floating"];
const BUTTON_STYLES: ButtonStyleKey[] = ["fill", "outline", "soft", "ghost"];
const SPEEDS: AnimSpeedKey[] = ["slow", "normal", "fast"];

const RADIUS_PRESETS = [
  { k: "Square", v: 0 }, { k: "Small", v: 0.375 }, { k: "Medium", v: 0.625 },
  { k: "Large", v: 1 }, { k: "XL", v: 1.5 },
];

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-border last:border-0">
      <Label className="text-[13px] text-foreground/80">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 rounded-md border border-border px-2 py-1 hover:border-foreground/30 transition">
            <span className="w-5 h-5 rounded-sm ring-1 ring-border" style={{ background: value }} />
            <span className="text-[12px] font-mono num text-muted-foreground">{value.toUpperCase()}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-3" align="end">
          <HexColorPicker color={value} onChange={onChange} style={{ width: "100%" }} />
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[11px] text-muted-foreground">HEX</span>
            <HexColorInput
              color={value}
              onChange={onChange}
              prefixed
              className="flex-1 h-8 rounded-md border border-input bg-background px-2 text-[12px] font-mono num uppercase"
            />
            {"EyeDropper" in window && (
              <button
                title="Пипетка"
                className="h-8 w-8 grid place-items-center rounded-md border border-input hover:bg-accent/10"
                onClick={async () => {
                  try {
                    // @ts-expect-error experimental
                    const ed = new window.EyeDropper();
                    const r = await ed.open();
                    onChange(r.sRGBHex);
                  } catch {}
                }}
              >
                <Pipette className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="surface p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-md bg-accent/10 text-accent grid place-items-center">
          <Icon className="w-3.5 h-3.5" />
        </div>
        <h3 className="text-[14px] font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function AdminAppearance() {
  const { theme, patch, patchColor, loadPreset, reset, saveCustom, customThemes, importJson, exportJson, exportCss } = useTheme();
  const fileRef = useRef<HTMLInputElement>(null);
  const [customName, setCustomName] = useState("");

  return (
    <div className="min-h-screen bg-secondary/40">
      {/* Top bar */}
      <header className="h-14 border-b border-border bg-card/80 backdrop-blur sticky top-0 z-30 flex items-center px-6">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-accent" />
          <div>
            <div className="text-[13px] font-semibold leading-none">Theme Builder</div>
            <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-[0.14em]">Settings · Appearance</div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
            <Upload className="w-3.5 h-3.5" /> Импорт
          </Button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={async e => {
            const f = e.target.files?.[0]; if (!f) return;
            const ok = importJson(await f.text());
            toast[ok ? "success" : "error"](ok ? "Тема импортирована" : "Невалидный JSON");
          }} />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm"><Download className="w-3.5 h-3.5" /> Экспорт</Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 p-2">
              <button className="w-full text-left px-3 py-2 hover:bg-secondary rounded text-[13px]"
                onClick={() => { downloadFile(`${theme.name}.json`, exportJson()); }}>
                JSON <span className="text-muted-foreground text-[11px]">· полный объект темы</span>
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-secondary rounded text-[13px]"
                onClick={() => { downloadFile(`${theme.name}.css`, exportCss()); }}>
                CSS Variables
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-secondary rounded text-[13px]"
                onClick={() => { navigator.clipboard.writeText(exportJson()); toast.success("JSON скопирован"); }}>
                Tailwind / Clipboard
              </button>
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm" onClick={() => { reset(); toast.success("Тема сброшена"); }}>
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[420px_1fr] gap-0">
        {/* Controls */}
        <div className="border-r border-border bg-background p-6 space-y-5 max-h-[calc(100vh-56px)] overflow-y-auto">
          {/* Presets */}
          <Section title="Готовые темы" icon={Sparkles}>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(PRESETS).map(p => {
                const active = theme.name === p.name;
                return (
                  <button key={p.name} onClick={() => { loadPreset(p.name); toast.success(`Применена тема «${p.name}»`); }}
                    className={`group relative text-left rounded-lg border p-2.5 transition ${active ? "border-accent ring-2 ring-accent/30" : "border-border hover:border-foreground/30"}`}>
                    <div className="flex gap-1 mb-2">
                      {[p.colors.primary, p.colors.accent, p.colors.background, p.colors.border].map((c, i) => (
                        <span key={i} className="flex-1 h-6 rounded" style={{ background: c }} />
                      ))}
                    </div>
                    <div className="text-[12px] font-medium flex items-center gap-1">
                      {p.name}
                      {active && <Check className="w-3 h-3 text-accent" />}
                    </div>
                  </button>
                );
              })}
            </div>
            {customThemes.length > 0 && (
              <>
                <div className="eyebrow mt-4 mb-2">Custom</div>
                <div className="grid grid-cols-2 gap-2">
                  {customThemes.map(p => (
                    <button key={p.name} onClick={() => loadPreset(p.name)} className="rounded-lg border border-border p-2 text-left hover:border-foreground/30">
                      <div className="flex gap-1 mb-1.5">
                        {[p.colors.primary, p.colors.accent, p.colors.background].map((c, i) => (
                          <span key={i} className="flex-1 h-5 rounded" style={{ background: c }} />
                        ))}
                      </div>
                      <div className="text-[11px]">{p.name}</div>
                    </button>
                  ))}
                </div>
              </>
            )}
            <div className="mt-3 flex gap-2">
              <Input placeholder="Имя темы" value={customName} onChange={e => setCustomName(e.target.value)} className="h-9 text-[12px]" />
              <Button size="sm" onClick={() => { if (customName) { saveCustom(customName); toast.success("Сохранено"); setCustomName(""); } }}>
                <Save className="w-3.5 h-3.5" /> Save
              </Button>
            </div>
          </Section>

          <Tabs defaultValue="colors">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="colors"><Palette className="w-3.5 h-3.5" /></TabsTrigger>
              <TabsTrigger value="type"><Type className="w-3.5 h-3.5" /></TabsTrigger>
              <TabsTrigger value="radius"><SquareIcon className="w-3.5 h-3.5" /></TabsTrigger>
              <TabsTrigger value="cards"><Layers className="w-3.5 h-3.5" /></TabsTrigger>
              <TabsTrigger value="fx"><Sparkles className="w-3.5 h-3.5" /></TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="mt-4 space-y-5">
              <Section title="Цвета бренда" icon={Palette}>
                <ColorField label="Primary" value={theme.colors.primary} onChange={v => patchColor("primary", v)} />
                <ColorField label="Accent" value={theme.colors.accent} onChange={v => patchColor("accent", v)} />
                <ColorField label="Link" value={theme.colors.link} onChange={v => patchColor("link", v)} />
                <ColorField label="Selection" value={theme.colors.selection} onChange={v => patchColor("selection", v)} />
                <ColorField label="Focus Ring" value={theme.colors.focusRing} onChange={v => patchColor("focusRing", v)} />
              </Section>
              <Section title="Поверхности" icon={Layers}>
                <ColorField label="Background" value={theme.colors.background} onChange={v => patchColor("background", v)} />
                <ColorField label="Surface" value={theme.colors.surface} onChange={v => patchColor("surface", v)} />
                <ColorField label="Card" value={theme.colors.card} onChange={v => patchColor("card", v)} />
                <ColorField label="Border" value={theme.colors.border} onChange={v => patchColor("border", v)} />
                <ColorField label="Overlay" value={theme.colors.overlay} onChange={v => patchColor("overlay", v)} />
              </Section>
              <Section title="Текст" icon={Type}>
                <ColorField label="Text" value={theme.colors.text} onChange={v => patchColor("text", v)} />
                <ColorField label="Muted" value={theme.colors.muted} onChange={v => patchColor("muted", v)} />
              </Section>
              <Section title="Статусы" icon={Sparkles}>
                <ColorField label="Success" value={theme.colors.success} onChange={v => patchColor("success", v)} />
                <ColorField label="Warning" value={theme.colors.warning} onChange={v => patchColor("warning", v)} />
                <ColorField label="Error" value={theme.colors.error} onChange={v => patchColor("error", v)} />
                <ColorField label="Info" value={theme.colors.info} onChange={v => patchColor("info", v)} />
              </Section>
            </TabsContent>

            <TabsContent value="type" className="mt-4 space-y-5">
              <Section title="Typography" icon={Type}>
                <Label className="text-[12px] text-muted-foreground">Body Font</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {FONTS.map(f => (
                    <button key={f} onClick={() => patch("font", f)}
                      style={{ fontFamily: `'${f}', sans-serif` }}
                      className={`rounded-md border p-2.5 text-left text-[13px] transition ${theme.font === f ? "border-accent bg-accent/5" : "border-border"}`}>
                      {f}
                    </button>
                  ))}
                </div>
                <Label className="text-[12px] text-muted-foreground mt-4 block">Heading Font</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {FONTS.map(f => (
                    <button key={f} onClick={() => patch("headingFont", f)}
                      style={{ fontFamily: `'${f}', sans-serif`, fontWeight: 600 }}
                      className={`rounded-md border p-2.5 text-left text-[13px] transition ${theme.headingFont === f ? "border-accent bg-accent/5" : "border-border"}`}>
                      Aa {f}
                    </button>
                  ))}
                </div>
                <div className="mt-5 space-y-4">
                  <SliderRow label="Font Scale" value={theme.fontScale} min={0.875} max={1.125} step={0.025}
                    onChange={v => patch("fontScale", v)} suffix="x" />
                  <SliderRow label="Letter Spacing" value={theme.letterSpacing} min={-0.04} max={0.04} step={0.005}
                    onChange={v => patch("letterSpacing", v)} suffix="em" />
                  <SliderRow label="Line Height" value={theme.lineHeight} min={1.2} max={1.8} step={0.05}
                    onChange={v => patch("lineHeight", v)} />
                </div>
              </Section>
            </TabsContent>

            <TabsContent value="radius" className="mt-4 space-y-5">
              <Section title="Скругления" icon={SquareIcon}>
                <div className="grid grid-cols-5 gap-2">
                  {RADIUS_PRESETS.map(r => (
                    <button key={r.k} onClick={() => patch("radius", r.v)}
                      className={`flex flex-col items-center gap-1.5 p-2 border rounded-md transition ${Math.abs(theme.radius - r.v) < 0.01 ? "border-accent bg-accent/5" : "border-border"}`}>
                      <div className="w-8 h-8 bg-foreground/80" style={{ borderRadius: `${r.v}rem` }} />
                      <span className="text-[10px]">{r.k}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <SliderRow label="Custom Radius" value={theme.radius} min={0} max={2} step={0.05}
                    onChange={v => patch("radius", v)} suffix="rem" />
                </div>
              </Section>
              <Section title="Buttons" icon={SquareIcon}>
                <Label className="text-[12px] text-muted-foreground">Style</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {BUTTON_STYLES.map(b => (
                    <button key={b} onClick={() => patch("buttonStyle", b)}
                      className={`text-[11px] capitalize py-1.5 rounded-md border ${theme.buttonStyle === b ? "border-accent bg-accent/5" : "border-border"}`}>{b}</button>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  <SliderRow label="Button Radius" value={theme.buttonRadius} min={0} max={2} step={0.05} onChange={v => patch("buttonRadius", v)} suffix="rem" />
                  <SliderRow label="Button Height" value={theme.buttonHeight} min={32} max={56} step={1} onChange={v => patch("buttonHeight", v)} suffix="px" />
                </div>
              </Section>
            </TabsContent>

            <TabsContent value="cards" className="mt-4 space-y-5">
              <Section title="Card Style" icon={Layers}>
                <div className="grid grid-cols-2 gap-2">
                  {CARD_STYLES.map(c => (
                    <button key={c} onClick={() => patch("cardStyle", c)}
                      className={`text-[12px] capitalize p-3 rounded-md border ${theme.cardStyle === c ? "border-accent bg-accent/5" : "border-border"}`}>{c}</button>
                  ))}
                </div>
              </Section>
              <Section title="Glassmorphism" icon={Layers}>
                <SliderRow label="Blur" value={theme.glass.blur} min={0} max={40} step={1} onChange={v => patch("glass", { ...theme.glass, blur: v })} suffix="px" />
                <SliderRow label="Opacity" value={theme.glass.opacity} min={0} max={1} step={0.05} onChange={v => patch("glass", { ...theme.glass, opacity: v })} />
              </Section>
            </TabsContent>

            <TabsContent value="fx" className="mt-4 space-y-5">
              <Section title="Shadow System" icon={Sparkles}>
                <ColorField label="Shadow Color" value={theme.colors.shadow} onChange={v => patchColor("shadow", v)} />
                <SliderRow label="Blur" value={theme.shadow.blur} min={0} max={80} step={1} onChange={v => patch("shadow", { ...theme.shadow, blur: v })} suffix="px" />
                <SliderRow label="Opacity" value={theme.shadow.opacity} min={0} max={0.5} step={0.01} onChange={v => patch("shadow", { ...theme.shadow, opacity: v })} />
                <SliderRow label="Distance" value={theme.shadow.distance} min={0} max={40} step={1} onChange={v => patch("shadow", { ...theme.shadow, distance: v })} suffix="px" />
                <SliderRow label="Spread" value={theme.shadow.spread} min={-20} max={20} step={1} onChange={v => patch("shadow", { ...theme.shadow, spread: v })} suffix="px" />
              </Section>
              <Section title="Animation" icon={Sparkles}>
                <Label className="text-[12px] text-muted-foreground">Speed</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {SPEEDS.map(s => (
                    <button key={s} onClick={() => patch("anim", { ...theme.anim, speed: s })}
                      className={`text-[12px] capitalize py-1.5 rounded-md border ${theme.anim.speed === s ? "border-accent bg-accent/5" : "border-border"}`}>{s}</button>
                  ))}
                </div>
                <div className="mt-3">
                  <SliderRow label="Hover Scale" value={theme.anim.hoverScale} min={1} max={1.1} step={0.005} onChange={v => patch("anim", { ...theme.anim, hoverScale: v })} suffix="x" />
                </div>
              </Section>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="p-8 max-h-[calc(100vh-56px)] overflow-y-auto">
          <div className="eyebrow mb-3">Live Preview</div>
          <h2 className="text-2xl font-semibold mb-6">Все изменения применяются мгновенно ко всему сайту</h2>

          <LivePreview />
        </div>
      </div>
    </div>
  );
}

function SliderRow({ label, value, min, max, step, onChange, suffix }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <Label className="text-[12px] text-foreground/80">{label}</Label>
        <span className="text-[11px] num font-mono text-muted-foreground">{value.toFixed(step < 0.1 ? 3 : 2)}{suffix}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

function LivePreview() {
  return (
    <div className="space-y-6">
      {/* Buttons */}
      <div className="surface p-5">
        <div className="eyebrow mb-3">Buttons</div>
        <div className="flex flex-wrap gap-3">
          <Button>Primary CTA</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="card-premium p-5">
            <div className="aspect-[5/3] rounded-lg bg-gradient-to-br from-primary to-accent mb-3" />
            <div className="chip-brand mb-2">ЖК Premium</div>
            <div className="text-base font-semibold">Объект #{i}</div>
            <div className="text-[12px] text-muted-foreground mt-1">2-комн · 64 м² · Анапа</div>
            <div className="display-xl text-xl mt-3">14.8 млн ₽</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="surface p-5">
        <div className="eyebrow mb-3">Form Elements</div>
        <div className="grid md:grid-cols-2 gap-3">
          <Input placeholder="Введите имя" />
          <Input placeholder="email@example.com" />
        </div>
      </div>

      {/* Status badges */}
      <div className="surface p-5">
        <div className="eyebrow mb-3">Status & Typography</div>
        <h1 className="display-xl text-4xl mb-2">Заголовок Hero</h1>
        <p className="text-muted-foreground mb-4">Подзаголовок с muted цветом и базовой типографикой.</p>
        <a href="#" className="underline" style={{ color: "hsl(var(--accent))" }}>Ссылка</a>
        <div className="flex gap-2 mt-4">
          <span className="text-[11px] px-2 py-1 rounded-md text-white" style={{ background: "hsl(var(--success))" }}>Success</span>
          <span className="text-[11px] px-2 py-1 rounded-md" style={{ background: "hsl(var(--warning))", color: "#0F172A" }}>Warning</span>
          <span className="text-[11px] px-2 py-1 rounded-md text-white" style={{ background: "hsl(var(--destructive))" }}>Error</span>
          <span className="text-[11px] px-2 py-1 rounded-md text-white" style={{ background: "hsl(var(--accent))" }}>Info</span>
        </div>
      </div>

      {/* Table */}
      <div className="surface p-5">
        <div className="eyebrow mb-3">Table</div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="pb-2 font-medium">Объект</th>
              <th className="pb-2 font-medium">Цена</th>
              <th className="pb-2 font-medium">Статус</th>
            </tr>
          </thead>
          <tbody>
            {["Морская волна", "Резиденция Парк", "Бухта"].map((r, i) => (
              <tr key={r} className="border-b border-border last:border-0">
                <td className="py-2.5">{r}</td>
                <td className="py-2.5 num">{(12.3 + i).toFixed(1)} млн ₽</td>
                <td className="py-2.5"><span className="chip-brand">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function downloadFile(name: string, content: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}
