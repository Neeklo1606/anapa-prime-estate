import { Link } from "react-router-dom";
import { Calendar, ArrowUpRight } from "lucide-react";
import { type NewsItem } from "@/data/mock";
import { formatDate } from "@/lib/format";

export default function NewsCard({ n }: { n: NewsItem }) {
  return (
    <Link to={`/news/${n.slug}`} className="card-premium group flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img src={n.cover} alt={n.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" />
        <div className="absolute top-3.5 left-3.5">
          <span className="rounded-full bg-card/95 backdrop-blur-md text-foreground text-[11px] font-medium px-2.5 py-1">{n.category}</span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-[12px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {formatDate(n.date)}</span>
        </div>
        <h3 className="mt-3 font-display text-[20px] font-semibold leading-[1.25] group-hover:text-[hsl(var(--brand))] transition-colors">{n.title}</h3>
        <p className="mt-3 text-[13.5px] text-muted-foreground line-clamp-3 flex-1 leading-relaxed">{n.excerpt}</p>
        <div className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[hsl(var(--brand))]">
          Читать <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
