import { useState } from "react";
import { Plus, Pencil, Archive, Search } from "lucide-react";
import { useStore } from "@/store/useStore";
import type { Property } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPriceShort } from "@/lib/format";
import { toast } from "sonner";

const empty: Property = {
  id: "", complexId: "c1", type: "квартира", title: "", rooms: 1, area: 40, floor: 5, totalFloors: 12,
  price: 5_000_000, district: "Центр", address: "г. Анапа", deadline: "II квартал 2026", status: "в продаже",
  finishing: "чистовая", photos: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"],
  description: "", badges: [],
};

export default function AdminProperties() {
  const properties = useStore(s => s.properties);
  const complexes = useStore(s => s.complexes);
  const upsert = useStore(s => s.upsertProperty);
  const remove = useStore(s => s.removeProperty);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Property | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = properties.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));

  const openNew = () => { setEditing({ ...empty, id: "p" + Date.now() }); setOpen(true); };
  const openEdit = (p: Property) => { setEditing(p); setOpen(true); };
  const save = () => {
    if (!editing) return;
    upsert(editing);
    toast.success("Объект сохранён");
    setOpen(false);
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="eyebrow">Управление</div>
          <h1 className="mt-2 font-display text-3xl lg:text-4xl">Объекты <span className="text-muted-foreground text-2xl">({properties.length})</span></h1>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Поиск объектов" value={q} onChange={e => setQ(e.target.value)} className="pl-9 w-64" />
          </div>
          <Button onClick={openNew} className="bg-primary gap-1.5"><Plus className="w-4 h-4" /> Добавить</Button>
        </div>
      </div>

      <div className="mt-6 card-premium overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>ЖК</TableHead>
              <TableHead>Площадь</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-medium max-w-xs truncate">{p.title}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{complexes.find(c => c.id === p.complexId)?.name ?? "·"}</TableCell>
                <TableCell>{p.area} м²</TableCell>
                <TableCell className="font-display">{formatPriceShort(p.price)}</TableCell>
                <TableCell><Badge variant="secondary" className="font-normal capitalize">{p.status}</Badge></TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => { remove(p.id); toast.success("Объект архивирован"); }}><Archive className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id && properties.some(p => p.id === editing.id) ? "Редактировать объект" : "Новый объект"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div className="sm:col-span-2 space-y-1.5"><Label>Название</Label><Input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>ЖК</Label>
                <Select value={editing.complexId} onValueChange={v => setEditing({ ...editing, complexId: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{complexes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Цена (₽)</Label><Input type="number" value={editing.price} onChange={e => setEditing({ ...editing, price: +e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Площадь (м²)</Label><Input type="number" value={editing.area} onChange={e => setEditing({ ...editing, area: +e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Комнаты</Label><Input type="number" value={editing.rooms} onChange={e => setEditing({ ...editing, rooms: +e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Этаж</Label><Input type="number" value={editing.floor} onChange={e => setEditing({ ...editing, floor: +e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Всего этажей</Label><Input type="number" value={editing.totalFloors} onChange={e => setEditing({ ...editing, totalFloors: +e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Статус</Label>
                <Select value={editing.status} onValueChange={(v: Property["status"]) => setEditing({ ...editing, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="в продаже">В продаже</SelectItem>
                    <SelectItem value="скоро">Скоро</SelectItem>
                    <SelectItem value="распродано">Распродано</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Срок сдачи</Label><Input value={editing.deadline} onChange={e => setEditing({ ...editing, deadline: e.target.value })} /></div>
              <div className="sm:col-span-2 space-y-1.5"><Label>Адрес</Label><Input value={editing.address} onChange={e => setEditing({ ...editing, address: e.target.value })} /></div>
              <div className="sm:col-span-2 space-y-1.5"><Label>Описание</Label><Textarea rows={4} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} /></div>
              <div className="sm:col-span-2 space-y-1.5"><Label>Фото (URL)</Label><Input value={editing.photos[0]} onChange={e => setEditing({ ...editing, photos: [e.target.value, ...editing.photos.slice(1)] })} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
            <Button onClick={save} className="bg-primary">Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
