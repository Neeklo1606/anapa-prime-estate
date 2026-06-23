import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { useStore } from "@/store/useStore";
import type { Complex } from "@/data/mock";
import { DISTRICTS } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPriceShort } from "@/lib/format";
import { toast } from "sonner";

const empty: Complex = {
  id: "", slug: "", name: "", district: "Центр", priceFrom: 5_000_000, deadline: "II квартал 2026",
  status: "в продаже", badges: [], cover: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  gallery: [], description: "", advantages: [], infrastructure: [], class: "комфорт", floors: 12, buildings: 1,
};

export default function AdminComplexes() {
  const complexes = useStore(s => s.complexes);
  const upsert = useStore(s => s.upsertComplex);
  const [editing, setEditing] = useState<Complex | null>(null);
  const [open, setOpen] = useState(false);

  const openNew = () => { setEditing({ ...empty, id: "c" + Date.now(), slug: "new-" + Date.now() }); setOpen(true); };

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="eyebrow">Управление</div>
          <h1 className="mt-2 font-display text-3xl lg:text-4xl">Жилые комплексы <span className="text-muted-foreground text-2xl">({complexes.length})</span></h1>
        </div>
        <Button onClick={openNew} className="bg-primary gap-1.5"><Plus className="w-4 h-4" /> Добавить ЖК</Button>
      </div>

      <div className="mt-6 card-premium overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Район</TableHead>
              <TableHead>Цена от</TableHead>
              <TableHead>Сдача</TableHead>
              <TableHead>Класс</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complexes.map(c => (
              <TableRow key={c.id}>
                <TableCell><img src={c.cover} alt="" className="w-12 h-12 rounded-lg object-cover" /></TableCell>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-muted-foreground">{c.district}</TableCell>
                <TableCell className="font-display">{formatPriceShort(c.priceFrom)}</TableCell>
                <TableCell className="text-sm">{c.deadline}</TableCell>
                <TableCell><Badge variant="secondary" className="font-normal capitalize">{c.class}</Badge></TableCell>
                <TableCell><Button size="icon" variant="ghost" onClick={() => { setEditing(c); setOpen(true); }}><Pencil className="w-4 h-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Редактировать ЖК</DialogTitle></DialogHeader>
          {editing && (
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div className="sm:col-span-2 space-y-1.5"><Label>Название</Label><Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Район</Label>
                <Select value={editing.district} onValueChange={(v: typeof editing.district) => setEditing({ ...editing, district: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{DISTRICTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Класс</Label>
                <Select value={editing.class} onValueChange={(v: Complex["class"]) => setEditing({ ...editing, class: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="комфорт">Комфорт</SelectItem>
                    <SelectItem value="бизнес">Бизнес</SelectItem>
                    <SelectItem value="премиум">Премиум</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Цена от (₽)</Label><Input type="number" value={editing.priceFrom} onChange={e => setEditing({ ...editing, priceFrom: +e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Срок сдачи</Label><Input value={editing.deadline} onChange={e => setEditing({ ...editing, deadline: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Этажность</Label><Input type="number" value={editing.floors} onChange={e => setEditing({ ...editing, floors: +e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Корпуса</Label><Input type="number" value={editing.buildings} onChange={e => setEditing({ ...editing, buildings: +e.target.value })} /></div>
              <div className="sm:col-span-2 space-y-1.5"><Label>Бейджи (через запятую)</Label>
                <Input value={editing.badges.join(", ")} onChange={e => setEditing({ ...editing, badges: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} /></div>
              <div className="sm:col-span-2 space-y-1.5"><Label>Описание</Label><Textarea rows={4} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} /></div>
              <div className="sm:col-span-2 space-y-1.5"><Label>Обложка (URL)</Label><Input value={editing.cover} onChange={e => setEditing({ ...editing, cover: e.target.value })} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
            <Button onClick={() => { if (editing) { upsert(editing); toast.success("ЖК сохранён"); setOpen(false); }}} className="bg-primary">Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
