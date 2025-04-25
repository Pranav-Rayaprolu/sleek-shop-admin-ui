import { SidebarNav } from "./sidebar-nav";
import { Header } from "./header";
import { useState, useEffect } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Function to be called from SidebarNav when collapse state changes
  const handleSidebarCollapseChange = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav onCollapseChange={handleSidebarCollapseChange} />
      <div
        className={`flex-1 flex flex-col w-full transition-all duration-300 ${
          !isMobile ? (sidebarCollapsed ? "ml-[70px]" : "ml-[240px]") : ""
        }`}
      >
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
