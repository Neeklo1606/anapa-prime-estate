import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { HERO_IMAGES } from "@/data/mock";
import ComplexCard from "@/components/cards/ComplexCard";
import NewsCard from "@/components/cards/NewsCard";
import LeadForm from "@/components/LeadForm";

export default function Home() {
  const complexes = useStore(s => s.complexes);
  const news = useStore(s => s.news);

  return (
    <div>
      {/* HERO */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "min(600px, max(420px, calc(100vh - 72px)))" }}
      >
        <img
          src={HERO_IMAGES[0]}
          alt="Анапа · море"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))" }}
        />
        <div className="relative h-full container-x flex flex-col items-center justify-center text-center">
          <h1
            className="text-white font-bold"
            style={{ fontFamily: "Inter, ui-sans-serif, system-ui", fontWeight: 700, fontSize: "clamp(36px, 6vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            ЮгАкцент
          </h1>
          <p
            className="mt-5 text-white/85"
            style={{ fontSize: "clamp(16px, 2vw, 18px)" }}
          >
            Агентство недвижимости в Анапе
          </p>
          <Button
            asChild
            className="mt-8 h-12 px-8 rounded-xl bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90 text-white text-base font-medium w-full sm:w-auto max-w-xs"
          >
            <Link to="/catalog">
              Смотреть каталог <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Mobile hero height override */}
      <style>{`
        @media (max-width: 640px) {
          section[data-hero] { height: 75vh !important; }
        }
      `}</style>

      {/* POPULAR COMPLEXES */}
      <section className="container-x mt-24">
        <SectionHeader eyebrow="Маркетплейс новостроек" title="Популярные ЖК в Анапе" link={{ to: "/complexes", label: "Все ЖК" }} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {complexes.slice(0, 6).map(c => <ComplexCard key={c.id} c={c} />)}
        </div>
      </section>

      {/* NEWS */}
      <section className="container-x mt-24 mb-24">
        <SectionHeader eyebrow="Журнал" title="Рынок недвижимости Анапы" link={{ to: "/news", label: "Все материалы" }} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map(n => <NewsCard key={n.id} n={n} />)}
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
