import { useState } from "react";
import { useStore } from "@/store/useStore";
import type { Lead } from "@/data/mock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/lib/format";
import { Phone, MessageCircle, User, Calendar, Target } from "lucide-react";

const statusColors: Record<Lead["status"], string> = {
  "новая": "bg-blue-500/15 text-blue-700",
  "в работе": "bg-amber-500/15 text-amber-700",
  "назначен звонок": "bg-purple-500/15 text-purple-700",
  "закрыта": "bg-emerald-500/15 text-emerald-700",
};

export default function AdminLeads() {
  const leads = useStore(s => s.leads);
  const setStatus = useStore(s => s.setLeadStatus);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? leads : leads.filter(l => l.status === filter);

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="eyebrow">CRM</div>
          <h1 className="mt-2 font-display text-3xl lg:text-4xl">Заявки <span className="text-muted-foreground text-2xl">({leads.length})</span></h1>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="новая">Новые</SelectItem>
            <SelectItem value="в работе">В работе</SelectItem>
            <SelectItem value="назначен звонок">Назначен звонок</SelectItem>
            <SelectItem value="закрыта">Закрыта</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 card-premium overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Клиент</TableHead><TableHead>Телефон</TableHead><TableHead>Контекст</TableHead><TableHead>Источник</TableHead><TableHead>Дата</TableHead><TableHead>Статус</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(l => (
              <TableRow key={l.id} onClick={() => setSelected(l)} className="cursor-pointer hover:bg-muted/40">
                <TableCell className="font-medium">{l.name}</TableCell>
                <TableCell className="text-sm">{l.phone}</TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{l.context}</TableCell>
                <TableCell><Badge variant="outline" className="font-normal capitalize">{l.source}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(l.createdAt)}</TableCell>
                <TableCell><span className={`inline-flex rounded-full px-2.5 py-1 text-xs capitalize ${statusColors[l.status]}`}>{l.status}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {selected && (
            <>
              <SheetHeader><SheetTitle>Заявка #{selected.id}</SheetTitle></SheetHeader>
              <div className="mt-6 space-y-5">
                <Field icon={User} label="Клиент" value={selected.name} />
                <Field icon={Phone} label="Телефон" value={selected.phone} />
                <Field icon={Target} label="Бюджет" value={selected.budget ?? "·"} />
                <Field icon={Target} label="Цель" value={selected.purpose ?? "·"} />
                <Field icon={MessageCircle} label="Контекст" value={selected.context ?? "·"} />
                <Field icon={Calendar} label="Создана" value={formatDate(selected.createdAt)} />
                {selected.comment && <div><div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Комментарий</div><div className="bg-muted/50 rounded-lg p-3 text-sm">{selected.comment}</div></div>}
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Статус</div>
                  <Select value={selected.status} onValueChange={(v: Lead["status"]) => { setStatus(selected.id, v); setSelected({ ...selected, status: v }); }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="новая">Новая</SelectItem><SelectItem value="в работе">В работе</SelectItem>
                      <SelectItem value="назначен звонок">Назначен звонок</SelectItem><SelectItem value="закрыта">Закрыта</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button asChild className="w-full bg-primary"><a href={`tel:${selected.phone}`}>Позвонить</a></Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Field({ icon: I, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-secondary grid place-items-center shrink-0"><I className="w-4 h-4" /></div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 break-words">{value}</div>
      </div>
    </div>
  );
}
