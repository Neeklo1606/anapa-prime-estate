import { create } from "zustand";
import { INITIAL_LEADS, INITIAL_CHATS, COMPLEXES, PROPERTIES, NEWS, type Lead, type AvitoChat, type Complex, type Property, type NewsItem } from "@/data/mock";

interface StoreState {
  leads: Lead[];
  chats: AvitoChat[];
  complexes: Complex[];
  properties: Property[];
  news: NewsItem[];
  addLead: (lead: Omit<Lead, "id" | "createdAt" | "status"> & { status?: Lead["status"] }) => void;
  setLeadStatus: (id: string, status: Lead["status"]) => void;
  replyChat: (id: string, text: string) => void;
  upsertProperty: (p: Property) => void;
  removeProperty: (id: string) => void;
  upsertComplex: (c: Complex) => void;
  upsertNews: (n: NewsItem) => void;
  removeNews: (id: string) => void;
}

const load = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
};
const save = (key: string, val: unknown) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* noop */ }
};

// Only persist leads + chats + admin changes
export const useStore = create<StoreState>((set, get) => ({
  leads: load("yug_leads", INITIAL_LEADS),
  chats: load("yug_chats", INITIAL_CHATS),
  complexes: load("yug_complexes", COMPLEXES),
  properties: load("yug_properties", PROPERTIES),
  news: load("yug_news", NEWS),

  addLead: (lead) => {
    const newLead: Lead = {
      ...lead,
      id: "l" + Date.now(),
      createdAt: new Date().toISOString(),
      status: lead.status ?? "новая",
    };
    const next = [newLead, ...get().leads];
    save("yug_leads", next);
    set({ leads: next });
  },
  setLeadStatus: (id, status) => {
    const next = get().leads.map(l => l.id === id ? { ...l, status } : l);
    save("yug_leads", next);
    set({ leads: next });
  },
  replyChat: (id, text) => {
    const next = get().chats.map(c => c.id === id ? {
      ...c, status: "отвечен" as const, unread: 0, lastMessage: text,
      messages: [...c.messages, { from: "agent" as const, text, time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) }],
    } : c);
    save("yug_chats", next);
    set({ chats: next });
  },
  upsertProperty: (p) => {
    const exists = get().properties.some(x => x.id === p.id);
    const next = exists ? get().properties.map(x => x.id === p.id ? p : x) : [p, ...get().properties];
    save("yug_properties", next);
    set({ properties: next });
  },
  removeProperty: (id) => {
    const next = get().properties.filter(p => p.id !== id);
    save("yug_properties", next);
    set({ properties: next });
  },
  upsertComplex: (c) => {
    const exists = get().complexes.some(x => x.id === c.id);
    const next = exists ? get().complexes.map(x => x.id === c.id ? c : x) : [c, ...get().complexes];
    save("yug_complexes", next);
    set({ complexes: next });
  },
  upsertNews: (n) => {
    const exists = get().news.some(x => x.id === n.id);
    const next = exists ? get().news.map(x => x.id === n.id ? n : x) : [n, ...get().news];
    save("yug_news", next);
    set({ news: next });
  },
  removeNews: (id) => {
    const next = get().news.filter(n => n.id !== id);
    save("yug_news", next);
    set({ news: next });
  },
}));
