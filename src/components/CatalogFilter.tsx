import { DISTRICTS, type PropertyStatus } from "@/data/mock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export type BuildStage = "all" | "new" | "resale";

export interface CatalogFilterState {
  types: string[];        // "квартира","апартаменты","дом","коммерция","комната","участок","дача"
  stage: BuildStage;
  priceMin?: string;
  priceMax?: string;
  rooms: string[];        // "0","1","2","3","4+"
  areaMin?: string;
  areaMax?: string;
  floorMin?: string;
  floorMax?: string;
  deadline?: string;      // "2025".."2028+"
  statuses: PropertyStatus[];
  districts: string[];
  builder?: string;
}

export const emptyFilter: CatalogFilterState = {
  types: [], stage: "all", rooms: [], statuses: [], districts: [],
};

const TYPES = [
  { key: "квартира", label: "Квартиры" },
  { key: "комната", label: "Комнаты" },
  { key: "дом", label: "Дома" },
  { key: "участок", label: "Участки" },
  { key: "дача", label: "Дачи" },
  { key: "коммерция", label: "Коммерция" },
];

const ROOMS = ["0", "1", "2", "3", "4+"];
const ROOM_LABELS: Record<string, string> = { "0": "Ст", "1": "1", "2": "2", "3": "3", "4+": "4+" };
const STATUSES: PropertyStatus[] = ["в продаже", "скоро", "распродано"];
const BUILDERS = ["ЮГ-Строй", "Кубань-Инвест", "Черноморстрой", "Анапа-Девелопмент", "Морской Дом"];

