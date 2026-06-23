import { BookOpen, FileText, Search } from "lucide-react";

const articles = [
  { cat: "Регламенты", title: "Скрипт первого звонка клиенту", views: 284 },
  { cat: "Регламенты", title: "Проверка юридической чистоты объекта", views: 198 },
  { cat: "Ипотека", title: "Семейная ипотека 2026: условия Сбербанка", views: 421 },
  { cat: "Ипотека", title: "IT-ипотека: чек-лист документов", views: 156 },
  { cat: "Налоги", title: "Налоговый вычет при покупке: пошагово", views: 312 },
  { cat: "Продажи", title: "Возражения клиента: 12 ответов", views: 524 },
  { cat: "Продажи", title: "Презентация ЖК на показе", views: 268 },
  { cat: "Маркетинг", title: "Размещение на Avito: правила платформы", views: 184 },
];

const cats = ["Все", "Регламенты", "Ипотека", "Налоги", "Продажи", "Маркетинг"];

export default function AdminKnowledge() {
  return (
    <div className="p-6 lg:p-8">
      <div>
        <span className="eyebrow"><BookOpen className="w-3 h-3" /> Платформа</span>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">База знаний</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Регламенты, скрипты, инструкции и обучающие материалы агентства.</p>
      </div>

      <div className="mt-6 flex items-center gap-3 flex-wrap">
        <div className="surface flex items-center gap-2 px-3 h-10 flex-1 min-w-[260px] max-w-md">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input placeholder="Найти статью..." className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {cats.map((c, i) => (
            <button key={c} className={`h-9 px-3 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors ${i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map(a => (
          <div key={a.title} className="surface p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[hsl(var(--brand))]" />
              <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{a.cat}</span>
            </div>
            <div className="mt-3 font-display text-base font-semibold tracking-tight leading-snug">{a.title}</div>
            <div className="mt-4 pt-3 border-t border-border text-[11px] text-muted-foreground num">{a.views} просмотров</div>
          </div>
        ))}
      </div>
    </div>
  );
}
