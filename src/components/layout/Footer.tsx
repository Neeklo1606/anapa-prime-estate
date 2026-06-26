import { Link } from "react-router-dom";
import { ArrowUpRight, Send, MessageCircle, Phone } from "lucide-react";

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
    <footer className="mt-32 border-t border-border bg-[hsl(var(--surface-1))]">
      <div className="container-x py-20 grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-primary grid place-items-center">
              <span className="font-display text-[17px] font-bold text-white">Ю</span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[hsl(var(--brand))]" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-[16px] font-bold tracking-tight">ЮГАКЦЕНТ</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-1">Недвижимость Анапы</div>
            </div>
          </div>
          <p className="mt-6 text-[14px] text-muted-foreground max-w-sm leading-relaxed">
            Недвижимость Анапы нового поколения. Технологическая платформа подбора, инвестиций и сопровождения сделок.
          </p>
          <div className="mt-7 flex items-center gap-2">
            <a href="tel:+78001234567" aria-label="Звонок" className="w-10 h-10 grid place-items-center rounded-xl bg-card border border-border hover:border-foreground/20 transition-colors"><Phone className="w-4 h-4" /></a>
            <a href="https://t.me/ugakcent" aria-label="Telegram" className="w-10 h-10 grid place-items-center rounded-xl bg-card border border-border hover:border-foreground/20 transition-colors"><Send className="w-4 h-4" /></a>
            <a href="https://wa.me/78001234567" aria-label="WhatsApp" className="w-10 h-10 grid place-items-center rounded-xl bg-card border border-border hover:border-foreground/20 transition-colors"><MessageCircle className="w-4 h-4" /></a>
          </div>
        </div>

        {cols.map(col => (
          <div key={col.title}>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{col.title}</div>
            <ul className="mt-6 space-y-3.5 text-[14px]">
              {col.links.map(l => (
                <li key={l.label}>
                  {"external" in l && l.external ? (
                    <a href={l.to} className="text-foreground/75 hover:text-foreground transition-colors">{l.label}</a>
                  ) : (
                    <Link to={l.to} className="text-foreground/75 hover:text-foreground transition-colors">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-x py-5 flex flex-col sm:flex-row gap-2 justify-between text-[12px] text-muted-foreground">
          <div>© {new Date().getFullYear()} ЮГАКЦЕНТ. Все права защищены.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Политика данных</a>
            <a href="#" className="hover:text-foreground">Оферта</a>
            <Link to="/admin" className="hover:text-foreground inline-flex items-center gap-1">Платформа <ArrowUpRight className="w-3 h-3" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
