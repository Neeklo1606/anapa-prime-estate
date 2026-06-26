import { Link, NavLink } from "react-router-dom";
import { Menu, ArrowUpRight, Phone, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { to: "/complexes", label: "Новостройки" },
  { to: "/catalog", label: "Каталог" },
  { to: "/analytics", label: "Аналитика" },
  { to: "/news", label: "Новости" },
  { to: "/about", label: "О компании" },
  { to: "/contacts", label: "Контакты" },
];

function Logo() {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <div className="relative w-9 h-9 rounded-xl bg-primary grid place-items-center overflow-hidden">
        <span className="font-display text-[16px] font-bold text-white tracking-tighter">Ю</span>
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[hsl(var(--brand))]" />
      </div>
      <div className="leading-none">
        <div className="font-display text-[15px] font-bold tracking-tight">ЮГАКЦЕНТ</div>
        <div className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:block">Недвижимость Анапы</div>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/70">
      <div className="container-x flex h-16 lg:h-[72px] items-center justify-between gap-4">
        <Link to="/" aria-label="ЮГАКЦЕНТ" className="shrink-0"><Logo /></Link>

        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center max-w-2xl">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors ${
                  isActive ? "text-foreground bg-secondary" : "text-foreground/60 hover:text-foreground hover:bg-secondary/60"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 shrink-0">
          <a href="tel:+78001234567" aria-label="Позвонить"
            className="hidden 2xl:inline-flex h-9 items-center gap-1.5 px-2.5 rounded-lg text-[12.5px] font-medium text-foreground/80 hover:bg-secondary transition-colors num">
            <Phone className="w-3.5 h-3.5" /> +7 800 123-45-67
          </a>
          <a href="tel:+78001234567" aria-label="Позвонить"
            className="hidden md:inline-flex 2xl:hidden w-9 h-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Phone className="w-4 h-4" />
          </a>
          <a href="https://t.me/ugakcent" target="_blank" rel="noreferrer" aria-label="Telegram"
            className="hidden md:grid w-9 h-9 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Send className="w-4 h-4" />
          </a>
          <a href="https://wa.me/78001234567" target="_blank" rel="noreferrer" aria-label="WhatsApp"
            className="hidden md:grid w-9 h-9 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <MessageCircle className="w-4 h-4" />
          </a>

          <Link to="/admin" className="hidden xl:inline-flex items-center gap-1 text-[12.5px] text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1 ml-1">
            Войти <ArrowUpRight className="w-3 h-3" />
          </Link>

          <Button asChild size="sm" className="hidden sm:inline-flex h-10 px-4 lg:px-5 bg-primary hover:bg-primary/90 text-[13px] font-medium rounded-lg shadow-sm ml-1">
            <Link to="/contacts">Подобрать объект</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10"><Menu className="w-4 h-4" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-1 mt-8">
                {links.map(l => (
                  <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-lg text-sm ${isActive ? "bg-secondary text-foreground font-medium" : "text-foreground/75 hover:bg-secondary/60"}`
                    }>
                    {l.label}
                  </NavLink>
                ))}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <a href="tel:+78001234567" className="surface-flat p-3 grid place-items-center gap-1 text-xs"><Phone className="w-4 h-4" />Звонок</a>
                  <a href="https://t.me/ugakcent" className="surface-flat p-3 grid place-items-center gap-1 text-xs"><Send className="w-4 h-4" />Telegram</a>
                  <a href="https://wa.me/78001234567" className="surface-flat p-3 grid place-items-center gap-1 text-xs"><MessageCircle className="w-4 h-4" />WhatsApp</a>
                </div>
                <Button asChild className="mt-4 h-11"><Link to="/contacts" onClick={() => setOpen(false)}>Подобрать объект</Link></Button>
                <Button asChild variant="outline" className="mt-1 h-11"><Link to="/admin" onClick={() => setOpen(false)}>Платформа →</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
