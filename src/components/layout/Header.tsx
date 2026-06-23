import { Link, NavLink } from "react-router-dom";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Главная" },
  { to: "/complexes", label: "Новостройки" },
  { to: "/catalog", label: "Каталог" },
  { to: "/news", label: "Новости" },
  { to: "/about", label: "О компании" },
  { to: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="container-x flex h-16 lg:h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground grid place-items-center font-display text-xl">Ю</div>
          <div className="leading-tight">
            <div className="font-display text-lg lg:text-xl tracking-tight">Югэксэнд</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hidden sm:block">недвижимость Анапы</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.slice(1).map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-primary ${isActive ? "text-primary font-medium" : "text-foreground/80"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="tel:+78001234567" className="hidden md:flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            <span className="font-medium">+7 800 123-45-67</span>
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex bg-primary hover:bg-primary/90">
            <Link to="/contacts">Подобрать объект</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="w-5 h-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-2 mt-8">
                {links.map(l => (
                  <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-3 rounded-lg text-base ${isActive ? "bg-secondary text-primary font-medium" : "text-foreground/80 hover:bg-secondary/60"}`
                    }>
                    {l.label}
                  </NavLink>
                ))}
                <Button asChild className="mt-4"><Link to="/contacts" onClick={() => setOpen(false)}>Подобрать объект</Link></Button>
                <Button asChild variant="outline" className="mt-1"><Link to="/admin" onClick={() => setOpen(false)}>Админка</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
