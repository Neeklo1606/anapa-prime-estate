import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Map, Briefcase, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { COLLECTIONS, HERO_IMAGES } from "@/data/mock";
import { formatPriceShort } from "@/lib/format";
import PropertyFilter, { type FilterState } from "@/components/PropertyFilter";
import ComplexCard from "@/components/cards/ComplexCard";
import NewsCard from "@/components/cards/NewsCard";
import LeadForm from "@/components/LeadForm";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const complexes = useStore(s => s.complexes);
  const news = useStore(s => s.news);
  const heroSlides = complexes.slice(0, 4).map((c, i) => ({ ...c, hero: HERO_IMAGES[i % HERO_IMAGES.length] }));
  const [slide, setSlide] = useState(0);
  const [filter, setFilter] = useState<FilterState>({});

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 7000);
    return () => clearInterval(t);
  }, [heroSlides.length]);

  const current = heroSlides[slide];

  return (
    <div>
      {/* HERO SLIDER */}
      <section className="relative h-[88vh] min-h-[600px] max-h-[820px] overflow-hidden bg-primary">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img src={current.hero} alt={current.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-hero" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full container-x flex flex-col justify-end pb-16 lg:pb-24 text-primary-foreground">
          <motion.div key={`txt-${slide}`}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap gap-1.5 mb-5">
              {current.badges.map(b => (
                <Badge key={b} className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-md border-0 font-normal capitalize">{b}</Badge>
              ))}
              <Badge className="bg-gold text-gold-foreground hover:bg-gold border-0 font-normal">{current.class}</Badge>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
              {current.name}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-base lg:text-lg text-primary-foreground/85">
              <span>{current.district}, Анапа</span>
              <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
              <span>от {formatPriceShort(current.priceFrom)}</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-primary-foreground/40" />
              <span className="hidden sm:inline">сдача {current.deadline}</span>
            </div>
            <p className="mt-5 max-w-xl text-primary-foreground/80 line-clamp-2 leading-relaxed">{current.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold">
                <Link to={`/complexes/${current.slug}`}>Смотреть ЖК <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground hover:text-primary backdrop-blur-md">
                <Link to="/catalog">Подобрать недвижимость</Link>
              </Button>
            </div>
          </motion.div>

          {/* Slider controls */}
          <div className="mt-10 flex items-center justify-between gap-6">
            <div className="flex gap-2">
              {heroSlides.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)} aria-label={`Слайд ${i + 1}`}
                  className={`h-1 rounded-full transition-all ${i === slide ? "w-12 bg-gold" : "w-6 bg-primary-foreground/30 hover:bg-primary-foreground/50"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSlide((slide - 1 + heroSlides.length) % heroSlides.length)} className="w-11 h-11 rounded-full border border-primary-foreground/30 grid place-items-center hover:bg-primary-foreground hover:text-primary transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setSlide((slide + 1) % heroSlides.length)} className="w-11 h-11 rounded-full border border-primary-foreground/30 grid place-items-center hover:bg-primary-foreground hover:text-primary transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FILTER */}
      <section className="container-x -mt-14 relative z-10">
        <div className="bg-card rounded-2xl shadow-elevated border border-border/60 p-5 lg:p-7">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="eyebrow text-foreground">Быстрый подбор</span>
          </div>
          <PropertyFilter value={filter} onChange={setFilter} compact />
        </div>
      </section>

      {/* POPULAR COMPLEXES */}
      <section className="container-x mt-24">
        <SectionHeader eyebrow="Популярные новостройки" title="ЖК, которые выбирают в этом сезоне" link={{ to: "/complexes", label: "Все ЖК" }} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {complexes.slice(0, 6).map(c => <ComplexCard key={c.id} c={c} />)}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="container-x mt-24">
        <SectionHeader eyebrow="Подборки недвижимости" title="Под любую задачу" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {COLLECTIONS.map((col, i) => {
            const sample = complexes.filter(col.filter)[0] ?? complexes[0];
            return (
              <Link key={col.key} to={`/catalog?collection=${col.key}`} className="card-premium group relative aspect-[3/4] sm:aspect-auto sm:h-72 overflow-hidden flex items-end">
                <img src={sample.cover} alt={col.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                <div className="relative p-5 text-primary-foreground">
                  <div className="font-display text-2xl">{col.title}</div>
                  <div className="text-sm text-primary-foreground/80 mt-1">{col.description}</div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-gold font-medium">Смотреть <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section className="mt-24 bg-gradient-sand py-20">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow">О компании</div>
            <h2 className="mt-3 font-display text-4xl lg:text-5xl leading-tight">Знаем рынок Анапы как никто другой</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
              Агентство «Югэксэнд» работает с 2017 года. Мы помогаем выбрать недвижимость в Анапе — от студий у моря до клубных резиденций бизнес-класса.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[{ n: "1400+", l: "объектов" }, { n: "48", l: "ЖК" }, { n: "8", l: "лет опыта" }, { n: "2300+", l: "сделок" }].map(s => (
                <div key={s.l}>
                  <div className="font-display text-3xl lg:text-4xl gold-text">{s.n}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <Button asChild className="mt-8 bg-primary"><Link to="/about">Подробнее о нас</Link></Button>
          </div>
          <div className="grid gap-4">
            {[
              { icon: Map, t: "Знаем рынок Анапы", d: "От Сукко до Витязево — все районы, все ЖК, все застройщики." },
              { icon: Briefcase, t: "Новостройки и вторичка", d: "Работаем с прямыми застройщиками и проверенными собственниками." },
              { icon: ShieldCheck, t: "Сопровождаем сделку", d: "Юрист, ипотека, регистрация — всё под ключ, без сюрпризов." },
              { icon: Sparkles, t: "Подберём под бюджет", d: "От 3 млн до клубных резиденций — найдём вариант под вашу цель." },
            ].map(b => (
              <div key={b.t} className="bg-card rounded-2xl p-5 border border-border/60 flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-primary text-primary-foreground grid place-items-center shrink-0"><b.icon className="w-5 h-5" /></div>
                <div>
                  <div className="font-medium">{b.t}</div>
                  <div className="text-sm text-muted-foreground mt-1">{b.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="container-x mt-24">
        <SectionHeader eyebrow="Новости и аналитика" title="Рынок недвижимости Анапы" link={{ to: "/news", label: "Все новости" }} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map(n => <NewsCard key={n.id} n={n} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 lg:p-14 grid lg:grid-cols-2 gap-10 items-center">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative">
            <div className="eyebrow text-primary-foreground/60">Подбор недвижимости</div>
            <h2 className="mt-3 font-display text-4xl lg:text-5xl leading-tight">Подберём недвижимость под вашу задачу</h2>
            <p className="mt-4 text-primary-foreground/80 max-w-md">Расскажите о пожеланиях — мы пришлём 3-5 точных вариантов в течение суток.</p>
          </div>
          <div className="relative bg-card text-foreground rounded-2xl p-6 lg:p-8">
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ eyebrow, title, link }: { eyebrow: string; title: string; link?: { to: string; label: string } }) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="mt-2 font-display text-3xl lg:text-5xl leading-tight max-w-2xl">{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="text-sm font-medium inline-flex items-center gap-1.5 hover:text-primary transition-colors">
          {link.label} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
