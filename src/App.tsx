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
            <Route path="buses" element={<div className="p-8 text-center text-muted-foreground">Bus Management - Coming Soon</div>} />
            <Route path="routes" element={<div className="p-8 text-center text-muted-foreground">Route Management - Coming Soon</div>} />
            <Route path="analytics" element={<div className="p-8 text-center text-muted-foreground">Analytics Dashboard - Coming Soon</div>} />
            <Route path="alerts" element={<div className="p-8 text-center text-muted-foreground">Alert Templates - Coming Soon</div>} />
            <Route path="settings" element={<div className="p-8 text-center text-muted-foreground">Settings - Coming Soon</div>} />
            <Route path="logs" element={<div className="p-8 text-center text-muted-foreground">Audit Logs - Coming Soon</div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
