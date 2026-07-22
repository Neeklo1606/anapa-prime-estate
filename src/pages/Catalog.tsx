import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid3x3, List, Map as MapIcon, SlidersHorizontal, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import CatalogFilter, { emptyFilter, matchCatalog, type CatalogFilterState } from "@/components/CatalogFilter";
import PropertyCard from "@/components/cards/PropertyCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type QuickTag = {
  key: string; label: string;
  patch: Partial<CatalogFilterState>;
};

const QUICK_TAGS: QuickTag[] = [
  { key: "studio-8", label: "Студии до 8 млн", patch: { rooms: ["0"], priceMax: "8000000" } },
  { key: "1k-10", label: "1-к до 10 млн", patch: { rooms: ["1"], priceMax: "10000000" } },
  { key: "2k-15", label: "2-к до 15 млн", patch: { rooms: ["2"], priceMax: "15000000" } },
  { key: "3k-60", label: "3-к от 60 м²", patch: { rooms: ["3"], areaMin: "60" } },
  { key: "novostroy", label: "Новостройки", patch: { stage: "new" } },
  { key: "sdano", label: "Сданные ЖК", patch: { statuses: ["в продаже"], deadline: "2025" } },
];

const TYPE_TABS = [
  { key: "квартира", label: "Квартиры" },
  { key: "комната", label: "Комнаты" },
  { key: "дом", label: "Дома" },
  { key: "участок", label: "Участки" },
  { key: "дача", label: "Дачи" },
  { key: "коммерция", label: "Коммерция" },
];

