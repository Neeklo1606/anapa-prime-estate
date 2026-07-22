import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { MapPin, Maximize2, Layers, Calendar, Paintbrush, Home as HomeIcon, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPriceShort, formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/cards/PropertyCard";
import LeadForm from "@/components/LeadForm";

export default function PropertyDetail() {
  const { id } = useParams();
  const properties = useStore(s => s.properties);
  const complexes = useStore(s => s.complexes);
  const p = properties.find(x => x.id === id);
  const [photo, setPhoto] = useState(0);
  if (!p) return <Navigate to="/catalog" replace />;
  const complex = complexes.find(c => c.id === p.complexId);
  const similar = properties.filter(x => x.id !== p.id && x.complexId === p.complexId).slice(0, 3);

  const specs = [
    { icon: HomeIcon, label: "Тип", value: p.type },
    { icon: Maximize2, label: "Площадь", value: `${p.area} м²` },
    { icon: Layers, label: "Этаж", value: `${p.floor} из ${p.totalFloors}` },
    { icon: Calendar, label: "Сдача", value: p.deadline },
    { icon: Paintbrush, label: "Отделка", value: p.finishing },
    { icon: MapPin, label: "Город", value: p.district },
  ];

  return (
    <div>
      <div className="container-x py-8 lg:py-12">
        <div className="text-xs text-muted-foreground">
          <Link to="/catalog" className="hover:text-primary">Каталог</Link>
          {complex && <> / <Link to={`/complexes/${complex.slug}`} className="hover:text-primary">{complex.name}</Link></>}
          {" / "}<span className="text-foreground">{p.title}</span>
        </div>

        <div className="mt-4 grid lg:grid-cols-[1fr_400px] gap-10">
          <div>
            {/* Gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[16/10]">
              <img src={p.photos[photo]} alt={p.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-1.5">
                {p.badges.map(b => <Badge key={b} className="bg-background/95 text-foreground backdrop-blur-sm border-0 capitalize font-normal">{b}</Badge>)}
              </div>
              <button onClick={() => setPhoto((photo - 1 + p.photos.length) % p.photos.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-full bg-background/90 hover:bg-background backdrop-blur-sm"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={() => setPhoto((photo + 1) % p.photos.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-full bg-background/90 hover:bg-background backdrop-blur-sm"><ChevronRight className="w-5 h-5" /></button>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {p.photos.map((src, i) => (
                <button key={i} onClick={() => setPhoto(i)} className={`aspect-[4/3] rounded-lg overflow-hidden border-2 ${i === photo ? "border-brand" : "border-transparent"}`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h1 className="font-display text-4xl lg:text-5xl leading-tight">{p.title}</h1>
              <div className="mt-2 text-muted-foreground flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {p.address}</div>
            </div>

            {/* Specs */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {specs.map(s => (
                <div key={s.label} className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground"><s.icon className="w-3.5 h-3.5" /> {s.label}</div>
                  <div className="mt-1 font-medium capitalize">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="font-display text-3xl">Описание</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{p.description}</p>
            </div>

            <div className="mt-10 bg-secondary rounded-2xl p-7">
              <h2 className="font-display text-2xl">Почему стоит рассмотреть</h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {[
                  `Локация: ${p.district} · один из востребованных районов`,
                  `Готовность: ${p.deadline}, юридически проверено`,
                  `Отделка: ${p.finishing} · экономия на ремонте`,
                  `Доступна ипотека от 6% (семейная программа)`,
                ].map(t => <li key={t} className="flex items-start gap-2.5"><Check className="w-5 h-5 text-brand shrink-0 mt-0.5" /><span className="text-sm">{t}</span></li>)}
              </ul>
            </div>
          </div>

          {/* Sticky CTA */}
          <aside>
            <div className="sticky top-24 space-y-4">
              <div className="card-premium p-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Стоимость</div>
                <div className="mt-1 font-display text-4xl">{formatPriceShort(p.price)}</div>
                <div className="text-sm text-muted-foreground">{formatPrice(Math.round(p.price / p.area))} / м²</div>
                <div className="mt-5 grid gap-2">
                  <Button size="lg" className="bg-primary w-full" asChild><a href="#lead-form">Оставить заявку</a></Button>
                  <Button size="lg" variant="outline" className="w-full" asChild><a href="tel:+78001234567">Позвонить</a></Button>
                </div>
                {complex && (
                  <Link to={`/complexes/${complex.slug}`} className="mt-5 pt-5 border-t border-border flex items-center gap-3 hover:text-primary transition-colors">
                    <img src={complex.cover} alt={complex.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">ЖК</div>
                      <div className="font-medium truncate">{complex.name}</div>
                    </div>
                  </Link>
                )}
              </div>
              <div className="card-premium p-6" id="lead-form">
                <LeadForm context={p.title} />
              </div>
            </div>
          </aside>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-3xl">Похожие объекты</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map(p => <PropertyCard key={p.id} p={p} />)}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden sticky bottom-0 bg-card border-t border-border p-3 flex gap-2 z-30">
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Цена</div>
          <div className="font-display text-xl">{formatPriceShort(p.price)}</div>
        </div>
        <Button asChild className="bg-primary"><a href="#lead-form">Заявка</a></Button>
      </div>
    </div>
  );
}
