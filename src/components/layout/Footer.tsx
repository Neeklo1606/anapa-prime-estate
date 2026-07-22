import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Logo from "@/components/layout/Logo";
import SocialIcons from "@/components/SocialIcons";

export default function Footer() {
  const cols = [
    {
      title: "Недвижимость",
      links: [
        { to: "/complexes", label: "Новостройки Анапы" },
        { to: "/catalog", label: "Каталог объектов" },
        { to: "/analytics", label: "Аналитика рынка" },
        { to: "/news", label: "Новости и статьи" },
      ],
    },
    {
      title: "Компания",
      links: [
        { to: "/about", label: "О ЮгАкцент" },
        { to: "/contacts", label: "Контакты и офис" },
        { to: "/admin", label: "Войти в платформу" },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-[hsl(var(--surface-1))]">
      <div className="container-x py-16 grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Logo className="h-12" />
          <p className="mt-6 text-[14px] text-muted-foreground max-w-sm leading-relaxed">
            Агентство недвижимости в Анапе. Подбор квартир, домов и инвестиционных объектов от проверенных застройщиков Краснодарского края.
          </p>
          <div className="mt-6"><SocialIcons variant="solid" /></div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{col.title}</div>
            <ul className="mt-5 space-y-3 text-[14px]">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-foreground/75 hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Контакты</div>
          <ul className="mt-5 space-y-3.5 text-[14px]">
            <li>
              <a href="tel:+78002345715" className="group flex items-start gap-3">
                <span className="w-9 h-9 grid place-items-center rounded-lg bg-white border border-border shrink-0 group-hover:border-foreground/25 transition-colors">
                  <Phone className="w-4 h-4" />
                </span>
                <span>
                  <span className="block font-semibold num text-foreground">8 800 234 57 15</span>
                  <span className="block text-[12px] text-muted-foreground">Звонок бесплатный</span>
                </span>
              </a>
            </li>
            <li>
              <a href="mailto:hello@ugakcent.ru" className="flex items-start gap-3">
                <span className="w-9 h-9 grid place-items-center rounded-lg bg-white border border-border shrink-0"><Mail className="w-4 h-4" /></span>
                <span className="pt-1 text-foreground/80">hello@ugakcent.ru</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-9 h-9 grid place-items-center rounded-lg bg-white border border-border shrink-0"><MapPin className="w-4 h-4" /></span>
              <span className="pt-1 text-foreground/80">г. Анапа, ул. Крымская, 99</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-9 h-9 grid place-items-center rounded-lg bg-white border border-border shrink-0"><Clock className="w-4 h-4" /></span>
              <span className="pt-1 text-foreground/80">Ежедневно 9:00 · 21:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x py-5 flex flex-col sm:flex-row gap-2 justify-between text-[12px] text-muted-foreground">
          <div>© {new Date().getFullYear()} ЮгАкцент · Агентство недвижимости в Анапе. Все права защищены.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Политика данных</a>
            <a href="#" className="hover:text-foreground">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
