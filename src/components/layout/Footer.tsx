import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container-x py-14 lg:py-20 grid gap-10 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-gold text-gold-foreground grid place-items-center font-display text-xl">Ю</div>
            <div>
              <div className="font-display text-xl">Югэксэнд</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-primary-foreground/60">недвижимость Анапы</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-primary-foreground/70 max-w-xs">
            Подбираем недвижимость в Анапе с 2017 года. Новостройки, вторичка, инвестиционные объекты.
          </p>
        </div>

        <div>
          <div className="eyebrow text-primary-foreground/50">Навигация</div>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/complexes" className="hover:text-gold transition-colors">Новостройки</Link></li>
            <li><Link to="/catalog" className="hover:text-gold transition-colors">Каталог</Link></li>
            <li><Link to="/news" className="hover:text-gold transition-colors">Новости</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">О компании</Link></li>
            <li><Link to="/contacts" className="hover:text-gold transition-colors">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-primary-foreground/50">Контакты</div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-gold" /> +7 800 123-45-67</li>
            <li className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-gold" /> hello@yugexsend.ru</li>
            <li className="text-primary-foreground/70">г. Анапа, ул. Крымская, 99, офис 410</li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-primary-foreground/50">Мессенджеры</div>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Telegram" className="w-11 h-11 rounded-lg bg-primary-foreground/10 hover:bg-gold hover:text-gold-foreground grid place-items-center transition-colors"><Send className="w-5 h-5" /></a>
            <a href="#" aria-label="WhatsApp" className="w-11 h-11 rounded-lg bg-primary-foreground/10 hover:bg-gold hover:text-gold-foreground grid place-items-center transition-colors"><MessageCircle className="w-5 h-5" /></a>
            <a href="#" aria-label="Avito" className="w-11 h-11 rounded-lg bg-primary-foreground/10 hover:bg-gold hover:text-gold-foreground grid place-items-center transition-colors text-xs font-bold">A</a>
          </div>
          <Link to="/admin" className="inline-block mt-6 text-xs text-primary-foreground/40 hover:text-gold transition-colors">Админ-панель →</Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-x py-5 flex flex-col sm:flex-row gap-2 justify-between text-xs text-primary-foreground/50">
          <div>© {new Date().getFullYear()} Югэксэнд. Все права защищены.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold">Политика обработки данных</a>
            <a href="#" className="hover:text-gold">Публичная оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
