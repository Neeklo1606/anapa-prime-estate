import { Link } from "react-router-dom";
import { MapPin, Maximize2, Building, Layers } from "lucide-react";
import { type Property } from "@/data/mock";
import { formatPriceShort, formatArea } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PropertyCard({ p, view = "grid" }: { p: Property; view?: "grid" | "list" }) {
  if (view === "list") {
    return (
      <div className="card-premium flex flex-col sm:flex-row overflow-hidden">
        <Link to={`/properties/${p.id}`} className="block sm:w-72 shrink-0 aspect-[4/3] sm:aspect-auto relative overflow-hidden bg-muted">
          <img src={p.photos[0]} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </Link>
        <div className="p-5 flex-1 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <Link to={`/properties/${p.id}`} className="font-display text-xl hover:text-primary transition-colors">{p.title}</Link>
            <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {p.address}</div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5"><Maximize2 className="w-3.5 h-3.5 text-muted-foreground" /> {formatArea(p.area)}</span>
              <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-muted-foreground" /> {p.floor}/{p.totalFloors} этаж</span>
              <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-muted-foreground" /> {p.deadline}</span>
            </div>
            <div className="mt-3 flex gap-1.5">{p.badges.map(b => <Badge key={b} variant="secondary" className="font-normal">{b}</Badge>)}</div>
          </div>
          <div className="flex sm:flex-col items-end justify-between gap-3">
            <div className="font-display text-2xl">{formatPriceShort(p.price)}</div>
            <Button asChild size="sm" className="bg-primary"><Link to={`/properties/${p.id}`}>Подробнее</Link></Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="card-premium flex flex-col group">
      <Link to={`/properties/${p.id}`} className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={p.photos[0]} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {p.badges.slice(0, 1).map(b => <Badge key={b} className="bg-background/90 text-foreground backdrop-blur-sm border-0 font-normal">{b}</Badge>)}
        </div>
        <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-1.5 font-display text-lg">{formatPriceShort(p.price)}</div>
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <Link to={`/properties/${p.id}`} className="font-display text-lg leading-tight hover:text-primary transition-colors">{p.title}</Link>
        <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {p.district}</div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground border-t border-border pt-4">
          <div><div className="text-foreground font-medium">{p.rooms === 0 ? "Студия" : `${p.rooms}-комн`}</div>комнат</div>
          <div><div className="text-foreground font-medium">{p.area} м²</div>площадь</div>
          <div><div className="text-foreground font-medium">{p.floor}/{p.totalFloors}</div>этаж</div>
        </div>
      </div>
    </div>
  );
}
