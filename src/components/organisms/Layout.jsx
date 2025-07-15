import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [period, setPeriod] = useState("month");
  const [lastSync, setLastSync] = useState(new Date().toISOString());

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSync = () => {
    setLastSync(new Date().toISOString());
    // Implementar lógica de sincronização aqui
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className="flex-1 lg:ml-0">
          <Header
            period={period}
            onPeriodChange={setPeriod}
            lastSync={lastSync}
            onSync={handleSync}
            onMenuToggle={handleMenuToggle}
          />
          
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;