import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import { type Complex } from "@/data/mock";
import { formatPriceShort } from "@/lib/format";

export default function ComplexCard({ c }: { c: Complex }) {
  return (
    <Link to={`/complexes/${c.slug}`} className="group card-premium flex flex-col">
      <div className="relative aspect-[5/4] overflow-hidden bg-secondary">
        <img src={c.cover} alt={c.name} loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[hsl(215_45%_8%)]/35 to-transparent" />
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
          {c.badges.slice(0, 2).map(b => (
            <span key={b} className="rounded-full bg-card/95 backdrop-blur-md text-foreground text-[11px] font-medium px-2.5 py-1 capitalize">{b}</span>
          ))}
        </div>
        <div className="absolute top-3.5 right-3.5">
          <span className="rounded-full bg-primary text-primary-foreground text-[11px] font-medium px-2.5 py-1 capitalize">{c.class}</span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[19px] font-semibold leading-tight tracking-tight">{c.name}</h3>
          <div className="w-9 h-9 rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground grid place-items-center transition-all shrink-0">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" /> {c.district}
        </div>
        <div className="mt-6 pt-5 border-t border-border flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">от</div>
            <div className="display-xl text-[22px] mt-1 num">{formatPriceShort(c.priceFrom)}</div>
          </div>
          <div className="text-right text-[11.5px] text-muted-foreground leading-tight">
            <div>сдача {c.deadline}</div>
            <div className="mt-1 num">{c.floors} этажей · {c.buildings} к.</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
