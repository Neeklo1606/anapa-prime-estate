import { Users, Phone, Mail, MessageSquare, MoreHorizontal } from "lucide-react";

const stages = [
  { key: "new", label: "Новые", color: "bg-blue-500" },
  { key: "qual", label: "Квалификация", color: "bg-violet-500" },
  { key: "show", label: "Показ", color: "bg-amber-500" },
  { key: "deal", label: "Сделка", color: "bg-emerald-500" },
];

const sample = [
  { stage: "new", name: "Артём Соколов", tag: "Витязево · 2к", value: "9.4 млн", channel: "Сайт" },
  { stage: "new", name: "Ольга К.", tag: "Студия · инвестиции", value: "5.2 млн", channel: "Avito" },
  { stage: "qual", name: "Игорь Петров", tag: "ЖК «Семейный»", value: "12.8 млн", channel: "Сайт" },
  { stage: "qual", name: "Анна Морозова", tag: "Коммерция · центр", value: "24 млн", channel: "Telegram" },
  { stage: "show", name: "Дмитрий Лаптев", tag: "Высокий берег", value: "18.6 млн", channel: "Звонок" },
  { stage: "deal", name: "Елена Б.", tag: "ЖК «Морская»", value: "8.1 млн", channel: "Сайт" },
];

export default function AdminCRM() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <span className="eyebrow"><Users className="w-3 h-3" /> Продажи</span>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">CRM · Воронка</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Текущие клиенты по стадиям. Обновлено только что.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="surface px-3 h-9 text-sm">Сегодня</button>
          <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium">+ Контакт</button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stages.map(s => {
          const items = sample.filter(x => x.stage === s.key);
          const total = items.reduce((a, c) => a + parseFloat(c.value), 0);
          return (
            <div key={s.key} className="rounded-2xl bg-secondary/50 p-3 min-h-[400px]">
              <div className="flex items-center justify-between px-2 py-1.5">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                  <span className="font-medium text-sm">{s.label}</span>
                  <span className="text-xs text-muted-foreground num">{items.length}</span>
                </div>
                <span className="text-[11px] text-muted-foreground num">{total.toFixed(1)} млн</span>
              </div>
              <div className="mt-2 space-y-2">
                {items.map((it, i) => (
                  <div key={i} className="surface p-3 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">{it.name}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{it.tag}</div>
                      </div>
                      <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-display text-sm font-semibold num">{it.value}</span>
                      <span className="chip text-[10px] px-2 py-0.5">{it.channel}</span>
                    </div>
                    <div className="mt-3 pt-2 border-t border-border flex items-center gap-1.5 text-muted-foreground">
                      <button className="w-6 h-6 rounded grid place-items-center hover:bg-secondary"><Phone className="w-3 h-3" /></button>
                      <button className="w-6 h-6 rounded grid place-items-center hover:bg-secondary"><MessageSquare className="w-3 h-3" /></button>
                      <button className="w-6 h-6 rounded grid place-items-center hover:bg-secondary"><Mail className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
