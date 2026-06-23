import { Link } from "react-router-dom";
import { Phone, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const cols = [
    {
      title: "Платформа",
      links: [
        { to: "/complexes", label: "Новостройки" },
        { to: "/catalog", label: "Каталог объектов" },
        { to: "/analytics", label: "Аналитика рынка" },
        { to: "/news", label: "Новости" },
      ],
    },
    {
      title: "Компания",
      links: [
        { to: "/about", label: "О ЮГАКЦЕНТ" },
        { to: "/contacts", label: "Контакты" },
        { to: "/admin", label: "Войти в платформу" },
      ],
    },
    {
      title: "Контакты",
      links: [
        { to: "tel:+78001234567", label: "+7 800 123-45-67", external: true },
        { to: "mailto:hello@ugakcent.ru", label: "hello@ugakcent.ru", external: true },
        { to: "/contacts", label: "г. Анапа, ул. Крымская, 99" },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="container-x py-16 grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-lg bg-gradient-ink grid place-items-center">
              <span className="font-display text-base font-bold text-white">Ю</span>
              <span className="absolute bottom-0 left-0 right-0 h-px bg-[hsl(var(--brand))]" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-bold tracking-tight">ЮГАКЦЕНТ</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Real Estate Platform</div>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Недвижимость Анапы нового поколения. Технологическая платформа подбора, инвестиций и сопровождения сделок.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Платформа работает · API доступен
          </div>
        </div>

        {cols.map(col => (
          <div key={col.title}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{col.title}</div>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map(l => (
                <li key={l.label}>
                  {"external" in l && l.external ? (
                    <a href={l.to} className="text-foreground/80 hover:text-foreground transition-colors inline-flex items-center gap-1">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} className="text-foreground/80 hover:text-foreground transition-colors inline-flex items-center gap-1">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-x py-5 flex flex-col sm:flex-row gap-2 justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} ЮГАКЦЕНТ. Все права защищены.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Политика данных</a>
            <a href="#" className="hover:text-foreground">Оферта</a>
            <Link to="/admin" className="hover:text-foreground inline-flex items-center gap-1">Платформа <ArrowUpRight className="w-3 h-3" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
