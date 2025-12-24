import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { 
  Shield, 
  LayoutDashboard, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Activity,
  Network,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  { name: "Analysis", href: "/analysis", icon: BarChart3 },
  { name: "Network", href: "/network", icon: Network },
  { name: "Activity Log", href: "/activity", icon: Activity },
];

const bottomNavItems = [
  { name: "Settings", href: "/settings", icon: Settings },
];

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const navLinkClass = cn(
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
    "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
    collapsed && "justify-center px-0"
  );

  const activeNavLinkClass = "bg-primary/10 text-primary border-l-2 border-primary";

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 relative",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Logo Header */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 glow-primary">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        {!collapsed && (
          <div className="flex flex-col animate-fade-in">
            <span className="font-bold text-foreground tracking-tight">Intrusion</span>
            <span className="text-xs text-primary font-mono uppercase tracking-widest">Shield</span>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-secondary border border-border text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Status Indicator */}
      <div className={cn(
        "mx-4 mt-6 mb-4 p-3 rounded-lg bg-success/10 border border-success/30",
        collapsed && "mx-2 p-2"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success status-pulse" />
          {!collapsed && (
            <span className="text-xs text-success font-medium">System Protected</span>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2 space-y-1">
        {!collapsed && (
          <span className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Monitor
          </span>
        )}
        <div className="mt-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/"}
              className={navLinkClass}
              activeClassName={activeNavLinkClass}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="px-2 pb-4 space-y-1 border-t border-sidebar-border pt-4 mt-4">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={navLinkClass}
            activeClassName={activeNavLinkClass}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
        
        {/* Security Badge */}
        {!collapsed && (
          <div className="mt-4 p-3 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>256-bit encrypted</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
