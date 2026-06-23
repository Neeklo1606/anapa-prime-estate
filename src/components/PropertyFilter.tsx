import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { DISTRICTS, type PropertyType, type PropertyStatus } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Search, RotateCcw, ShoppingBag, Building2, TrendingUp, Briefcase } from "lucide-react";

export type Segment = "buy" | "new" | "invest" | "commercial";

export interface FilterState {
  segment?: Segment;
  type?: PropertyType | "all";
  district?: string;
  complexId?: string;
  rooms?: string;
  priceMin?: string;
  priceMax?: string;
  areaMin?: string;
  areaMax?: string;
  deadline?: string;
  status?: PropertyStatus | "all";
}

export const matchProperty = (p: ReturnType<typeof useStore.getState>["properties"][number], f: FilterState) => {
  if (f.segment === "commercial" && p.type !== "коммерция") return false;
  if (f.segment === "new" && p.status === "распродано") return false;
  if (f.type && f.type !== "all" && p.type !== f.type) return false;
  if (f.district && f.district !== "all" && p.district !== f.district) return false;
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

const SEGMENTS: { key: Segment; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "buy", label: "Покупка", icon: ShoppingBag },
  { key: "new", label: "Новостройки", icon: Building2 },
  { key: "invest", label: "Инвестиции", icon: TrendingUp },
  { key: "commercial", label: "Коммерция", icon: Briefcase },
];

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
  const segment = value.segment ?? "buy";
  const set = (k: keyof FilterState, v: string) => onChange({ ...value, [k]: v });
  const reset = () => onChange({});

  return (
    <div className={compact ? "" : "surface p-5 lg:p-6 shadow-lg"}>
      {/* SEGMENTS */}
      <div className="flex items-center gap-1 p-1 bg-secondary rounded-xl w-full sm:w-auto sm:inline-flex">
        {SEGMENTS.map(s => {
          const active = segment === s.key;
          return (
            <button key={s.key} onClick={() => onChange({ ...value, segment: s.key })}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 h-9 rounded-lg text-[13px] font-medium transition-all ${
                active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}>
              <s.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 grid-cols-2 lg:grid-cols-5">
        <Field label="Тип">
          <Select value={value.type ?? "all"} onValueChange={(v) => set("type", v)}>
            <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="квартира">Квартира</SelectItem>
              <SelectItem value="апартаменты">Апартаменты</SelectItem>
              <SelectItem value="дом">Дом</SelectItem>
              <SelectItem value="коммерция">Коммерция</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="Район">
          <Select value={value.district ?? "all"} onValueChange={(v) => set("district", v)}>
            <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все районы</SelectItem>
              {DISTRICTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Цена, млн ₽">
          <div className="flex gap-1.5">
            <Input className="h-10 num" type="number" placeholder="от" value={value.priceMin ?? ""} onChange={e => set("priceMin", e.target.value)} />
            <Input className="h-10 num" type="number" placeholder="до" value={value.priceMax ?? ""} onChange={e => set("priceMax", e.target.value)} />
          </div>
        </Field>

        <Field label="Комнаты">
          <Select value={value.rooms ?? "all"} onValueChange={(v) => set("rooms", v)}>
            <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
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
            <Input className="h-10 num" type="number" placeholder="от" value={value.areaMin ?? ""} onChange={e => set("areaMin", e.target.value)} />
            <Input className="h-10 num" type="number" placeholder="до" value={value.areaMax ?? ""} onChange={e => set("areaMax", e.target.value)} />
          </div>
        </Field>
      </div>

      {showSubmit && (
        <div className="mt-5 pt-5 border-t border-border flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Найдено <span className="font-semibold text-foreground text-base num">{count}</span> объектов
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5 text-muted-foreground"><RotateCcw className="w-3.5 h-3.5" /> Сбросить</Button>
            <Button className="bg-primary flex-1 sm:flex-none gap-1.5 h-10 px-5" onClick={() => navigate("/catalog")}>
              <Search className="w-4 h-4" /> Найти объект
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
