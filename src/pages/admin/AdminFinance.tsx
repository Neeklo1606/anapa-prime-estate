import { Wallet, TrendingUp, ArrowDownRight, ArrowUpRight } from "lucide-react";

const tx = [
  { d: "12.06", t: "Комиссия · D-2401", c: "Артём Соколов", amount: 282000, kind: "in" },
  { d: "10.06", t: "Зарплата · Мария К.", c: "Расход", amount: -85000, kind: "out" },
  { d: "08.06", t: "Реклама Yandex", c: "Маркетинг", amount: -48000, kind: "out" },
  { d: "05.06", t: "Комиссия · D-2399", c: "ООО «Витязь»", amount: 744000, kind: "in" },
  { d: "03.06", t: "Avito Pro", c: "Подписки", amount: -24000, kind: "out" },
  { d: "01.06", t: "Аренда офиса", c: "Операционка", amount: -120000, kind: "out" },
];

export default function AdminFinance() {
  const income = tx.filter(t => t.kind === "in").reduce((a, t) => a + t.amount, 0);
  const expenses = tx.filter(t => t.kind === "out").reduce((a, t) => a + Math.abs(t.amount), 0);
  return (
    <div className="p-6 lg:p-8">
      <span className="eyebrow"><Wallet className="w-3 h-3" /> Платформа</span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Финансы</h1>

      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <div className="surface p-5 bg-gradient-ink text-primary-foreground border-0">
          <div className="text-[11px] uppercase tracking-[0.12em] text-white/60">Баланс на счёте</div>
          <div className="mt-2 font-display text-3xl font-bold num">2 486 000 ₽</div>
          <div className="mt-2 inline-flex items-center gap-1 text-xs text-white/70"><TrendingUp className="w-3 h-3" /> +18% к прошлому месяцу</div>
        </div>
        <div className="surface p-5">
          <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Доход · июнь</div>
          <div className="mt-2 font-display text-3xl font-bold num text-success">+{income.toLocaleString("ru-RU")} ₽</div>
          <div className="mt-2 text-xs text-muted-foreground">{tx.filter(t => t.kind === "in").length} поступлений</div>
        </div>
        <div className="surface p-5">
          <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Расход · июнь</div>
          <div className="mt-2 font-display text-3xl font-bold num text-destructive">−{expenses.toLocaleString("ru-RU")} ₽</div>
          <div className="mt-2 text-xs text-muted-foreground">{tx.filter(t => t.kind === "out").length} операций</div>
        </div>
      </div>

      <div className="mt-6 surface overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="font-display text-lg font-semibold tracking-tight">Операции</div>
          <button className="text-xs text-muted-foreground hover:text-foreground">Экспорт</button>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {tx.map((t, i) => (
              <tr key={i} className="border-t border-border first:border-0 hover:bg-secondary/30">
                <td className="px-5 py-3 num text-muted-foreground w-20">{t.d}</td>
                <td className="px-5 py-3 font-medium">{t.t}</td>
                <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">{t.c}</td>
                <td className="px-5 py-3 text-right">
                  <span className={`inline-flex items-center gap-1 font-medium num ${t.kind === "in" ? "text-success" : "text-destructive"}`}>
                    {t.kind === "in" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {t.amount > 0 ? "+" : ""}{t.amount.toLocaleString("ru-RU")} ₽
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
