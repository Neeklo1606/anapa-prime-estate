import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid3x3, List, SlidersHorizontal } from "lucide-react";
import { useStore } from "@/store/useStore";
import PropertyFilter, { matchProperty, type FilterState } from "@/components/PropertyFilter";
import PropertyCard from "@/components/cards/PropertyCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Catalog() {
  const properties = useStore(s => s.properties);
  const [params] = useSearchParams();
  const initialFilter: FilterState = useMemo(() => {
    const f: FilterState = {};
    const complexId = params.get("complex");
    if (complexId) f.complexId = complexId;
    return f;
  }, [params]);
  const [filter, setFilter] = useState<FilterState>(initialFilter);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("price-asc");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    const list = properties.filter(p => matchProperty(p, filter));
    const sorted = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "area-asc": return a.area - b.area;
        case "area-desc": return b.area - a.area;
        default: return 0;
      }
    });
    return sorted;
  }, [properties, filter, sort]);

  const paged = filtered.slice(0, page * perPage);

  return (
    <div className="container-x py-10 lg:py-14">
      <div>
        <div className="eyebrow">Каталог объектов</div>
        <h1 className="mt-2 font-display text-4xl lg:text-5xl">Найдите свой объект в Анапе</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Более 1400 квартир, апартаментов и домов от прямых застройщиков и собственников.</p>
      </div>

      <div className="mt-8 grid lg:grid-cols-[320px_1fr] gap-8">
        {/* Desktop filter */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <PropertyFilter value={filter} onChange={setFilter} showSubmit={false} />
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 justify-between mb-6">
            <div className="text-sm text-muted-foreground">
              Найдено <span className="font-semibold text-foreground font-display text-lg">{filtered.length}</span> объектов
            </div>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden gap-1.5"><SlidersHorizontal className="w-3.5 h-3.5" /> Фильтр</Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
                  <div className="pt-8">
                    <PropertyFilter value={filter} onChange={setFilter} showSubmit={false} />
                  </div>
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44 h-9 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="area-asc">Площадь: меньше</SelectItem>
                  <SelectItem value="area-desc">Площадь: больше</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden sm:flex border border-border rounded-lg p-0.5">
                <button onClick={() => setView("grid")} aria-label="Сетка" className={`w-8 h-8 grid place-items-center rounded ${view === "grid" ? "bg-secondary" : ""}`}><Grid3x3 className="w-4 h-4" /></button>
                <button onClick={() => setView("list")} aria-label="Список" className={`w-8 h-8 grid place-items-center rounded ${view === "list" ? "bg-secondary" : ""}`}><List className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="card-premium p-12 text-center">
              <div className="font-display text-2xl">Ничего не найдено</div>
              <p className="mt-2 text-muted-foreground">Попробуйте изменить параметры поиска или сбросьте фильтры.</p>
              <Button className="mt-5" onClick={() => setFilter({})}>Сбросить фильтры</Button>
            </div>
          ) : (
            <>
              <div className={view === "grid" ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
                {paged.map(p => <PropertyCard key={p.id} p={p} view={view} />)}
              </div>

              {paged.length < filtered.length && (
                <div className="mt-10 text-center">
                  <Button variant="outline" size="lg" onClick={() => setPage(p => p + 1)}>Показать ещё</Button>
                </div>
              )}
            </>
          )}

          {/* SEO content block */}
          <div className="mt-16 prose prose-sm max-w-none text-muted-foreground">
            <h2 className="font-display text-2xl text-foreground">Недвижимость в Анапе — каталог 2026</h2>
            <p>В нашем каталоге представлены квартиры, апартаменты и дома в новостройках Анапы и пригородов: Витязево, Джемете, Сукко, Высокий Берег. Мы работаем напрямую с застройщиками — цены те же, но мы помогаем с подбором, ипотекой и сделкой под ключ.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
