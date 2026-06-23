import { Link } from "react-router-dom";
import { Calendar, ArrowUpRight } from "lucide-react";
import { type NewsItem } from "@/data/mock";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export default function NewsCard({ n }: { n: NewsItem }) {
  return (
    <Link to={`/news/${n.slug}`} className="card-premium group flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img src={n.cover} alt={n.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs">
          <Badge variant="secondary" className="font-normal">{n.category}</Badge>
          <span className="flex items-center gap-1.5 text-muted-foreground"><Calendar className="w-3 h-3" /> {formatDate(n.date)}</span>
        </div>
        <h3 className="mt-4 font-display text-xl leading-tight group-hover:text-primary transition-colors">{n.title}</h3>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-3 flex-1">{n.excerpt}</p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Читать <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
