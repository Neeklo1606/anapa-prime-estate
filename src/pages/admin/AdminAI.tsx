import { Sparkles, FileText, MessageSquare, BarChart3, Briefcase, Search, Zap, Play, Settings } from "lucide-react";

const agents = [
  {
    key: "seo", icon: Search, name: "AI SEO",
    desc: "Генерирует мета-теги, заголовки и SEO-описания для карточек ЖК и объектов.",
    status: "active", runs: 342, accent: "from-blue-500 to-indigo-600",
  },
  {
    key: "content", icon: FileText, name: "AI Контент",
    desc: "Пишет статьи в журнал, описания ЖК, посты в соцсети в стиле бренда.",
    status: "active", runs: 128, accent: "from-violet-500 to-purple-600",
  },
  {
    key: "avito", icon: MessageSquare, name: "AI Авито",
    desc: "Автоответы на запросы с Авито 24/7, квалификация лидов, передача в CRM.",
    status: "active", runs: 1284, accent: "from-emerald-500 to-teal-600",
  },
  {
    key: "analytics", icon: BarChart3, name: "AI Аналитик",
    desc: "Считает доходность, прогнозирует цены, формирует отчёты по районам.",
    status: "beta", runs: 64, accent: "from-amber-500 to-orange-600",
  },
  {
    key: "exec", icon: Briefcase, name: "AI Ассистент руководителя",
    desc: "Ежедневная сводка по сделкам, лидам, плану. Алерты по аномалиям.",
    status: "beta", runs: 28, accent: "from-rose-500 to-pink-600",
  },
];

export default function AdminAI() {
  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="eyebrow"><Sparkles className="w-3 h-3" /> Платформа · AI</span>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">AI Агенты</h1>
          <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
            Пять автономных агентов автоматизируют SEO, контент, ответы клиентам, аналитику и операционное управление.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="surface px-3 h-9 inline-flex items-center gap-1.5 text-sm font-medium hover:bg-secondary transition-colors">
            <Settings className="w-3.5 h-3.5" /> Настройки
          </button>
          <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-1.5 hover:bg-primary/90">
            <Sparkles className="w-3.5 h-3.5" /> Новый агент
          </button>
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map(a => (
          <div key={a.key} className="surface p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.accent} grid place-items-center text-white shadow-md`}>
                <a.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-full ${
                a.status === "active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
              }`}>
                {a.status === "active" ? "Активен" : "Beta"}
              </span>
            </div>
            <div className="mt-4 font-display text-lg font-semibold tracking-tight">{a.name}</div>
            <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{a.desc}</p>
            <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                <span className="num font-medium text-foreground">{a.runs.toLocaleString("ru-RU")}</span> запусков
              </div>
              <button className="inline-flex items-center gap-1 text-xs font-medium text-[hsl(var(--brand))] hover:underline">
                <Play className="w-3 h-3" /> Запустить
              </button>
            </div>
          </div>
        ))}

        <div className="surface p-5 border-dashed flex flex-col items-center justify-center text-center min-h-[220px]">
          <div className="w-11 h-11 rounded-xl bg-secondary grid place-items-center">
            <Zap className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="mt-3 font-medium text-sm">Создать своего агента</div>
          <p className="mt-1 text-xs text-muted-foreground max-w-[200px]">Опишите задачу · мы соберём кастомный AI-агент под ваш процесс.</p>
        </div>
      </div>
    </div>
  );
}
