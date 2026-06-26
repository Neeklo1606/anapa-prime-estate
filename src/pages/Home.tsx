import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, TrendingUp, ShieldCheck, Zap, Building2, BarChart3, Bot, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { HERO_IMAGES } from "@/data/mock";
import { formatPriceShort } from "@/lib/format";
import PropertyFilter, { type FilterState } from "@/components/PropertyFilter";
import ComplexCard from "@/components/cards/ComplexCard";
import NewsCard from "@/components/cards/NewsCard";
import LeadForm from "@/components/LeadForm";

export default function Home() {
  const complexes = useStore(s => s.complexes);
  const news = useStore(s => s.news);
  const [filter, setFilter] = useState<FilterState>({ segment: "buy" });
  const [slide, setSlide] = useState(0);
  const featured = complexes[0];

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_IMAGES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="container-x relative pt-12 lg:pt-20 pb-24 lg:pb-32">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="chip-brand">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand))]" />
                  Анапа · 2026 · 500+ объектов
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-7 display-xl text-[44px] sm:text-[60px] lg:text-[80px]"
              >
                Недвижимость <br />
                <span className="text-[hsl(var(--brand))]">у моря.</span> <br />
                Без посредников.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-7 text-[17px] lg:text-[19px] text-muted-foreground max-w-xl leading-[1.55]"
              >
                Подбираем квартиры, апартаменты и коммерцию в Анапе для жизни и инвестиций. Прямые цены застройщиков, сопровождение сделки под ключ.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <Button asChild size="lg" className="h-12 px-6 bg-primary hover:bg-primary/90 text-[14px] rounded-xl">
                  <Link to="/contacts">Подобрать объект <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6 text-[14px] border-border bg-card hover:bg-secondary rounded-xl">
                  <Link to="/catalog">Смотреть каталог</Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-14 grid grid-cols-3 gap-8 max-w-md"
              >
                {[
                  { n: "500+", l: "объектов" },
                  { n: "40+", l: "ЖК" },
                  { n: "300+", l: "сделок" },
                ].map(s => (
                  <div key={s.l}>
                    <div className="display-xl text-[34px] lg:text-[40px] num">{s.n}</div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mt-2">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* HERO CAROUSEL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] lg:aspect-[5/6] rounded-[28px] overflow-hidden bg-secondary shadow-xl">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={slide}
                    src={HERO_IMAGES[slide]}
                    alt="Анапа · премиальная недвижимость"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215_45%_8%)]/65 via-[hsl(215_45%_8%)]/10 to-transparent" />

                {/* Dots */}
                <div className="absolute top-5 right-5 flex gap-1.5">
                  {HERO_IMAGES.map((_, i) => (
                    <button key={i} onClick={() => setSlide(i)} aria-label={`Слайд ${i + 1}`}
                      className={`h-1 rounded-full transition-all ${i === slide ? "w-7 bg-white" : "w-3 bg-white/40"}`} />
                  ))}
                </div>

                {/* Floating card */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl p-5 bg-card/95 backdrop-blur-xl border border-white/40 shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="eyebrow">Рекомендуем</div>
                      <div className="mt-1.5 font-display font-semibold text-[16px] leading-tight truncate">{featured?.name ?? "ЖК у моря"}</div>
                      <div className="mt-1 text-[12.5px] text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />{featured?.district} · сдача {featured?.deadline}
                      </div>
                    </div>
                    <Link to={featured ? `/complexes/${featured.slug}` : "/complexes"}
                      className="w-10 h-10 rounded-full bg-primary text-primary-foreground grid place-items-center hover:bg-primary/90 transition-colors shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex items-end justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Цена от</div>
                      <div className="display-xl text-[22px] num">{formatPriceShort(featured?.priceFrom ?? 6500000)}</div>
                    </div>
                    <div className="chip-brand text-[11px]">{featured?.class ?? "комфорт"}</div>
                  </div>
                </div>
              </div>

              {/* Mini stat tile */}
              <div className="hidden lg:flex absolute -left-6 top-12 surface p-4 bg-card shadow-lg w-52 flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <TrendingUp className="w-3.5 h-3.5 text-success" />
                  Рынок Анапы · 12 мес.
                </div>
                <div className="display-xl text-[28px] num text-foreground">+18.4%</div>
                <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full w-[78%] rounded-full bg-gradient-brand" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FILTER — standalone product */}
      <section className="container-x -mt-12 lg:-mt-16 relative z-10">
        <PropertyFilter value={filter} onChange={setFilter} />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Прямые застройщики</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Подбор за 24 часа</span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-border" />
          <span className="hidden sm:inline-flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> AI-аналитика рынка</span>
        </div>
      </section>

      {/* POPULAR COMPLEXES */}
      <section className="container-x mt-32">
        <SectionHeader eyebrow="Маркетплейс новостроек" title="Популярные ЖК в Анапе" link={{ to: "/complexes", label: "Все ЖК" }} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {complexes.slice(0, 6).map(c => <ComplexCard key={c.id} c={c} />)}
        </div>
      </section>

      {/* PLATFORM */}
      <section className="container-x mt-32">
        <div className="rounded-3xl overflow-hidden bg-gradient-ink text-primary-foreground p-8 lg:p-16 relative">
          <div className="absolute inset-0 opacity-[0.05] grid-bg" />
          <div className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full bg-[hsl(var(--brand))]/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
            <div>
              <span className="chip border-white/10 bg-white/5 text-white/70">Платформа</span>
              <h2 className="mt-6 display-xl text-[40px] lg:text-[56px] text-white">
                Не сайт. <br />
                Операционная система <br />
                агентства.
              </h2>
              <p className="mt-6 text-white/65 max-w-md text-[15.5px] leading-relaxed">
                CRM, Avito-чаты, AI-ассистенты, аналитика, документооборот — всё в одной платформе ЮГАКЦЕНТ.
              </p>
              <Button asChild className="mt-8 h-12 px-6 bg-white text-primary hover:bg-white/90 rounded-xl">
                <Link to="/admin">Открыть платформу <ArrowUpRight className="w-4 h-4 ml-1.5" /></Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: BarChart3, t: "Аналитика рынка", d: "Динамика цен, ликвидность ЖК, прогноз доходности." },
                { icon: Building2, t: "База ЖК и объектов", d: "500+ объектов, 40+ ЖК, актуальные планировки." },
                { icon: Bot, t: "AI-ассистенты", d: "SEO, контент, Avito-ответы, отчёты руководителю." },
                { icon: ShieldCheck, t: "Сопровождение сделки", d: "Юрист, ипотека, регистрация, налоги под ключ." },
              ].map(f => (
                <div key={f.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] hover:border-white/15 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white/10 grid place-items-center"><f.icon className="w-4.5 h-4.5" /></div>
                  <div className="mt-5 font-semibold text-[15px]">{f.t}</div>
                  <div className="mt-1.5 text-[13.5px] text-white/60 leading-relaxed">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="container-x mt-32">
        <SectionHeader eyebrow="Журнал" title="Рынок недвижимости Анапы" link={{ to: "/news", label: "Все материалы" }} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map(n => <NewsCard key={n.id} n={n} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x mt-32">
        <div className="surface p-8 lg:p-14 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow">Заявка</span>
            <h2 className="mt-4 display-xl text-[34px] lg:text-[44px]">
              Подберём 3–5 объектов под вашу задачу за 24 часа
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md text-[15px] leading-relaxed">
              Опишите задачу — наш специалист соберёт подборку, рассчитает ипотеку и доходность.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["для жизни", "для инвестиций", "под аренду", "коммерция", "у моря"].map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
          <div className="surface p-6 lg:p-7 bg-[hsl(var(--surface-1))]">
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
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-4 display-xl text-[34px] lg:text-[48px] max-w-2xl">{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="text-[13.5px] font-medium inline-flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition-colors group">
          {link.label} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
