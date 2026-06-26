import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard, Users, Handshake, Home as HomeIcon, Building, Newspaper,
  Inbox, MessageSquare, Plug, ChevronLeft, LogOut, Sparkles, BookOpen, Wallet, Search, Bell, Palette
} from "lucide-react";
import { useState } from "react";
import { useStore } from "@/store/useStore";

const groups: { label: string; items: { to: string; end?: boolean; icon: React.ComponentType<{ className?: string }>; label: string }[] }[] = [
  {
    label: "Обзор",
    items: [
      { to: "/admin", end: true, icon: LayoutDashboard, label: "Dashboard" },
      { to: "/admin/analytics", icon: Sparkles, label: "Аналитика" },
    ],
  },
  {
    label: "Продажи",
    items: [
      { to: "/admin/crm", icon: Users, label: "CRM" },
      { to: "/admin/deals", icon: Handshake, label: "Сделки" },
      { to: "/admin/leads", icon: Inbox, label: "Заявки" },
      { to: "/admin/chats", icon: MessageSquare, label: "Avito" },
    ],
  },
  {
    label: "Каталог",
    items: [
      { to: "/admin/properties", icon: HomeIcon, label: "Объекты" },
      { to: "/admin/complexes", icon: Building, label: "ЖК" },
      { to: "/admin/news", icon: Newspaper, label: "Новости" },
    ],
  },
  {
    label: "Платформа",
    items: [
      { to: "/admin/ai", icon: Sparkles, label: "AI Агенты" },
      { to: "/admin/knowledge", icon: BookOpen, label: "База знаний" },
      { to: "/admin/finance", icon: Wallet, label: "Финансы" },
      { to: "/admin/integrations", icon: Plug, label: "Интеграции" },
    ],
  },
  {
    label: "Settings",
    items: [
      { to: "/admin/appearance", icon: Palette, label: "Appearance" },
    ],
  },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const leads = useStore(s => s.leads);
  const chats = useStore(s => s.chats);
  const newLeads = leads.filter(l => l.status === "новая").length;
  const newChats = chats.reduce((acc, c) => acc + c.unread, 0);

  return (
    <div className="min-h-screen flex bg-secondary/40">
      <aside className={`${collapsed ? "w-[64px]" : "w-[240px]"} transition-all bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col sticky top-0 h-screen`}>
        <div className="h-14 flex items-center justify-between px-3 border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-white/10 grid place-items-center font-display text-[13px] font-bold text-white">Ю</div>
              <div className="leading-none">
                <div className="font-display text-[13px] font-bold tracking-tight text-white">ЮГАКЦЕНТ</div>
                <div className="text-[8.5px] uppercase tracking-[0.2em] text-sidebar-foreground/60 mt-0.5">Platform</div>
              </div>
            </Link>
          )}
          <button onClick={() => setCollapsed(c => !c)} className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70">
            <ChevronLeft className={`w-3.5 h-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        {!collapsed && (
          <div className="px-3 py-3 border-b border-sidebar-border">
            <div className="flex items-center gap-2 bg-sidebar-accent rounded-md px-2.5 h-8 text-[12px] text-sidebar-foreground/60">
              <Search className="w-3.5 h-3.5" />
              <span>Поиск...</span>
              <kbd className="ml-auto text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-sidebar-foreground/50">⌘K</kbd>
            </div>
          </div>
        )}

        <nav className="flex-1 py-3 px-2 overflow-y-auto no-scrollbar">
          {groups.map(g => (
            <div key={g.label} className="mb-4">
              {!collapsed && (
                <div className="px-3 mb-1.5 text-[10px] uppercase tracking-[0.14em] text-sidebar-foreground/40 font-medium">{g.label}</div>
              )}
              <div className="space-y-0.5">
                {g.items.map(i => {
                  const badge =
                    i.to === "/admin/leads" && newLeads > 0 ? newLeads :
                    i.to === "/admin/chats" && newChats > 0 ? newChats : null;
                  return (
                    <NavLink key={i.to} to={i.to} end={i.end}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] transition-colors relative ${
                          isActive ? "bg-sidebar-accent text-white" : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-white"
                        }`
                      }>
                      <i.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{i.label}</span>
                          {badge && (
                            <span className="text-[10px] font-medium bg-[hsl(var(--brand))] text-white rounded-full px-1.5 min-w-[18px] h-[18px] grid place-items-center num">{badge}</span>
                          )}
                        </>
                      )}
                      {collapsed && badge && <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand))]" />}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-2 border-t border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2 px-2.5 py-2 rounded-md">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[hsl(var(--brand))] to-primary grid place-items-center text-[11px] font-semibold text-white">ВВ</div>
              <div className="flex-1 leading-tight">
                <div className="text-[12px] font-medium text-white">Влад В.</div>
                <div className="text-[10px] text-sidebar-foreground/50">Руководитель</div>
              </div>
              <Bell className="w-3.5 h-3.5 text-sidebar-foreground/60" />
            </div>
          )}
          <Link to="/" className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[12px] text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-white transition-colors">
            <LogOut className="w-3.5 h-3.5" />{!collapsed && <span>На сайт</span>}
          </Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
