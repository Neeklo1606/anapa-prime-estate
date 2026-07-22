import { TrendingUp, TrendingDown, BarChart3, MapPin, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const districts = [
  { name: "Высокий берег", price: 184500, delta: 12.4, trend: "up" },
  { name: "Пионерский проспект", price: 142800, delta: 8.1, trend: "up" },
  { name: "Витязево", price: 128200, delta: 5.6, trend: "up" },
  { name: "Центр", price: 165400, delta: 2.8, trend: "up" },
  { name: "Джемете", price: 118900, delta: -1.2, trend: "down" },
  { name: "Сукко", price: 102300, delta: 14.8, trend: "up" },
];

export default function Analytics() {
  return (
    <div>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-x py-12 lg:py-16">
          <span className="eyebrow">Аналитика</span>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl font-bold tracking-tight">Рынок недвижимости Анапы</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Актуальные данные по ценам, ликвидности и доходности. Обновляется ежедневно агрегатором ЮГАКЦЕНТ.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l: "Средняя цена м²", v: "148 200 ₽", d: "+12.4%", up: true },
              { l: "Активных объектов", v: "1 487", d: "+86 за нед.", up: true },
              { l: "Средняя ликвидность", v: "47 дней", d: "−6 дней", up: true },
              { l: "Доходность аренды", v: "8.6% / год", d: "+0.4 п.п.", up: true },
            ].map(s => (
              <div key={s.l} className="surface p-5">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{s.l}</div>
                <div className="mt-2 font-display text-3xl font-bold num tracking-tight">{s.v}</div>
                <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${s.up ? "text-success" : "text-destructive"}`}>
                  {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {s.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8">
          <div className="surface p-7">
            <div className="flex items-center justify-between">
              <div>
                <div className="eyebrow"><BarChart3 className="w-3 h-3" /> Цена м² по районам</div>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">Динамика за 12 месяцев</h2>
              </div>
              <div className="chip">12М</div>
            </div>
            <div className="mt-8 space-y-4">
              {districts.map(d => {
                const max = Math.max(...districts.map(x => x.price));
                const pct = (d.price / max) * 100;
                return (
                  <div key={d.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-muted-foreground" />{d.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="num font-medium">{d.price.toLocaleString("ru-RU")} ₽</span>
                        <span className={`text-xs num ${d.trend === "up" ? "text-success" : "text-destructive"}`}>
                          {d.trend === "up" ? "+" : ""}{d.delta}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[hsl(var(--brand))] to-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="surface p-6 bg-gradient-ink text-primary-foreground border-0">
              <div className="text-[11px] uppercase tracking-[0.12em] text-white/60">Прогноз</div>
              <div className="mt-3 font-display text-4xl font-bold num">+18%</div>
              <div className="mt-1 text-sm text-white/70">рост цен в Анапе за 2026 год по модели ЮГАКЦЕНТ</div>
              <div className="mt-5 pt-5 border-t border-white/10 text-xs text-white/60">
                Обновлено · сегодня · {new Date().toLocaleDateString("ru-RU")}
              </div>
            </div>
            <div className="surface p-6">
              <div className="eyebrow"><Building2 className="w-3 h-3" /> Топ-сегмент</div>
              <div className="mt-3 font-display text-2xl font-bold tracking-tight">Апартаменты у моря</div>
              <p className="mt-2 text-sm text-muted-foreground">Самый ликвидный сегмент: средний срок продажи · 32 дня, доходность аренды 11.2%.</p>
              <Link to="/catalog" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--brand))]">Смотреть объекты →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
