import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useStore } from "@/store/useStore";
import NewsCard from "@/components/cards/NewsCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const CATS = ["Все", "Рынок", "Ипотека", "Новостройки", "Инвестиции"] as const;

export default function News() {
  const news = useStore(s => s.news);
  const [cat, setCat] = useState<string>("Все");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return news.filter(n =>
      (cat === "Все" || n.category === cat) &&
      (q.length === 0 || n.title.toLowerCase().includes(q.toLowerCase()) || n.excerpt.toLowerCase().includes(q.toLowerCase()))
    );
  }, [news, cat, q]);

  return (
    <div className="container-x py-10 lg:py-14">
      <div>
        <div className="eyebrow">Новости и аналитика</div>
        <h1 className="mt-2 font-display text-4xl lg:text-5xl">Рынок недвижимости Анапы</h1>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Поиск по новостям" value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 card-premium p-12 text-center text-muted-foreground">Ничего не найдено</div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(n => <NewsCard key={n.id} n={n} />)}
        </div>
      )}
    </div>
  );
}
