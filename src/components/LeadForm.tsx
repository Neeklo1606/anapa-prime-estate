import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  context?: string;
}

export default function LeadForm({ context }: Props) {
  const addLead = useStore(s => s.addLead);
  const [data, setData] = useState({ name: "", phone: "" });
  const [success, setSuccess] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.phone) {
      toast.error("Заполните имя и телефон");
      return;
    }
    addLead({ ...data, budget: "", purpose: "", comment: "", source: "сайт", context });
    setSuccess(true);
    toast.success("Заявка отправлена. Мы перезвоним в течение 15 минут.");
    setTimeout(() => { setSuccess(false); setData({ name: "", phone: "" }); }, 4000);
  };

  if (success) {
    return (
      <div className="rounded-2xl bg-success/10 border border-success/20 p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-success text-success-foreground mx-auto grid place-items-center mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold">Заявка принята</h3>
        <p className="mt-1 text-sm text-muted-foreground">Свяжемся в ближайшие 15 минут.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Input
        placeholder="Имя"
        value={data.name}
        onChange={e => setData({ ...data, name: e.target.value })}
        className="h-12 rounded-lg bg-white"
        required
      />
      <Input
        type="tel"
        placeholder="+7 ___ ___-__-__"
        value={data.phone}
        onChange={e => setData({ ...data, phone: e.target.value })}
        className="h-12 rounded-lg bg-white"
        required
      />
      <Button
        type="submit"
        className="w-full h-12 rounded-xl bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90 text-white font-medium"
      >
        Отправить заявку
      </Button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Check className="w-3.5 h-3.5 text-success" />
        Сопровождение сделки · бесплатно
      </p>
    </form>
  );
}
