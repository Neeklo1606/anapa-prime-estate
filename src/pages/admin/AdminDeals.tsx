import { Handshake, TrendingUp, Calendar, CheckCircle2, Clock } from "lucide-react";

const deals = [
  { id: "D-2401", client: "Артём Соколов", object: "ЖК «Морская волна», 2к", price: "9 400 000", stage: "Договор", commission: "282 000", date: "12.06.2026", status: "active" },
  { id: "D-2400", client: "Елена Богданова", object: "ЖК «Семейный», студия", price: "5 200 000", stage: "Регистрация", commission: "156 000", date: "10.06.2026", status: "active" },
  { id: "D-2399", client: "ООО «Витязь»", object: "Коммерция, Центр", price: "24 800 000", stage: "Закрыта", commission: "744 000", date: "05.06.2026", status: "done" },
  { id: "D-2398", client: "Игорь Петров", object: "Высокий берег, 3к", price: "18 600 000", stage: "Ипотека", commission: "558 000", date: "03.06.2026", status: "active" },
  { id: "D-2397", client: "Анна Морозова", object: "Витязево, апарт", price: "7 350 000", stage: "Закрыта", commission: "220 500", date: "28.05.2026", status: "done" },
];

export default function AdminDeals() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <span className="eyebrow"><Handshake className="w-3 h-3" /> Продажи</span>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Сделки</h1>
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-4 gap-4">
        {[
          { l: "Активных", v: "12", d: "+3", icon: Clock },
          { l: "Закрыто в мае", v: "8", d: "+2", icon: CheckCircle2 },
          { l: "Оборот мес.", v: "94.6 млн", d: "+18%", icon: TrendingUp },
          { l: "Комиссия", v: "2.84 млн", d: "+12%", icon: Calendar },
        ].map(s => (
          <div key={s.l} className="surface p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{s.l}</span>
              <s.icon className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold num">{s.v}</div>
            <div className="text-xs text-success num mt-1">{s.d}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">ID</th>
              <th className="text-left px-4 py-3 font-medium">Клиент</th>
              <th className="text-left px-4 py-3 font-medium">Объект</th>
              <th className="text-right px-4 py-3 font-medium">Цена, ₽</th>
              <th className="text-left px-4 py-3 font-medium">Стадия</th>
              <th className="text-right px-4 py-3 font-medium">Комиссия</th>
              <th className="text-left px-4 py-3 font-medium">Дата</th>
            </tr>
          </thead>
          <tbody>
            {deals.map(d => (
              <tr key={d.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 num font-medium">{d.id}</td>
                <td className="px-4 py-3">{d.client}</td>
                <td className="px-4 py-3 text-muted-foreground">{d.object}</td>
                <td className="px-4 py-3 text-right num font-medium">{d.price}</td>
                <td className="px-4 py-3">
                  <span className={`chip text-[11px] ${d.status === "done" ? "bg-success/10 text-success border-success/20" : ""}`}>{d.stage}</span>
                </td>
                <td className="px-4 py-3 text-right num text-[hsl(var(--brand))] font-medium">{d.commission}</td>
                <td className="px-4 py-3 text-muted-foreground num">{d.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