export default function CatalogFilter({
  value, onChange,
}: {
  value: CatalogFilterState;
  onChange: (v: CatalogFilterState) => void;
}) {
  const toggle = <K extends keyof CatalogFilterState>(k: K, item: string) => {
    const arr = (value[k] as unknown as string[]) ?? [];
    const next = arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
    onChange({ ...value, [k]: next } as CatalogFilterState);
  };
  const set = <K extends keyof CatalogFilterState>(k: K, v: CatalogFilterState[K]) => onChange({ ...value, [k]: v });

  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Фильтры</div>
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground" onClick={() => onChange(emptyFilter)}>
          <RotateCcw className="w-3 h-3" /> Сброс
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["type", "price", "rooms"]} className="w-full">
        <AccordionItem value="type">
          <AccordionTrigger className="text-sm font-semibold">Тип объекта</AccordionTrigger>
          <AccordionContent className="space-y-3">
            <div className="flex gap-1 p-1 bg-[hsl(var(--surface-1))] rounded-lg">
              {(["all","new","resale"] as BuildStage[]).map(s => (
                <button key={s} onClick={() => set("stage", s)}
                  className={`flex-1 h-8 text-[12px] rounded-md transition-colors ${value.stage === s ? "bg-card shadow-sm font-medium" : "text-muted-foreground"}`}>
                  {s === "all" ? "Все" : s === "new" ? "Новостройки" : "Вторичка"}
                </button>
              ))}
            </div>
            <div className="space-y-2 pt-1">
              {TYPES.map(t => (
                <label key={t.key} className="flex items-center gap-2.5 text-sm cursor-pointer">
                  <Checkbox checked={value.types.includes(t.key)} onCheckedChange={() => toggle("types", t.key)} />
                  <span>{t.label}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-semibold">Цена, ₽</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2">
              <Input type="number" placeholder="от" className="h-10 num" value={value.priceMin ?? ""} onChange={e => set("priceMin", e.target.value)} />
              <Input type="number" placeholder="до" className="h-10 num" value={value.priceMax ?? ""} onChange={e => set("priceMax", e.target.value)} />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rooms">
          <AccordionTrigger className="text-sm font-semibold">Комнатность</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-1.5 flex-wrap">
              {ROOMS.map(r => {
                const active = value.rooms.includes(r);
                return (
                  <button key={r} onClick={() => toggle("rooms", r)}
                    className={`h-10 min-w-[44px] px-3 rounded-lg text-sm font-medium border transition-colors ${
                      active ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-foreground/30"
                    }`}>{ROOM_LABELS[r]}</button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="area">
          <AccordionTrigger className="text-sm font-semibold">Площадь, м²</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2">
              <Input type="number" placeholder="от" className="h-10 num" value={value.areaMin ?? ""} onChange={e => set("areaMin", e.target.value)} />
              <Input type="number" placeholder="до" className="h-10 num" value={value.areaMax ?? ""} onChange={e => set("areaMax", e.target.value)} />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="floor">
          <AccordionTrigger className="text-sm font-semibold">Этаж</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2">
              <Input type="number" placeholder="от" className="h-10 num" value={value.floorMin ?? ""} onChange={e => set("floorMin", e.target.value)} />
              <Input type="number" placeholder="до" className="h-10 num" value={value.floorMax ?? ""} onChange={e => set("floorMax", e.target.value)} />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="deadline">
          <AccordionTrigger className="text-sm font-semibold">Срок сдачи</AccordionTrigger>
          <AccordionContent>
            <Select value={value.deadline ?? "all"} onValueChange={v => set("deadline", v === "all" ? undefined : v)}>
              <SelectTrigger className="h-10"><SelectValue placeholder="Любой" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любой</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
                <SelectItem value="2028+">2028+</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="status">
          <AccordionTrigger className="text-sm font-semibold">Статус</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {STATUSES.map(s => (
              <label key={s} className="flex items-center gap-2.5 text-sm cursor-pointer capitalize">
                <Checkbox checked={value.statuses.includes(s)} onCheckedChange={() => toggle("statuses", s)} />
                <span>{s}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="district">
          <AccordionTrigger className="text-sm font-semibold">Район</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {DISTRICTS.map(d => (
              <label key={d} className="flex items-center gap-2.5 text-sm cursor-pointer">
                <Checkbox checked={value.districts.includes(d)} onCheckedChange={() => toggle("districts", d)} />
                <span>{d}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="builder">
          <AccordionTrigger className="text-sm font-semibold">Застройщик</AccordionTrigger>
          <AccordionContent>
            <Select value={value.builder ?? "all"} onValueChange={v => set("builder", v === "all" ? undefined : v)}>
              <SelectTrigger className="h-10"><SelectValue placeholder="Все" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все застройщики</SelectItem>
                {BUILDERS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
            <Label className="text-[11px] text-muted-foreground mt-2 block">Проверенные партнёры платформы</Label>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

// Matcher lives here to keep concerns together
export function matchCatalog(p: {
  type: string; rooms: number; area: number; floor: number; price: number;
  district: string; deadline: string; status: PropertyStatus;
}, f: CatalogFilterState) {
  if (f.types.length) {
    // map "квартира" includes "апартаменты" alias
    const eff = f.types.includes("квартира") ? [...f.types, "апартаменты"] : f.types;
    if (!eff.includes(p.type)) return false;
  }
  if (f.stage === "new" && p.status === "распродано") return false;
  if (f.stage === "resale" && p.status !== "распродано" && !p.deadline.match(/202[0-4]/)) {
    // rough heuristic
  }
  if (f.priceMin && p.price < +f.priceMin) return false;
  if (f.priceMax && p.price > +f.priceMax) return false;
  if (f.rooms.length) {
    const ok = f.rooms.some(r => r === "4+" ? p.rooms >= 4 : String(p.rooms) === r);
    if (!ok) return false;
  }
  if (f.areaMin && p.area < +f.areaMin) return false;
  if (f.areaMax && p.area > +f.areaMax) return false;
  if (f.floorMin && p.floor < +f.floorMin) return false;
  if (f.floorMax && p.floor > +f.floorMax) return false;
  if (f.deadline) {
    if (f.deadline === "2028+") {
      const m = p.deadline.match(/(\d{4})/);
      if (!m || +m[1] < 2028) return false;
    } else if (!p.deadline.includes(f.deadline)) return false;
  }
  if (f.statuses.length && !f.statuses.includes(p.status)) return false;
  if (f.districts.length && !f.districts.includes(p.district)) return false;
  return true;
}
