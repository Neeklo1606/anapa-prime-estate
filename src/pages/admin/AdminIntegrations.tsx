import { Activity, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const integrations = [
  {
    name: "Avito API",
    description: "Импорт объявлений и чатов с Avito, автоответы, синхронизация цен.",
    status: "ожидает доступы", color: "amber",
    endpoint: "https://api.avito.ru/messenger/v2",
    fields: [{ key: "client_id", label: "Client ID" }, { key: "client_secret", label: "Client Secret" }],
    lastSync: "·",
  },
  {
    name: "TonLab CRM",
    description: "Двусторонняя синхронизация заявок, сделок и клиентов с TonLab.",
    status: "ожидает документацию", color: "amber",
    endpoint: "https://tonlab.example/api/v1",
    fields: [{ key: "api_token", label: "API Token" }, { key: "workspace_id", label: "Workspace ID" }],
    lastSync: "·",
  },
  {
    name: "TrendAgent feeds",
    description: "Получение XML/JSON фидов от застройщиков через TrendAgent.",
    status: "ожидает фид", color: "amber",
    endpoint: "https://feeds.trendagent.ru/yug",
    fields: [{ key: "feed_url", label: "Feed URL" }, { key: "feed_key", label: "Feed Key" }],
    lastSync: "·",
  },
];

const logs = [
  { time: "22.06 14:02", text: "Avito API · connection check failed (no credentials)", level: "warn" },
  { time: "22.06 12:30", text: "TonLab CRM · manual sync attempted, missing token", level: "warn" },
  { time: "22.06 09:15", text: "TrendAgent · waiting for feed URL", level: "info" },
  { time: "21.06 18:40", text: "Lead synced manually to Telegram bot", level: "ok" },
];

export default function AdminIntegrations() {
  return (
    <div className="p-6 lg:p-10">
      <div>
        <div className="eyebrow">Настройки</div>
        <h1 className="mt-2 font-display text-3xl lg:text-4xl">Интеграции</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Подключение внешних систем: Avito, CRM, фиды застройщиков. Заполните доступы · мы автоматически проверим и активируем интеграцию.</p>
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-5">
        {integrations.map(i => (
          <div key={i.name} className="card-premium p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl">{i.name}</h3>
              <Badge className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/15 border-0 font-normal capitalize">{i.status}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{i.description}</p>
            <div className="mt-4 space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Endpoint</Label>
                <Input value={i.endpoint} readOnly className="font-mono text-xs" />
              </div>
              {i.fields.map(f => (
                <div key={f.key} className="space-y-1.5">
                  <Label className="text-xs">{f.label}</Label>
                  <Input placeholder={`Введите ${f.label}`} />
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
              <div className="text-xs text-muted-foreground">Последняя синхронизация: {i.lastSync}</div>
              <Button size="sm" className="bg-primary">Сохранить</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 card-premium p-6">
        <h2 className="font-display text-2xl flex items-center gap-2"><Activity className="w-5 h-5" /> Лог синхронизаций</h2>
        <div className="mt-4 divide-y divide-border">
          {logs.map((l, i) => (
            <div key={i} className="py-3 flex items-center gap-3 text-sm">
              {l.level === "ok" ? <CheckCircle2 className="w-4 h-4 text-success shrink-0" /> :
                l.level === "warn" ? <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" /> :
                <Activity className="w-4 h-4 text-muted-foreground shrink-0" />}
              <span className="text-xs text-muted-foreground tabular-nums">{l.time}</span>
              <span className="text-foreground">{l.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
