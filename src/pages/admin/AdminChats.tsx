import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function AdminChats() {
  const chats = useStore(s => s.chats);
  const reply = useStore(s => s.replyChat);
  const [activeId, setActiveId] = useState(chats[0]?.id ?? "");
  const [text, setText] = useState("");
  const active = chats.find(c => c.id === activeId);

  const send = () => {
    if (!text.trim() || !active) return;
    reply(active.id, text);
    setText("");
  };

  return (
    <div className="p-6 lg:p-10">
      <div>
        <div className="eyebrow">Avito</div>
        <h1 className="mt-2 font-display text-3xl lg:text-4xl">Чаты Avito</h1>
      </div>

      <div className="mt-6 card-premium overflow-hidden grid md:grid-cols-[300px_1fr] h-[600px]">
        <div className="border-r border-border overflow-y-auto">
          {chats.map(c => (
            <button key={c.id} onClick={() => setActiveId(c.id)}
              className={`w-full text-left p-4 border-b border-border flex gap-3 hover:bg-muted/40 ${activeId === c.id ? "bg-secondary/60" : ""}`}>
              <img src={c.avatar} alt={c.client} className="w-11 h-11 rounded-full shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium truncate">{c.client}</div>
                  {c.unread > 0 && <span className="text-[10px] bg-brand text-brand-foreground rounded-full px-1.5 min-w-[1.1rem] text-center">{c.unread}</span>}
                </div>
                <div className="text-xs text-muted-foreground truncate">{c.property}</div>
                <div className="text-xs truncate mt-1">{c.lastMessage}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col min-h-0">
          {active ? (
            <>
              <div className="p-4 border-b border-border flex items-center gap-3">
                <img src={active.avatar} alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-medium">{active.client}</div>
                  <div className="text-xs text-muted-foreground">{active.property}</div>
                </div>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-secondary capitalize">{active.status}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/20">
                {active.messages.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "agent" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border rounded-bl-sm"}`}>
                      {m.text}
                      <div className={`text-[10px] mt-1 ${m.from === "agent" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border flex gap-2">
                <Input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Напишите ответ…" />
                <Button onClick={send} className="bg-primary gap-1.5"><Send className="w-4 h-4" /> Отправить</Button>
              </div>
            </>
          ) : <div className="grid place-items-center h-full text-muted-foreground">Выберите чат</div>}
        </div>
      </div>
    </div>
  );
}
