import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import SiteLayout from "@/components/layout/SiteLayout";
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import Complexes from "@/pages/Complexes";
import ComplexDetail from "@/pages/ComplexDetail";
import PropertyDetail from "@/pages/PropertyDetail";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import About from "@/pages/About";
import Contacts from "@/pages/Contacts";
import NotFound from "@/pages/NotFound";

import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProperties from "@/pages/admin/AdminProperties";
import AdminComplexes from "@/pages/admin/AdminComplexes";
import AdminNews from "@/pages/admin/AdminNews";
import AdminLeads from "@/pages/admin/AdminLeads";
import AdminChats from "@/pages/admin/AdminChats";
import AdminIntegrations from "@/pages/admin/AdminIntegrations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/complexes" element={<Complexes />} />
            <Route path="/complexes/:id" element={<ComplexDetail />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="complexes" element={<AdminComplexes />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="chats" element={<AdminChats />} />
            <Route path="integrations" element={<AdminIntegrations />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
