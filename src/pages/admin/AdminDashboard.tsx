import { Building, Home, Inbox, MessageSquare, TrendingUp, Activity } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatDate } from "@/lib/format";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const { leads, chats, complexes, properties, news } = useStore();
  const newLeads = leads.filter(l => l.status === "новая").length;
  const unreadChats = chats.reduce((a, c) => a + c.unread, 0);

  const stats = [
    { icon: Home, label: "Объектов", value: properties.length, hint: "+3 за неделю", to: "/admin/properties" },
    { icon: Building, label: "ЖК", value: complexes.length, hint: "+1 за месяц", to: "/admin/complexes" },
    { icon: Inbox, label: "Новые заявки", value: newLeads, hint: `${leads.length} всего`, to: "/admin/leads" },
    { icon: MessageSquare, label: "Чаты Avito", value: unreadChats, hint: `${chats.length} диалогов`, to: "/admin/chats" },
  ];

  const integrations = [
    { name: "Avito API", status: "ожидает доступы", color: "bg-amber-500/15 text-amber-700" },
    { name: "TonLab CRM", status: "ожидает документацию", color: "bg-amber-500/15 text-amber-700" },
    { name: "TrendAgent feeds", status: "ожидает фид", color: "bg-amber-500/15 text-amber-700" },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl">
      <div>
        <div className="eyebrow">Админ-панель</div>
        <h1 className="mt-2 font-display text-3xl lg:text-4xl">Дэшборд</h1>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Link to={s.to} key={s.label} className="card-premium p-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-secondary grid place-items-center"><s.icon className="w-5 h-5" /></div>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <div className="mt-4 font-display text-3xl">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
            <div className="mt-2 text-xs text-muted-foreground">{s.hint}</div>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="card-premium p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Последние заявки</h2>
            <Link to="/admin/leads" className="text-sm text-primary hover:underline">Все →</Link>
          </div>
          <div className="mt-4 divide-y divide-border">
            {leads.slice(0, 5).map(l => (
              <div key={l.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{l.name} · {l.phone}</div>
                  <div className="text-xs text-muted-foreground truncate">{l.context} · {l.source}</div>
                </div>
                <Badge variant="secondary" className="font-normal capitalize">{l.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Последние новости</h2>
            <Link to="/admin/news" className="text-sm text-primary hover:underline">Все →</Link>
          </div>
          <div className="mt-4 divide-y divide-border">
            {news.slice(0, 5).map(n => (
              <div key={n.id} className="py-3 flex items-start gap-3">
                <img src={n.cover} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium line-clamp-2">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{formatDate(n.date)} · {n.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 card-premium p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Статусы интеграций</h2>
          <Link to="/admin/integrations" className="text-sm text-primary hover:underline">Настроить →</Link>
        </div>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          {integrations.map(i => (
            <div key={i.name} className="border border-border rounded-xl p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-600" />
                <div className="font-medium">{i.name}</div>
              </div>
              <div className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs ${i.color}`}>{i.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