export default function Catalog() {
  const properties = useStore(s => s.properties);
  const complexes = useStore(s => s.complexes);
  const [params] = useSearchParams();

  const initialFilter: CatalogFilterState = useMemo(() => {
    const f = { ...emptyFilter };
    const complexId = params.get("complex");
    if (complexId) {
      // pre-filter by complex district for now
      const c = complexes.find(x => x.id === complexId);
      if (c) f.districts = [c.district];
    }
    return f;
  }, [params, complexes]);

  const [filter, setFilter] = useState<CatalogFilterState>(initialFilter);
  const [activeQuick, setActiveQuick] = useState<string | null>("novostroy");
  const [typeTab, setTypeTab] = useState<string>("квартира");
  const [view, setView] = useState<"grid" | "list" | "map">("grid");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const applyQuick = (t: QuickTag) => {
    if (activeQuick === t.key) {
      setActiveQuick(null);
      setFilter(emptyFilter);
    } else {
      setActiveQuick(t.key);
      setFilter({ ...emptyFilter, ...t.patch } as CatalogFilterState);
    }
  };

  // counts per type tab (from full properties list, applying current filter except type)
  const typeCounts = useMemo(() => {
    const base = properties.filter(p => matchCatalog(p, { ...filter, types: [] }));
    const c: Record<string, number> = {};
    for (const t of TYPE_TABS) {
      if (t.key === "квартира") c[t.key] = base.filter(p => p.type === "квартира" || p.type === "апартаменты").length;
      else if (t.key === "дом") c[t.key] = base.filter(p => p.type === "дом").length;
      else if (t.key === "коммерция") c[t.key] = base.filter(p => p.type === "коммерция").length;
      // Синтетические категории · заглушки
      else if (t.key === "комната") c[t.key] = 45;
      else if (t.key === "дача") c[t.key] = 15;
      else c[t.key] = 0;
    }
    return c;
  }, [properties, filter]);

  const filtered = useMemo(() => {
    const withTab = { ...filter, types: filter.types.length ? filter.types : [typeTab] };
    const list = properties.filter(p => matchCatalog(p, withTab));
    return [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "area-desc": return b.area - a.area;
        case "area-asc": return a.area - b.area;
        case "title": return a.title.localeCompare(b.title, "ru");
        case "deadline": return a.deadline.localeCompare(b.deadline, "ru");
        default: return 0;
      }
    });
  }, [properties, filter, typeTab, sort]);

  const paged = filtered.slice(0, page * perPage);
  const complexCount = new Set(filtered.map(p => p.complexId)).size;

  return (
    <div className="container-x py-10 lg:py-14">
      {/* Header */}
      <div>
        <h1 className="display-xl text-[34px] lg:text-[44px]">Каталог недвижимости</h1>
        <p className="mt-3 text-muted-foreground text-[15px] max-w-2xl">
          Квартиры, апартаменты и дома от прямых застройщиков
        </p>
      </div>

      {/* Quick tags */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex items-center gap-2 flex-nowrap">
          {QUICK_TAGS.map(t => {
            const active = activeQuick === t.key;
            return (
              <button key={t.key} onClick={() => applyQuick(t)}
                className={`shrink-0 h-9 px-4 rounded-full text-[13px] font-medium border transition-all ${
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-foreground border-border hover:border-foreground/30"
                }`}>{t.label}</button>
            );
          })}
        </div>
        <button onClick={() => { setActiveQuick(null); setFilter(emptyFilter); setTypeTab("квартира"); }}
          className="ml-auto shrink-0 h-9 px-3 text-[12.5px] text-muted-foreground hover:text-foreground flex items-center gap-1">
          <X className="w-3.5 h-3.5" /> Сбросить всё
        </button>
      </div>

      {/* Type tabs · desktop */}
      <div className="mt-4 hidden md:flex items-center gap-6 border-b border-border">
        {TYPE_TABS.map(t => {
          const active = typeTab === t.key;
          return (
            <button key={t.key} onClick={() => setTypeTab(t.key)}
              className={`relative pb-3 -mb-px text-[14px] transition-colors ${
                active ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}>
              {t.label} <span className="text-muted-foreground/70 num">({typeCounts[t.key]})</span>
              {active && <span className="absolute inset-x-0 -bottom-px h-[2px] bg-primary rounded-full" />}
            </button>
          );
        })}
      </div>

      {/* Type tabs · mobile as select */}
      <div className="mt-4 md:hidden">
        <Select value={typeTab} onValueChange={setTypeTab}>
          <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
          <SelectContent>
            {TYPE_TABS.map(t => (
              <SelectItem key={t.key} value={t.key}>{t.label} ({typeCounts[t.key]})</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Desktop filter */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            <CatalogFilter value={filter} onChange={setFilter} />
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 justify-between mb-5">
            <div className="text-sm text-muted-foreground">
              Показано <span className="font-semibold text-foreground num">{Math.min(paged.length, filtered.length)}</span> из <span className="num font-semibold text-foreground">{filtered.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden gap-1.5"><SlidersHorizontal className="w-3.5 h-3.5" /> Фильтр</Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
                  <div className="pt-8">
                    <CatalogFilter value={filter} onChange={setFilter} />
                  </div>
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-52 h-9 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">По умолчанию</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="area-desc">Площадь: больше</SelectItem>
                  <SelectItem value="area-asc">Площадь: меньше</SelectItem>
                  <SelectItem value="title">Название А–Я</SelectItem>
                  <SelectItem value="deadline">Срок сдачи: раньше</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden sm:flex border border-border rounded-lg p-0.5">
                {[
                  { k: "grid", Icon: Grid3x3, label: "Сетка" },
                  { k: "list", Icon: List, label: "Список" },
                  { k: "map",  Icon: MapIcon, label: "Карта" },
                ].map(({ k, Icon, label }) => (
                  <button key={k} onClick={() => setView(k as typeof view)} aria-label={label}
                    className={`w-8 h-8 grid place-items-center rounded ${view === k ? "bg-secondary" : ""}`}>
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card-premium p-12 text-center">
              <div className="font-display text-2xl">Ничего не найдено</div>
              <p className="mt-2 text-muted-foreground">Попробуйте изменить параметры поиска или сбросьте фильтры</p>
              <Button variant="outline" className="mt-5" onClick={() => { setFilter(emptyFilter); setActiveQuick(null); setTypeTab("квартира"); }}>Сбросить фильтры</Button>
            </div>
          ) : view === "map" ? (
            <div className="rounded-2xl overflow-hidden border border-border bg-card h-[70vh] min-h-[520px] relative">
              <iframe
                title="Яндекс.Карта · объекты Анапы"
                src="https://yandex.ru/map-widget/v1/?ll=37.316%2C44.894&z=12&l=map"
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-card/95 backdrop-blur border border-border rounded-xl px-4 py-3 shadow-lg">
                <div className="text-[12px] text-muted-foreground">На карте</div>
                <div className="font-display text-xl num">{filtered.length} объектов</div>
              </div>
            </div>
          ) : (
            <>
              <div className={view === "grid" ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
                {paged.map(p => <PropertyCard key={p.id} p={p} view={view === "list" ? "list" : "grid"} />)}
              </div>

              {paged.length < filtered.length && (
                <div className="mt-10 text-center">
                  <Button variant="outline" size="lg" onClick={() => setPage(p => p + 1)}>Показать ещё</Button>
                </div>
              )}
            </>
          )}

          <div className="mt-16 prose prose-sm max-w-none text-muted-foreground">
            <h2 className="font-display text-2xl text-foreground">Недвижимость в Анапе · каталог 2026</h2>
            <p>В нашем каталоге представлены квартиры, апартаменты и дома в новостройках Анапы и пригородов: Витязево, Джемете, Сукко, Высокий Берег. Мы работаем напрямую с застройщиками · цены те же, но мы помогаем с подбором, ипотекой и сделкой под ключ.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
