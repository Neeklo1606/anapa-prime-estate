import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, TrendingUp, ShieldCheck, Zap, Building2, BarChart3, Bot } from "lucide-react";
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
  const heroImg = HERO_IMAGES[0];
  const featured = complexes[0];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container-x relative pt-16 lg:pt-24 pb-20 lg:pb-28">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="chip-brand">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand))]" />
                  Платформа · Анапа · 2026
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-6 font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight font-bold"
              >
                Подбираем недвижимость <br className="hidden sm:block" />в Анапе для <span className="text-[hsl(var(--brand))]">жизни</span>,{" "}
                <span className="text-[hsl(var(--brand))]">инвестиций</span> и бизнеса.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-6 text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                Более 500 объектов. Новостройки, вторичный рынок, коммерческая недвижимость. Технологическая платформа подбора и сопровождения сделки.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Button asChild size="lg" className="h-12 px-6 bg-primary hover:bg-primary/90 shadow-md text-[14px]">
                  <Link to="/contacts">Подобрать объект <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6 text-[14px] border-border bg-card hover:bg-secondary">
                  <Link to="/catalog">Смотреть каталог</Link>
                </Button>
              </motion.div>

              {/* STATS */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-12 grid grid-cols-3 gap-6 max-w-md"
              >
                {[
                  { n: "500+", l: "объектов" },
                  { n: "40+", l: "ЖК" },
                  { n: "300+", l: "сделок" },
                ].map(s => (
                  <div key={s.l}>
                    <div className="font-display text-3xl lg:text-4xl font-bold tracking-tight num">{s.n}</div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mt-1.5">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* HERO VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="relative aspect-[5/6] lg:aspect-[4/5] rounded-3xl overflow-hidden bg-secondary shadow-xl">
                <img src={heroImg} alt="Анапа · премиальная недвижимость" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                {/* Floating card */}
                <div className="absolute bottom-5 left-5 right-5 surface p-4 bg-card/95 backdrop-blur-md">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="eyebrow">Рекомендуем</div>
                      <div className="mt-1 font-display font-semibold text-[15px] leading-tight">{featured?.name ?? "ЖК у моря"}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{featured?.district}, сдача {featured?.deadline}</div>
                    </div>
                    <Link to={featured ? `/complexes/${featured.slug}` : "/complexes"}
                      className="w-9 h-9 rounded-full bg-primary text-primary-foreground grid place-items-center hover:bg-primary/90 transition-colors shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex items-end justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Цена от</div>
                      <div className="font-display text-xl font-bold num">{formatPriceShort(featured?.priceFrom ?? 6500000)}</div>
                    </div>
                    <div className="chip-brand text-[10px]">{featured?.class ?? "комфорт"}</div>
                  </div>
                </div>
              </div>
              {/* Mini stat tile */}
              <div className="hidden lg:block absolute -left-6 top-10 surface p-4 bg-card shadow-lg w-48">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <TrendingUp className="w-3.5 h-3.5 text-success" />
                  Рынок Анапы
                </div>
                <div className="mt-2 font-display text-2xl font-bold num">+18.4%</div>
                <div className="text-[11px] text-muted-foreground">средний рост за 12 мес.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="container-x -mt-10 relative z-10">
        <PropertyFilter value={filter} onChange={setFilter} />
        <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Прямые застройщики</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5"><Zap className="w-3 h-3" /> Подбор за 24 часа</span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-border" />
          <span className="hidden sm:inline-flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> AI-аналитика рынка</span>
        </div>
      </section>

      {/* POPULAR COMPLEXES */}
      <section className="container-x mt-28">
        <SectionHeader eyebrow="Маркетплейс новостроек" title="Популярные ЖК в Анапе" link={{ to: "/complexes", label: "Все ЖК" }} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {complexes.slice(0, 6).map(c => <ComplexCard key={c.id} c={c} />)}
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="container-x mt-28">
        <div className="surface overflow-hidden bg-gradient-ink text-primary-foreground border-0 p-8 lg:p-14 relative">
          <div className="absolute inset-0 opacity-[0.04] grid-bg" />
          <div className="relative grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            <div>
              <span className="chip border-white/10 bg-white/5 text-white/70">Платформа</span>
              <h2 className="mt-5 font-display text-3xl lg:text-5xl font-bold leading-[1.05] tracking-tight">
                Не сайт. <br />Операционная система <br />агентства недвижимости.
              </h2>
              <p className="mt-5 text-white/70 max-w-md">
                CRM, Avito-чаты, AI-ассистенты, аналитика, документооборот — всё в одной платформе ЮГАКЦЕНТ.
              </p>
              <Button asChild className="mt-7 h-11 bg-white text-primary hover:bg-white/90">
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
                <div key={f.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-white/10 grid place-items-center"><f.icon className="w-4 h-4" /></div>
                  <div className="mt-4 font-semibold text-[15px]">{f.t}</div>
                  <div className="mt-1 text-sm text-white/60 leading-relaxed">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="container-x mt-28">
        <SectionHeader eyebrow="Журнал" title="Рынок недвижимости Анапы" link={{ to: "/news", label: "Все материалы" }} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map(n => <NewsCard key={n.id} n={n} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x mt-28">
        <div className="surface p-8 lg:p-12 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow">Заявка</span>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
              Подберём 3–5 объектов под вашу задачу за 24 часа
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Опишите задачу — наш специалист соберёт подборку, рассчитает ипотеку и доходность.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["для жизни", "для инвестиций", "под аренду", "коммерция", "у моря"].map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
          <div className="surface p-6 lg:p-7 bg-secondary/40">
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
        <h2 className="mt-3 font-display text-3xl lg:text-[42px] font-bold tracking-tight leading-[1.1] max-w-2xl">{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="text-sm font-medium inline-flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition-colors">
          {link.label} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
