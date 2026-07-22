import { Link } from "react-router-dom";
import { MapPin, Heart } from "lucide-react";
import { type Complex } from "@/data/mock";
import { formatPriceShort } from "@/lib/format";

// Derive room-type price rows from the base priceFrom
function priceRows(base: number) {
  return [
    { label: "Студии", price: Math.round(base * 0.78) },
    { label: "1-к.кв", price: base },
    { label: "2-к.кв", price: Math.round(base * 1.35) },
    { label: "3-к.кв", price: Math.round(base * 1.75) },
  ];
}

export default function ComplexCard({ c }: { c: Complex }) {
  const rows = priceRows(c.priceFrom);
  const apartments = 300 + (c.floors * c.buildings * 7);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden shadow-[0_1px_2px_hsl(220_15%_15%/0.04)] hover:shadow-[0_16px_40px_-12px_hsl(220_15%_15%/0.14)] hover:-translate-y-0.5 transition-all duration-300">
      <Link to={`/complexes/${c.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={c.cover}
          alt={c.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <button
          type="button"
          aria-label="В избранное"
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur grid place-items-center shadow-sm text-foreground/70 hover:text-[hsl(var(--brand))] transition-colors"
        >
          <Heart className="w-4 h-4" />
        </button>
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <Link to={`/complexes/${c.slug}`}>
          <h3 className="text-[19px] font-semibold leading-tight tracking-tight text-foreground hover:text-[hsl(var(--brand))] transition-colors">
            {c.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-2 text-[13px] text-foreground/75">
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--brand))] shrink-0" />
          <span>{c.district}, 15 минут пешком</span>
        </div>
        <div className="mt-2 flex items-start gap-2 text-[12.5px] text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>Анапа, {c.district}</span>
        </div>

        <div className="mt-4 text-[14px] font-semibold text-foreground num">{c.deadline}</div>

        <ul className="mt-4 space-y-2.5 border-t border-border pt-4">
          {rows.map((r) => (
            <li key={r.label} className="flex items-baseline gap-2 text-[13.5px]">
              <span className="text-muted-foreground">{r.label}</span>
              <span className="flex-1 border-b border-dotted border-border/80 translate-y-[-3px]" />
              <span className="font-semibold text-foreground num whitespace-nowrap">от {formatPriceShort(r.price)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-border text-[12.5px] text-muted-foreground">
          Квартир {apartments}
        </div>

        <Link
          to={`/complexes/${c.slug}`}
          className="mt-5 inline-flex items-center justify-center h-11 rounded-full border border-[hsl(var(--brand))]/25 text-[hsl(var(--brand))] text-[13px] font-semibold hover:bg-[hsl(var(--brand-soft))] transition-colors"
        >
          Новостройки
        </Link>
      </div>
    </div>
  );
}
