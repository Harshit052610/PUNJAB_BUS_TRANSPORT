import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./components/Dashboard";
import DriverManagement from "./components/DriverManagement";
import LiveMap from "./components/LiveMap";
import Messages from "./components/Messages";
import BusManagement from "./components/BusManagement";
import RouteManagement from "./components/RouteManagement";
import Analytics from "./components/Analytics";
import AlertTemplates from "./components/AlertTemplates";
import Settings from "./components/Settings";
import AuditLogs from "./components/AuditLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="drivers" element={<DriverManagement />} />
            <Route path="map" element={<LiveMap />} />
            <Route path="messages" element={<Messages />} />
            <Route path="buses" element={<BusManagement />} />
            <Route path="routes" element={<RouteManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="alerts" element={<AlertTemplates />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logs" element={<AuditLogs />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
