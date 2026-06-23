import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import { type Complex } from "@/data/mock";
import { formatPriceShort } from "@/lib/format";

export default function ComplexCard({ c }: { c: Complex }) {
  return (
    <Link to={`/complexes/${c.slug}`} className="group card-premium flex flex-col">
      <div className="relative aspect-[5/4] overflow-hidden bg-secondary">
        <img src={c.cover} alt={c.name} loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {c.badges.slice(0, 2).map(b => (
            <span key={b} className="rounded-full bg-card/95 backdrop-blur-md text-foreground text-[11px] font-medium px-2.5 py-1 capitalize">{b}</span>
          ))}
        </div>
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-primary text-primary-foreground text-[11px] font-medium px-2.5 py-1 capitalize">{c.class}</span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">{c.name}</h3>
          <div className="w-8 h-8 rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground grid place-items-center transition-colors shrink-0">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" /> {c.district}
        </div>
        <div className="mt-5 pt-4 border-t border-border flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">от</div>
            <div className="font-display text-xl font-bold num">{formatPriceShort(c.priceFrom)}</div>
          </div>
          <div className="text-right text-[11px] text-muted-foreground leading-tight">
            <div>сдача {c.deadline}</div>
            <div className="mt-0.5 num">{c.floors} этажей · {c.buildings} к.</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
