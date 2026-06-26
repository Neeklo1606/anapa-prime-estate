import { Link } from "react-router-dom";
import { MapPin, Maximize2, Building, Layers, ArrowUpRight } from "lucide-react";
import { type Property } from "@/data/mock";
import { formatPriceShort, formatArea } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PropertyCard({ p, view = "grid" }: { p: Property; view?: "grid" | "list" }) {
  if (view === "list") {
    return (
      <div className="card-premium flex flex-col sm:flex-row overflow-hidden">
        <Link to={`/properties/${p.id}`} className="block sm:w-80 shrink-0 aspect-[4/3] sm:aspect-auto relative overflow-hidden bg-muted">
          <img src={p.photos[0]} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </Link>
        <div className="p-6 flex-1 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <Link to={`/properties/${p.id}`} className="font-display text-[20px] font-semibold hover:text-[hsl(var(--brand))] transition-colors">{p.title}</Link>
            <div className="mt-1.5 text-[13px] text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {p.address}</div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
              <span className="flex items-center gap-1.5"><Maximize2 className="w-3.5 h-3.5 text-muted-foreground" /> {formatArea(p.area)}</span>
              <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-muted-foreground" /> {p.floor}/{p.totalFloors} этаж</span>
              <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-muted-foreground" /> {p.deadline}</span>
            </div>
            <div className="mt-4 flex gap-1.5 flex-wrap">{p.badges.map(b => <Badge key={b} variant="secondary" className="font-normal">{b}</Badge>)}</div>
          </div>
          <div className="flex sm:flex-col items-end justify-between gap-3">
            <div className="display-xl text-[24px] num">{formatPriceShort(p.price)}</div>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 rounded-lg h-10 px-4"><Link to={`/properties/${p.id}`}>Подробнее</Link></Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="card-premium flex flex-col group">
      <Link to={`/properties/${p.id}`} className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={p.photos[0]} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" />
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
          {p.badges.slice(0, 1).map(b => <Badge key={b} className="bg-background/95 text-foreground backdrop-blur-md border-0 font-medium">{b}</Badge>)}
        </div>
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
          <div className="bg-background/95 backdrop-blur-md rounded-xl px-3.5 py-2 font-display text-[17px] font-semibold num">{formatPriceShort(p.price)}</div>
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <Link to={`/properties/${p.id}`} className="font-display text-[16.5px] font-semibold leading-tight hover:text-[hsl(var(--brand))] transition-colors line-clamp-1">{p.title}</Link>
        <div className="mt-1.5 text-[12.5px] text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {p.district}</div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-[11.5px] text-muted-foreground border-t border-border pt-4">
          <div><div className="text-foreground font-medium text-[13px]">{p.rooms === 0 ? "Студия" : `${p.rooms}-комн`}</div>комнат</div>
          <div><div className="text-foreground font-medium text-[13px] num">{p.area} м²</div>площадь</div>
          <div><div className="text-foreground font-medium text-[13px] num">{p.floor}/{p.totalFloors}</div>этаж</div>
        </div>
      </div>
    </div>
  );
}
