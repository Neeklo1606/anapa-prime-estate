import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { type PropertyType, type PropertyStatus } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export type Segment = "secondary" | "new";

export interface FilterState {
  segment?: Segment;
  type?: PropertyType | "all";
  city?: string;
  complexId?: string;
  rooms?: string;
  priceMin?: string;
  priceMax?: string;
  areaMin?: string;
  areaMax?: string;
  deadline?: string;
  developer?: string;
  status?: PropertyStatus | "all";
}

const CITIES = ["Анапа", "Новороссийск", "Краснодар", "Геленджик", "Сочи"];
const DEVELOPERS = ["ЮгСтрой", "ЧерноморИнвест", "AnapaDev", "СтройГрад", "Марина Групп"];

export const matchProperty = (
  p: ReturnType<typeof useStore.getState>["properties"][number],
  f: FilterState
) => {
  if (f.segment === "new" && p.status === "распродано") return false;
  if (f.type && f.type !== "all" && p.type !== f.type) return false;
  // City filter (all mock data lives in Анапа)
  if (f.city && f.city !== "all" && f.city !== "Анапа") return false;
  if (f.complexId && f.complexId !== "all" && p.complexId !== f.complexId) return false;
  if (f.rooms && f.rooms !== "all") {
    if (f.rooms === "4+" ? p.rooms < 4 : String(p.rooms) !== f.rooms) return false;
  }
  if (f.priceMin && p.price < +f.priceMin * 1_000_000) return false;
  if (f.priceMax && p.price > +f.priceMax * 1_000_000) return false;
  if (f.areaMin && p.area < +f.areaMin) return false;
  if (f.areaMax && p.area > +f.areaMax) return false;
  if (f.deadline && f.deadline !== "all" && !p.deadline.includes(f.deadline)) return false;
  if (f.status && f.status !== "all" && p.status !== f.status) return false;
  return true;
};

export default function PropertyFilter({
  value, onChange, compact = false, showSubmit = true,
}: {
  value: FilterState;
  onChange: (v: FilterState) => void;
  compact?: boolean;
  showSubmit?: boolean;
}) {
  const navigate = useNavigate();
  const properties = useStore(s => s.properties);
  const count = useMemo(() => properties.filter(p => matchProperty(p, value)).length, [properties, value]);
  const segment: Segment = value.segment ?? "secondary";
  const isNew = segment === "new";
  const set = (k: keyof FilterState, v: string) => onChange({ ...value, [k]: v });
  const reset = () => onChange({ segment });

  return (
    <div className={compact ? "" : "rounded-2xl bg-white border border-border p-5 lg:p-7 shadow-md"}>
      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {(["secondary", "new"] as const).map(s => {
          const active = segment === s;
          return (
            <button
              key={s}
              onClick={() => onChange({ ...value, segment: s })}
              className={`h-12 rounded-xl text-[14px] font-medium transition-colors ${
                active
                  ? "bg-[hsl(var(--brand))] text-white"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "secondary" ? "Вторичка" : "Новостройки"}
            </button>
          );
        })}
      </div>

      <div className={`grid gap-3 grid-cols-2 ${isNew ? "lg:grid-cols-4" : "lg:grid-cols-5"}`}>
        <Field label="Тип объекта">
          <Select value={value.type ?? "all"} onValueChange={(v) => set("type", v)}>
            <SelectTrigger className="h-10 rounded-lg bg-white"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="квартира">Квартира</SelectItem>
              <SelectItem value="апартаменты">Апартаменты</SelectItem>
              <SelectItem value="дом">Дома</SelectItem>
              {isNew && <SelectItem value="инвестиции">Инвестиции</SelectItem>}
              {isNew && <SelectItem value="коммерция">Коммерция</SelectItem>}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Город">
          <Select value={value.city ?? "all"} onValueChange={(v) => set("city", v)}>
            <SelectTrigger className="h-10 rounded-lg bg-white"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все города</SelectItem>
              {CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Цена, млн ₽">
          <div className="flex gap-1.5">
            <Input className="h-10 rounded-lg bg-white num" type="number" placeholder="от" value={value.priceMin ?? ""} onChange={e => set("priceMin", e.target.value)} />
            <Input className="h-10 rounded-lg bg-white num" type="number" placeholder="до" value={value.priceMax ?? ""} onChange={e => set("priceMax", e.target.value)} />
          </div>
        </Field>

        <Field label="Комнаты">
          <Select value={value.rooms ?? "all"} onValueChange={(v) => set("rooms", v)}>
            <SelectTrigger className="h-10 rounded-lg bg-white"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любое</SelectItem>
              <SelectItem value="0">Студия</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4+">4+</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="Площадь, м²">
          <div className="flex gap-1.5">
            <Input className="h-10 rounded-lg bg-white num" type="number" placeholder="от" value={value.areaMin ?? ""} onChange={e => set("areaMin", e.target.value)} />
            <Input className="h-10 rounded-lg bg-white num" type="number" placeholder="до" value={value.areaMax ?? ""} onChange={e => set("areaMax", e.target.value)} />
          </div>
        </Field>

        {isNew && (
          <Field label="Срок сдачи">
            <Select value={value.deadline ?? "all"} onValueChange={(v) => set("deadline", v)}>
              <SelectTrigger className="h-10 rounded-lg bg-white"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любой</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
                <SelectItem value="сдан">Сдан</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )}

        {isNew && (
          <Field label="Застройщик">
            <Select value={value.developer ?? "all"} onValueChange={(v) => set("developer", v)}>
              <SelectTrigger className="h-10 rounded-lg bg-white"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все</SelectItem>
                {DEVELOPERS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        )}
      </div>

      {showSubmit && (
        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="text-[13.5px] text-muted-foreground">
            Найдено <span className="font-semibold text-foreground text-[16px] num">{count}</span> объектов
          </div>
          <div className="flex gap-2 w-full sm:w-auto items-center">
            <Button variant="ghost" onClick={reset} className="text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent h-11 px-4">
              Сбросить
            </Button>
            <Button
              onClick={() => navigate("/catalog")}
              className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90 text-white h-11 rounded-xl w-full sm:w-auto px-8"
            >
              Найти
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
