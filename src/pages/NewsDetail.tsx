import { Link, Navigate, useParams } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import NewsCard from "@/components/cards/NewsCard";
import LeadForm from "@/components/LeadForm";

export default function NewsDetail() {
  const { id } = useParams();
  const news = useStore(s => s.news);
  const n = news.find(x => x.slug === id);
  if (!n) return <Navigate to="/news" replace />;
  const similar = news.filter(x => x.id !== n.id && x.category === n.category).slice(0, 3);
  const fallback = news.filter(x => x.id !== n.id).slice(0, 3);
  const related = similar.length ? similar : fallback;

  return (
    <article>
      <div className="container-x py-10 max-w-4xl">
        <Link to="/news" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="w-4 h-4" /> Все новости</Link>
        <div className="mt-6 flex items-center gap-3 text-sm">
          <Badge variant="secondary" className="font-normal">{n.category}</Badge>
          <span className="text-muted-foreground flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(n.date)}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl lg:text-6xl leading-[1.05]">{n.title}</h1>
        <p className="mt-4 text-xl text-muted-foreground leading-relaxed">{n.excerpt}</p>
        <div className="mt-8 rounded-2xl overflow-hidden aspect-[16/9] bg-muted">
          <img src={n.cover} alt={n.title} className="w-full h-full object-cover" />
        </div>
        <div className="mt-8 prose prose-lg max-w-none text-foreground">
          {n.content.split("\n\n").map((para, i) => <p key={i} className="leading-relaxed">{para}</p>)}
        </div>

        <div className="mt-12 bg-secondary rounded-2xl p-7 lg:p-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="eyebrow">Подбор недвижимости</div>
            <h3 className="mt-2 font-display text-3xl">Поможем выбрать объект</h3>
            <p className="mt-3 text-muted-foreground">Расскажите о бюджете и цели — пришлём подборку под вас.</p>
          </div>
          <div className="bg-card rounded-xl p-5">
            <LeadForm variant="inline" />
          </div>
        </div>
      </div>

      <section className="container-x pb-20">
        <h2 className="font-display text-3xl">Похожие статьи</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map(n => <NewsCard key={n.id} n={n} />)}
        </div>
      </section>
    </article>
  );
}
