import { Youtube, Send, Instagram, MessageCircle } from "lucide-react";

type Variant = "chip" | "ghost" | "solid";

const socials = [
  { label: "YouTube", href: "https://youtube.com/@ugakcent", icon: <Youtube className="w-4 h-4" /> },
  { label: "Telegram", href: "https://t.me/ugakcent", icon: <Send className="w-4 h-4" /> },
  { label: "Instagram", href: "https://instagram.com/ugakcent", icon: <Instagram className="w-4 h-4" /> },
  { label: "ВКонтакте", href: "https://vk.com/ugakcent", text: "VK" },
  { label: "WhatsApp", href: "https://wa.me/78001234567", icon: <MessageCircle className="w-4 h-4" /> },
  { label: "Дзен", href: "https://dzen.ru/ugakcent", text: "Z" },
  { label: "RuTube", href: "https://rutube.ru/channel/ugakcent", text: "R" },
];

export default function SocialIcons({ variant = "ghost", size = "md" }: { variant?: Variant; size?: "sm" | "md" }) {
  const box =
    size === "sm" ? "w-8 h-8 text-[11px]" : "w-9 h-9 text-[12px]";
  const style =
    variant === "solid"
      ? "bg-white text-foreground border border-border hover:border-foreground/25 hover:shadow-sm"
      : variant === "chip"
      ? "bg-secondary text-foreground/70 hover:text-foreground hover:bg-secondary/80"
      : "text-foreground/60 hover:text-foreground hover:bg-secondary";
  return (
    <div className="flex items-center gap-1.5">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          title={s.label}
          className={`grid place-items-center rounded-full transition-colors font-semibold ${box} ${style}`}
        >
          {s.icon ?? <span>{s.text}</span>}
        </a>
      ))}
    </div>
  );
}
