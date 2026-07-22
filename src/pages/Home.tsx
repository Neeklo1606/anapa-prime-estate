import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { HERO_IMAGES } from "@/data/mock";
import ComplexCard from "@/components/cards/ComplexCard";
import NewsCard from "@/components/cards/NewsCard";
import vladAsset from "@/assets/vlad.jpg.asset.json";

const slides = [
  {
    image: HERO_IMAGES[0],
    eyebrow: "Апарт-отель «Морелло»",
    title: "Апартаменты у моря в Анапе",
    subtitle: "Премиальный курортный комплекс с бассейном и собственной инфраструктурой",
    cta: { to: "/complexes", label: "Смотреть комплексы" },
  },
  {
    image: HERO_IMAGES[1],
    eyebrow: "Новостройки Анапы",
    title: "Квартиры от прямых застройщиков",
    subtitle: "Более 500 объектов с проверенной документацией и ипотекой от 4,9%",
    cta: { to: "/catalog", label: "Открыть каталог" },
  },
  {
    image: HERO_IMAGES[2],
    eyebrow: "Инвестиции в недвижимость",
    title: "Доходность до 18% годовых",
    subtitle: "Курортные объекты с управляющей компанией и посуточной арендой",
    cta: { to: "/analytics", label: "Аналитика рынка" },
  },
];

export default function Home() {
  const complexes = useStore((s) => s.complexes);
  const news = useStore((s) => s.news);
  const [i, setI] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % total), 6500);
    return () => clearTimeout(t);
  }, [i, total]);

  const next = () => setI((v) => (v + 1) % total);
  const prev = () => setI((v) => (v - 1 + total) % total);
  const slide = slides[i];

  return (
    <div>
      {/* HERO SLIDER */}
      <section className="relative w-full overflow-hidden bg-[hsl(220_20%_10%)]" style={{ height: "min(680px, max(480px, calc(100vh - 76px)))" }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,20,30,0.75) 0%, rgba(10,20,30,0.45) 45%, rgba(10,20,30,0.15) 100%)" }} />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full container-x flex items-center">
          <div className="max-w-2xl text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 backdrop-blur border border-white/20 px-3.5 py-1.5 text-[11.5px] font-medium uppercase tracking-[0.12em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand))]" />
                  {slide.eyebrow}
                </div>
                <h1
                  className="mt-6 font-bold text-white"
                  style={{ fontSize: "clamp(36px, 5.5vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
                >
                  {slide.title}
                </h1>
                <p className="mt-5 text-white/85 max-w-xl" style={{ fontSize: "clamp(15px, 1.35vw, 18px)" }}>
                  {slide.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button asChild className="h-12 px-7 rounded-xl bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90 text-white text-[14px] font-medium">
                    <Link to={slide.cta.to}>
                      {slide.cta.label} <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-12 px-6 rounded-xl bg-white/10 backdrop-blur border-white/25 text-white hover:bg-white/20 hover:text-white text-[14px] font-medium">
                    <Link to="/contacts">Получить консультацию</Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={prev} aria-label="Предыдущий слайд" className="hidden md:grid absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 place-items-center rounded-full bg-white/12 backdrop-blur border border-white/20 text-white hover:bg-white/25 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next} aria-label="Следующий слайд" className="hidden md:grid absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 place-items-center rounded-full bg-white/12 backdrop-blur border border-white/20 text-white hover:bg-white/25 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Слайд ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </section>

      {/* POPULAR COMPLEXES */}
      <section className="container-x mt-24">
        <SectionHeader eyebrow="Маркетплейс новостроек" title="Популярные ЖК Анапы" link={{ to: "/complexes", label: "Все предложения" }} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {complexes.slice(0, 4).map((c) => <ComplexCard key={c.id} c={c} />)}
        </div>
      </section>

      {/* ABOUT / VLAD BLOCK */}
      <section className="container-x mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-[hsl(var(--brand-soft))]">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center">
            <div className="p-8 md:p-14 lg:p-16 max-w-xl">
              <div className="text-[100px] leading-none font-bold text-white/70 select-none" aria-hidden>“</div>
              <div className="-mt-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/60">О компании</div>
                <h2 className="mt-4 font-bold text-foreground" style={{ fontSize: "clamp(28px, 3.4vw, 40px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Владислав Югов
                </h2>
                <p className="mt-5 text-foreground/80 leading-relaxed text-[15px]">
                  Мы · команда экспертов, для которых недвижимость Анапы не просто работа, а профессия и стиль жизни. С 2017 года «ЮгАкцент» помогает семьям, инвесторам и предпринимателям находить объекты, в которые хочется вернуться. За каждым положительным отзывом · часы работы: телефонные переговоры, показы, юридические проверки, сопровождение сделки от аванса до ключей.
                </p>
                <Button asChild className="mt-8 h-12 px-7 rounded-xl bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90 text-white text-[14px] font-medium">
                  <Link to="/about">Узнать подробнее</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[380px] md:h-[460px] lg:h-[520px]">
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="absolute right-10 top-16 w-56 h-56 md:w-72 md:h-72 rounded-full bg-white/70" aria-hidden />
                <div className="absolute right-24 bottom-8 w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/50" aria-hidden />
                <img
                  src={vladAsset.url}
                  alt="Владислав Югов · основатель ЮгАкцент"
                  className="relative h-full w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="container-x mt-24">
        <SectionHeader eyebrow="Журнал" title="Рынок недвижимости Анапы" link={{ to: "/news", label: "Все материалы" }} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map((n) => <NewsCard key={n.id} n={n} />)}
        </div>
      </section>

      {/* CTA — link to premium contact page */}
      <section className="container-x mt-24 mb-24">
        <div className="relative overflow-hidden rounded-3xl bg-[hsl(220_25%_11%)] text-white p-10 md:p-14 lg:p-16">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[hsl(var(--brand))]/25 blur-3xl" aria-hidden />
          <div className="relative max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Свяжитесь с нами</div>
            <h2 className="mt-4 font-bold" style={{ fontSize: "clamp(28px, 3.4vw, 40px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Подберём объект под ваш бюджет и цели
            </h2>
            <p className="mt-4 text-white/75 max-w-xl text-[15px]">
              Оставьте заявку · пришлём 3-5 точных вариантов за 24 часа. Сопровождение сделки бесплатно.
            </p>
            <Button asChild className="mt-8 h-12 px-7 rounded-xl bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90 text-white text-[14px] font-medium">
              <Link to="/contacts">Оставить заявку <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
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
        <h2 className="mt-4 display-xl text-[32px] lg:text-[44px] max-w-2xl">{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="text-[13.5px] font-medium inline-flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition-colors group">
          {link.label} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
