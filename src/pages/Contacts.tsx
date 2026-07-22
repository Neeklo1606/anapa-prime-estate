import { Phone, Mail, MapPin, Clock, Check, ArrowRight } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import SocialIcons from "@/components/SocialIcons";
import hero from "@/assets/hero-2.jpg";

const bullets = [
  "Подберём 3-5 точных вариантов под ваш бюджет",
  "Проверим документы и репутацию застройщика",
  "Организуем показы онлайн или лично в Анапе",
  "Сопроводим сделку до получения ключей · бесплатно",
];

export default function Contacts() {
  return (
    <div className="relative">
      {/* Premium dark hero with form on top */}
      <section className="relative overflow-hidden bg-[hsl(220_25%_10%)] text-white">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220_28%_8%)] via-[hsl(220_25%_10%)]/85 to-transparent" />
        <div className="absolute -right-32 top-12 w-[520px] h-[520px] rounded-full bg-[hsl(var(--brand))]/25 blur-3xl" aria-hidden />

        <div className="container-x relative py-16 lg:py-24 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand))]" /> Оставить заявку
            </div>
            <h1 className="mt-6 font-bold text-white" style={{ fontSize: "clamp(34px, 4.5vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
              Найдём вашу недвижимость в Анапе
            </h1>
            <p className="mt-5 max-w-xl text-white/75 text-[16px] leading-relaxed">
              Расскажите о задаче · перезвоним в течение 15 минут и пришлём точные варианты. Сопровождение сделки от аванса до ключей · бесплатно.
            </p>

            <ul className="mt-8 space-y-3.5 max-w-md">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px] text-white/90">
                  <span className="mt-0.5 w-6 h-6 grid place-items-center rounded-full bg-[hsl(var(--brand))]/20 text-[hsl(var(--brand))] shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid sm:grid-cols-2 gap-3 max-w-md">
              <a href="tel:+78002345715" className="flex items-center gap-3 rounded-xl bg-white/8 backdrop-blur border border-white/15 px-4 py-3 hover:bg-white/12 transition-colors">
                <span className="w-10 h-10 grid place-items-center rounded-lg bg-white/10"><Phone className="w-4 h-4" /></span>
                <span className="leading-tight">
                  <span className="block text-[11px] uppercase tracking-[0.12em] text-white/55">Телефон</span>
                  <span className="block font-semibold num">8 800 234 57 15</span>
                </span>
              </a>
              <a href="mailto:hello@ugakcent.ru" className="flex items-center gap-3 rounded-xl bg-white/8 backdrop-blur border border-white/15 px-4 py-3 hover:bg-white/12 transition-colors">
                <span className="w-10 h-10 grid place-items-center rounded-lg bg-white/10"><Mail className="w-4 h-4" /></span>
                <span className="leading-tight">
                  <span className="block text-[11px] uppercase tracking-[0.12em] text-white/55">E-mail</span>
                  <span className="block font-semibold">hello@ugakcent.ru</span>
                </span>
              </a>
            </div>

            <div className="mt-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55 mb-3">Мы в соцсетях</div>
              <div className="[&_a]:!bg-white/10 [&_a]:!border-white/15 [&_a]:!text-white hover:[&_a]:!bg-white/20">
                <SocialIcons variant="solid" />
              </div>
            </div>
          </div>

          {/* Premium glass form card */}
          <div className="relative">
            <div className="rounded-3xl bg-white text-foreground shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] p-7 md:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow">Заявка · 30 секунд</div>
                  <h2 className="mt-2 font-bold" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>
                    Получите подборку объектов
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-muted-foreground">Перезвоним за 15 минут · без спама</p>
                </div>
                <div className="hidden sm:grid w-11 h-11 rounded-xl bg-[hsl(var(--brand-soft))] text-[hsl(var(--brand))] place-items-center shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-6">
                <LeadForm context="Форма с страницы контактов" />
              </div>

              <div className="mt-6 pt-5 border-t border-border grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-[20px] font-bold num">8 лет</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">на рынке Анапы</div>
                </div>
                <div className="border-x border-border">
                  <div className="text-[20px] font-bold num">2300+</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">сделок</div>
                </div>
                <div>
                  <div className="text-[20px] font-bold num">24</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">застройщика</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office info */}
      <section className="container-x py-16 grid lg:grid-cols-[1fr_1.4fr] gap-10">
        <div>
          <div className="eyebrow">Наш офис</div>
          <h2 className="mt-3 font-bold" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>
            Приезжайте на чашку кофе
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Мы находимся в центре Анапы, в БЦ «Премьер». Приезжайте с семьёй · подберём варианты, покажем планировки на большом экране и ответим на все вопросы.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3.5">
              <span className="w-11 h-11 grid place-items-center rounded-xl bg-[hsl(var(--brand-soft))] text-[hsl(var(--brand))] shrink-0"><MapPin className="w-5 h-5" /></span>
              <div>
                <div className="font-semibold">г. Анапа, ул. Крымская, 99</div>
                <div className="text-[13.5px] text-muted-foreground">БЦ «Премьер», офис 410, 4 этаж</div>
              </div>
            </li>
            <li className="flex items-start gap-3.5">
              <span className="w-11 h-11 grid place-items-center rounded-xl bg-[hsl(var(--brand-soft))] text-[hsl(var(--brand))] shrink-0"><Clock className="w-5 h-5" /></span>
              <div>
                <div className="font-semibold">Ежедневно 9:00 · 21:00</div>
                <div className="text-[13.5px] text-muted-foreground">Без выходных и праздничных</div>
              </div>
            </li>
            <li className="flex items-start gap-3.5">
              <span className="w-11 h-11 grid place-items-center rounded-xl bg-[hsl(var(--brand-soft))] text-[hsl(var(--brand))] shrink-0"><Phone className="w-5 h-5" /></span>
              <div>
                <a href="tel:+78002345715" className="font-semibold num hover:text-[hsl(var(--brand))]">8 800 234 57 15</a>
                <div className="text-[13.5px] text-muted-foreground">Звонок бесплатный</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl overflow-hidden border border-border bg-secondary min-h-[420px]">
          <iframe
            title="Карта офиса ЮгАкцент"
            src="https://yandex.ru/map-widget/v1/?ll=37.320000%2C44.895000&z=14&pt=37.320000,44.895000,pm2rdm"
            className="w-full h-full min-h-[420px] border-0"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
