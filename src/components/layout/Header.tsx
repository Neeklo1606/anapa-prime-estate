import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/layout/Logo";
import SocialIcons from "@/components/SocialIcons";

const links = [
  { to: "/catalog", label: "Каталог недвижимости" },
  { to: "/complexes", label: "Новостройки" },
  { to: "/about", label: "О компании" },
  { to: "/news", label: "Новости" },
  { to: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/70">
      <div className="container-x flex h-[76px] items-center justify-between gap-6">
        <Link to="/" aria-label="Южный Акцент" className="shrink-0">
          <Logo className="h-11" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-[13.5px] font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-foreground bg-secondary"
                    : "text-foreground/65 hover:text-foreground hover:bg-secondary/60"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden xl:flex"><SocialIcons variant="ghost" size="sm" /></div>
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex h-10 px-5 bg-primary hover:bg-primary/90 text-[13px] font-medium rounded-xl shadow-sm"
          >
            <Link to="/contacts">Оставить заявку</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-1 mt-8">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-lg text-sm ${
                        isActive
                          ? "bg-secondary text-foreground font-medium"
                          : "text-foreground/75 hover:bg-secondary/60"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <div className="mt-4"><SocialIcons variant="solid" /></div>
                <Button asChild className="mt-4 h-11">
                  <Link to="/contacts" onClick={() => setOpen(false)}>Оставить заявку</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
