import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-2.jpg";

const team = [
  { name: "Владислав Югов", role: "Основатель, руководитель", avatar: "https://i.pravatar.cc/200?u=vlad" },
  { name: "Анна Соколова", role: "Старший эксперт по новостройкам", avatar: "https://i.pravatar.cc/200?u=anna2" },
  { name: "Денис Краснов", role: "Эксперт инвестиционных объектов", avatar: "https://i.pravatar.cc/200?u=denis" },
  { name: "Мария Петрова", role: "Ипотечный брокер", avatar: "https://i.pravatar.cc/200?u=maria" },
];

const steps = [
  { n: "01", t: "Знакомство", d: "Узнаём вашу задачу, бюджет, цель покупки и пожелания." },
  { n: "02", t: "Подборка", d: "Готовим 3-5 точных вариантов и сравнительную таблицу." },
  { n: "03", t: "Показ и сделка", d: "Организуем просмотры, проверяем юридически, сопровождаем сделку." },
  { n: "04", t: "После продажи", d: "Помогаем с переездом, ремонтом, арендой и управлением." },
];

export default function About() {
  return (
    <div>
      <section className="relative h-[50vh] min-h-[360px] bg-primary overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-transparent" />
        <div className="container-x relative h-full flex flex-col justify-end pb-12 text-primary-foreground">
          <div className="eyebrow text-primary-foreground/60">О компании</div>
          <h1 className="mt-2 font-display text-5xl lg:text-7xl leading-tight">ЮГАКЦЕНТ</h1>
          <p className="mt-4 text-lg max-w-2xl text-primary-foreground/85">Агентство недвижимости в Анапе. С 2017 года помогаем находить дом, инвестицию или второй вариант для отдыха.</p>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="eyebrow">Наша история</div>
          <h2 className="mt-2 font-display text-4xl">8 лет на рынке Анапы</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">Мы начинали с одного офиса и трёх экспертов. Сегодня «ЮГАКЦЕНТ» · это команда из 18 специалистов, эксклюзивные договоры с 24 застройщиками и более 2300 закрытых сделок.</p>
          <p className="mt-3 text-muted-foreground leading-relaxed">Мы знаем каждый ЖК Анапы, каждого застройщика и все нюансы · от планировок до особенностей грунтов и розы ветров. Это даёт нашим клиентам уверенность в выборе.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[{ n: "2017", l: "год основания" }, { n: "2300+", l: "сделок" }, { n: "18", l: "экспертов" }, { n: "24", l: "застройщика" }].map(s => (
            <div key={s.l} className="bg-secondary rounded-2xl p-6">
              <div className="font-display text-4xl lg:text-5xl">{s.n}</div>
              <div className="text-sm text-muted-foreground mt-1 uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16 lg:py-24">
        <div className="container-x">
          <div className="eyebrow">Команда</div>
          <h2 className="mt-2 font-display text-4xl">Эксперты, которые знают Анапу</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(m => (
              <div key={m.name} className="card-premium p-5 text-center">
                <img src={m.avatar} alt={m.name} className="w-20 h-20 rounded-full mx-auto object-cover" />
                <div className="mt-4 font-display text-xl">{m.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <div className="eyebrow">Как мы работаем</div>
        <h2 className="mt-2 font-display text-4xl">Процесс под ключ</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(s => (
            <div key={s.n} className="card-premium p-6">
              <div className="font-display text-5xl text-[hsl(var(--brand))]">{s.n}</div>
              <div className="mt-3 font-medium text-lg">{s.t}</div>
              <div className="text-sm text-muted-foreground mt-2">{s.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-secondary rounded-2xl p-10 lg:p-14 text-center">
          <h3 className="font-display text-3xl lg:text-4xl">Готовы помочь с подбором</h3>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Расскажите о задаче · пришлём подборку и сравнительный анализ.</p>
          <Button asChild size="lg" className="mt-6 bg-primary"><Link to="/contacts">Связаться с нами</Link></Button>
        </div>
      </section>
    </div>
  );
}
