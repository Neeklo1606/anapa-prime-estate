import { Link, useParams, Navigate } from "react-router-dom";
import { MapPin, Calendar, Building2, Check, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPriceShort } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/cards/PropertyCard";
import ComplexCard from "@/components/cards/ComplexCard";
import LeadForm from "@/components/LeadForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ComplexDetail() {
  const { id } = useParams();
  const complexes = useStore(s => s.complexes);
  const properties = useStore(s => s.properties);
  const c = complexes.find(x => x.slug === id);
  if (!c) return <Navigate to="/complexes" replace />;

  const list = properties.filter(p => p.complexId === c.id);
  const similar = complexes.filter(x => x.id !== c.id && x.district === c.district).slice(0, 3);
  const fallback = complexes.filter(x => x.id !== c.id).slice(0, 3);
  const recommended = similar.length ? similar : fallback;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[440px] overflow-hidden bg-primary">
        <img src={c.cover} alt={c.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-transparent" />
        <div className="relative h-full container-x flex flex-col justify-end pb-10 lg:pb-14 text-primary-foreground">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {c.badges.map(b => <Badge key={b} className="bg-primary-foreground/15 text-primary-foreground border-0 backdrop-blur-md capitalize font-normal">{b}</Badge>)}
            <Badge className="bg-brand text-brand-foreground border-0 font-normal">{c.class}</Badge>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl">{c.name}</h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base text-primary-foreground/85">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {c.district}, Анапа</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Сдача {c.deadline}</span>
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {c.floors} этажей, {c.buildings} корпус(а)</span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-primary-foreground/60">Цена от</div>
              <div className="font-display text-4xl">{formatPriceShort(c.priceFrom)}</div>
            </div>
            <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90"><a href="#lead">Оставить заявку</a></Button>
          </div>
        </div>
      </section>

      <div className="container-x py-14 lg:py-20 grid lg:grid-cols-[1fr_360px] gap-12">
        <div>
          {/* Description */}
          <section>
            <h2 className="font-display text-3xl lg:text-4xl">О комплексе</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">{c.description}</p>
          </section>

          {/* Gallery */}
          <section className="mt-12">
            <h2 className="font-display text-3xl">Галерея</h2>
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 gap-3">
              {c.gallery.map((g, i) => (
                <div key={i} className={`rounded-xl overflow-hidden bg-muted ${i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-[4/3]" : "aspect-square"}`}>
                  <img src={g} alt={`${c.name} ${i + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </section>

          {/* Advantages */}
          <section className="mt-12 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-3xl">Преимущества</h2>
              <ul className="mt-5 space-y-3">
                {c.advantages.map(a => (
                  <li key={a} className="flex items-start gap-3"><Check className="w-5 h-5 text-brand shrink-0 mt-0.5" /><span>{a}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-3xl">Инфраструктура</h2>
              <ul className="mt-5 space-y-3">
                {c.infrastructure.map(a => (
                  <li key={a} className="flex items-start gap-3"><Check className="w-5 h-5 text-brand shrink-0 mt-0.5" /><span>{a}</span></li>
                ))}
              </ul>
            </div>
          </section>

          {/* Properties */}
          <section className="mt-12">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl">Объекты в ЖК</h2>
              <Link to={`/catalog?complex=${c.id}`} className="text-sm font-medium inline-flex items-center gap-1.5 hover:text-primary">Все в каталоге <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="mt-6 card-premium overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Объект</TableHead>
                    <TableHead>Площадь</TableHead>
                    <TableHead>Этаж</TableHead>
                    <TableHead className="text-right">Цена</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map(p => (
                    <TableRow key={p.id} className="cursor-pointer">
                      <TableCell className="font-medium">{p.rooms === 0 ? "Студия" : `${p.rooms}-комн.`}</TableCell>
                      <TableCell>{p.area} м²</TableCell>
                      <TableCell>{p.floor}/{p.totalFloors}</TableCell>
                      <TableCell className="text-right font-display text-lg">{formatPriceShort(p.price)}</TableCell>
                      <TableCell className="text-right"><Button asChild size="sm" variant="ghost"><Link to={`/properties/${p.id}`}>Подробнее →</Link></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Map placeholder */}
          <section className="mt-12">
            <h2 className="font-display text-3xl">На карте</h2>
            <div className="mt-5 rounded-2xl overflow-hidden bg-secondary h-72 grid place-items-center border border-border/60">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-10 h-10 mx-auto mb-2 text-brand" />
                <div className="font-medium text-foreground">{c.district}, Анапа</div>
                <div className="text-sm">Карта будет подключена через Яндекс/2GIS API</div>
              </div>
            </div>
          </section>
        </div>

        {/* Sticky lead */}
        <aside>
          <div className="sticky top-24 card-premium p-6" id="lead">
            <LeadForm context={c.name} />
          </div>
        </aside>
      </div>

      {/* Similar */}
      <section className="container-x pb-20">
        <h2 className="font-display text-3xl lg:text-4xl">Похожие ЖК</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map(c => <ComplexCard key={c.id} c={c} />)}
        </div>
      </section>
    </div>
  );
}
