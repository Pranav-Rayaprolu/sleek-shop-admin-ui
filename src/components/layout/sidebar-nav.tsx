
"use client";

import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Home, LayoutGrid, BarChart3, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Products",
    href: "/products",
    icon: LayoutGrid,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function SidebarNav() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className={cn(
      "relative group h-screen border-r bg-sidebar flex flex-col",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="flex items-center h-16 px-4 border-b">
        {!collapsed && (
          <Link to="/" className="font-bold text-lg text-primary">SleekShop</Link>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-[72px] h-8 w-8 -mr-4 rounded-full border shadow-sm bg-background z-10"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
      <div className="flex-1 overflow-auto py-6">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
                collapsed && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed && "h-6 w-6")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            <p>SleekShop Admin v1.0</p>
          </div>
        )}
      </div>
    </div>
  );
}
