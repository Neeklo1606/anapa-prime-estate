import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  variant?: "default" | "compact" | "inline";
  context?: string;
  defaultPurpose?: string;
  title?: string;
  subtitle?: string;
}

export default function LeadForm({ variant = "default", context, defaultPurpose, title, subtitle }: Props) {
  const addLead = useStore(s => s.addLead);
  const [data, setData] = useState({ name: "", phone: "", budget: "", purpose: defaultPurpose ?? "", comment: "" });
  const [success, setSuccess] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.phone) {
      toast.error("Заполните имя и телефон");
      return;
    }
    addLead({ ...data, source: "сайт", context });
    setSuccess(true);
    toast.success("Заявка отправлена! Мы перезвоним в течение 15 минут.");
    setTimeout(() => { setSuccess(false); setData({ name: "", phone: "", budget: "", purpose: defaultPurpose ?? "", comment: "" }); }, 4000);
  };

  if (success) {
    return (
      <div className="rounded-2xl bg-success/10 border border-success/20 p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-success text-success-foreground mx-auto grid place-items-center mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="font-display text-2xl">Заявка принята</h3>
        <p className="mt-2 text-sm text-muted-foreground">Наш специалист свяжется с вами в ближайшие 15 минут.</p>
      </div>
    );
  }

  const isInline = variant === "inline";

  return (
    <form onSubmit={submit} className={isInline ? "grid sm:grid-cols-4 gap-3" : "space-y-4"}>
      {title && <div><h3 className="font-display text-2xl lg:text-3xl">{title}</h3>{subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}</div>}
      <div className={isInline ? "" : "space-y-1.5"}>
        {!isInline && <Label htmlFor="name">Ваше имя</Label>}
        <Input id="name" placeholder="Имя" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} required />
      </div>
      <div className={isInline ? "" : "space-y-1.5"}>
        {!isInline && <Label htmlFor="phone">Телефон</Label>}
        <Input id="phone" type="tel" placeholder="+7 ___ ___-__-__" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} required />
      </div>
      {!isInline && (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="budget">Бюджет</Label>
              <Input id="budget" placeholder="например, до 8 млн" value={data.budget} onChange={e => setData({ ...data, budget: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="purpose">Цель покупки</Label>
              <Input id="purpose" placeholder="для семьи, инвестиции…" value={data.purpose} onChange={e => setData({ ...data, purpose: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="comment">Комментарий</Label>
            <Textarea id="comment" rows={3} placeholder="Расскажите подробнее о ваших пожеланиях" value={data.comment} onChange={e => setData({ ...data, comment: e.target.value })} />
          </div>
        </>
      )}
      <Button type="submit" className={`bg-primary ${isInline ? "sm:col-span-2" : "w-full"}`} size="lg">
        Отправить заявку
      </Button>
      {!isInline && <p className="text-[11px] text-muted-foreground">Отправляя форму, вы соглашаетесь на обработку персональных данных.</p>}
    </form>
  );
}
