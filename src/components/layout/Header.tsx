import { Link, NavLink } from "react-router-dom";
import { Menu, ArrowUpRight } from "lucide-react";
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
    <div className="flex items-center gap-2.5 shrink-0">
      <div className="relative w-8 h-8 rounded-lg bg-gradient-ink grid place-items-center overflow-hidden">
        <span className="font-display text-[15px] font-bold text-white tracking-tighter">Ю</span>
        <span className="absolute bottom-0 left-0 right-0 h-px bg-[hsl(var(--brand))]" />
      </div>
      <div className="leading-none">
        <div className="font-display text-[15px] font-bold tracking-tight">ЮГАКЦЕНТ</div>
        <div className="mt-1 text-[9px] uppercase tracking-[0.22em] text-muted-foreground hidden sm:block">Real Estate Platform</div>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/70">
      <div className="container-x flex h-14 lg:h-16 items-center justify-between gap-4">
        <Link to="/"><Logo /></Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${isActive ? "text-foreground bg-secondary" : "text-foreground/65 hover:text-foreground hover:bg-secondary/60"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/admin" className="hidden md:inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
            Войти <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Button asChild size="sm" className="hidden sm:inline-flex h-9 px-4 bg-primary hover:bg-primary/90 text-[13px] font-medium shadow-sm">
            <Link to="/contacts">Подобрать объект</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9"><Menu className="w-4 h-4" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-1 mt-8">
                {links.map(l => (
                  <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-lg text-sm ${isActive ? "bg-secondary text-foreground font-medium" : "text-foreground/75 hover:bg-secondary/60"}`
                    }>
                    {l.label}
                  </NavLink>
                ))}
                <Button asChild className="mt-4"><Link to="/contacts" onClick={() => setOpen(false)}>Подобрать объект</Link></Button>
                <Button asChild variant="outline" className="mt-1"><Link to="/admin" onClick={() => setOpen(false)}>Платформа →</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
