import { Link } from "react-router-dom";
import { MapPin, Building2, Calendar, ArrowRight } from "lucide-react";
import { type Complex } from "@/data/mock";
import { formatPriceShort } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export default function ComplexCard({ c }: { c: Complex }) {
  return (
    <Link to={`/complexes/${c.slug}`} className="group card-premium flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={c.cover} alt={c.name} loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {c.badges.slice(0, 2).map(b => (
            <Badge key={b} className="bg-background/90 text-foreground hover:bg-background backdrop-blur-sm border-0 capitalize font-normal">{b}</Badge>
          ))}
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-gold text-gold-foreground hover:bg-gold border-0 font-normal">{c.class}</Badge>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{c.name}</h3>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" /> {c.district}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {c.deadline}</span>
          <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {c.floors} эт.</span>
        </div>
        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Цена от</div>
            <div className="font-display text-2xl">{formatPriceShort(c.priceFrom)}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground grid place-items-center transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
