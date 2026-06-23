import { NavLink, Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Building, Home, Newspaper, Inbox, MessageSquare, Plug, ChevronLeft, LogOut } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/store/useStore";

const items = [
  { to: "/admin", end: true, icon: LayoutDashboard, label: "Дэшборд" },
  { to: "/admin/properties", icon: Home, label: "Объекты" },
  { to: "/admin/complexes", icon: Building, label: "ЖК" },
  { to: "/admin/news", icon: Newspaper, label: "Новости" },
  { to: "/admin/leads", icon: Inbox, label: "Заявки" },
  { to: "/admin/chats", icon: MessageSquare, label: "Avito-чаты" },
  { to: "/admin/integrations", icon: Plug, label: "Интеграции" },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const leads = useStore(s => s.leads);
  const chats = useStore(s => s.chats);
  const newLeads = leads.filter(l => l.status === "новая").length;
  const newChats = chats.reduce((acc, c) => acc + c.unread, 0);

  return (
    <div className="min-h-screen flex bg-secondary/30">
      <aside className={`${collapsed ? "w-16" : "w-64"} transition-all bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col sticky top-0 h-screen`}>
        <div className="h-16 flex items-center justify-between px-3 border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gold text-gold-foreground grid place-items-center font-display text-lg">Ю</div>
              <span className="font-display text-lg">ЮГАКЦЕНТ</span>
            </Link>
          )}
          <button onClick={() => setCollapsed(c => !c)} className="p-2 rounded hover:bg-sidebar-accent">
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
        <nav className="flex-1 py-3 space-y-1 px-2">
          {items.map(i => {
            const badge =
              i.to === "/admin/leads" && newLeads > 0 ? newLeads :
              i.to === "/admin/chats" && newChats > 0 ? newChats : null;
            return (
              <NavLink key={i.to} to={i.to} end={i.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors relative ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"}`
                }>
                <i.icon className="w-4 h-4 shrink-0" />
                {!collapsed && <><span className="flex-1">{i.label}</span>{badge && <span className="text-xs bg-gold text-gold-foreground rounded-full px-1.5 min-w-[1.25rem] text-center">{badge}</span>}</>}
                {collapsed && badge && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold" />}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent">
            <LogOut className="w-4 h-4" />{!collapsed && <span>На сайт</span>}
          </Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
