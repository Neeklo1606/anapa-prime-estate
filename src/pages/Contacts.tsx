import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";

export default function Contacts() {
  return (
    <div className="container-x py-10 lg:py-14">
      <div className="eyebrow">Контакты</div>
      <h1 className="mt-2 font-display text-4xl lg:text-5xl">Свяжитесь с нами</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">Мы на связи каждый день с 9:00 до 21:00. Позвоните, напишите в мессенджер или оставьте заявку — перезвоним за 15 минут.</p>

      <div className="mt-10 grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="card-premium p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground grid place-items-center shrink-0"><Phone className="w-5 h-5" /></div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Телефон</div>
              <a href="tel:+78001234567" className="mt-1 block font-display text-2xl hover:text-primary">+7 800 123-45-67</a>
              <div className="text-sm text-muted-foreground">Ежедневно 9:00 — 21:00</div>
            </div>
          </div>
          <div className="card-premium p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground grid place-items-center shrink-0"><Mail className="w-5 h-5" /></div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
              <a href="mailto:hello@yugexsend.ru" className="mt-1 block font-display text-2xl hover:text-primary">hello@yugexsend.ru</a>
            </div>
          </div>
          <div className="card-premium p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground grid place-items-center shrink-0"><MapPin className="w-5 h-5" /></div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Офис</div>
              <div className="mt-1 font-display text-xl">г. Анапа, ул. Крымская, 99</div>
              <div className="text-sm text-muted-foreground">БЦ «Премьер», офис 410, 4 этаж</div>
            </div>
          </div>
          <div className="card-premium p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Мессенджеры</div>
            <div className="mt-3 flex gap-2">
              <a href="#" className="flex-1 h-12 rounded-xl bg-[#229ED9] text-white grid place-items-center hover:opacity-90"><Send className="w-5 h-5" /></a>
              <a href="#" className="flex-1 h-12 rounded-xl bg-[#25D366] text-white grid place-items-center hover:opacity-90"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="flex-1 h-12 rounded-xl bg-[#A3CD3A] text-white grid place-items-center hover:opacity-90 font-bold">Avito</a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden bg-secondary h-72 grid place-items-center border border-border/60">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-10 h-10 mx-auto mb-2 text-brand" />
              <div className="font-medium text-foreground">Карта офиса</div>
              <div className="text-sm">Подключение Яндекс Карт</div>
            </div>
          </div>
        </div>

        <div className="card-premium p-7 lg:p-9 h-fit">
          <LeadForm title="Подберём объект" subtitle="Заполните форму — наш специалист свяжется с вами в течение 15 минут." />
        </div>
      </div>
    </div>
  );
}
