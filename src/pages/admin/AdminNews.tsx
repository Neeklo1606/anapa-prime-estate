import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import type { NewsItem } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/lib/format";
import { toast } from "sonner";

const empty: NewsItem = {
  id: "", slug: "", title: "", category: "Рынок", date: new Date().toISOString().slice(0, 10),
  cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  excerpt: "", content: "", seoTitle: "", seoDescription: "",
};

export default function AdminNews() {
  const news = useStore(s => s.news);
  const upsert = useStore(s => s.upsertNews);
  const remove = useStore(s => s.removeNews);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="eyebrow">Контент</div>
          <h1 className="mt-2 font-display text-3xl lg:text-4xl">Новости</h1>
        </div>
        <Button onClick={() => { setEditing({ ...empty, id: "n" + Date.now(), slug: "post-" + Date.now() }); setOpen(true); }} className="bg-primary gap-1.5"><Plus className="w-4 h-4" /> Новая статья</Button>
      </div>

      <div className="mt-6 card-premium overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead></TableHead><TableHead>Заголовок</TableHead><TableHead>Категория</TableHead><TableHead>Дата</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>
            {news.map(n => (
              <TableRow key={n.id}>
                <TableCell><img src={n.cover} alt="" className="w-12 h-12 rounded-lg object-cover" /></TableCell>
                <TableCell className="font-medium max-w-md">{n.title}</TableCell>
                <TableCell><Badge variant="secondary" className="font-normal">{n.category}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(n.date)}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => { setEditing(n); setOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => { remove(n.id); toast.success("Удалено"); }}><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Статья</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4 mt-2">
              <div className="space-y-1.5"><Label>Заголовок</Label><Input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>Категория</Label>
                  <Select value={editing.category} onValueChange={(v: NewsItem["category"]) => setEditing({ ...editing, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Рынок">Рынок</SelectItem><SelectItem value="Ипотека">Ипотека</SelectItem>
                      <SelectItem value="Новостройки">Новостройки</SelectItem><SelectItem value="Инвестиции">Инвестиции</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5"><Label>Дата</Label><Input type="date" value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} /></div>
              </div>
              <div className="space-y-1.5"><Label>Обложка (URL)</Label><Input value={editing.cover} onChange={e => setEditing({ ...editing, cover: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Превью</Label><Textarea rows={2} value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Контент</Label><Textarea rows={6} value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })} /></div>
              <div className="pt-4 border-t border-border space-y-3">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">SEO</div>
                <div className="space-y-1.5"><Label>Meta Title</Label><Input value={editing.seoTitle} onChange={e => setEditing({ ...editing, seoTitle: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Meta Description</Label><Textarea rows={2} value={editing.seoDescription} onChange={e => setEditing({ ...editing, seoDescription: e.target.value })} /></div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
            <Button onClick={() => { if (editing) { upsert(editing); toast.success("Сохранено"); setOpen(false); } }} className="bg-primary">Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
