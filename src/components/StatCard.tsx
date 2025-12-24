import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "destructive" | "info";
  className?: string;
}

const variantStyles = {
  default: {
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    valueColor: "text-primary",
  },
  success: {
    iconBg: "bg-success/10",
    iconColor: "text-success",
    valueColor: "text-success",
  },
  warning: {
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    valueColor: "text-warning",
  },
  destructive: {
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    valueColor: "text-destructive",
  },
  info: {
    iconBg: "bg-info/10",
    iconColor: "text-info",
    valueColor: "text-info",
  },
};

export function StatCard({ title, value, icon: Icon, trend, variant = "default", className }: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn("stat-card group", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2.5 rounded-lg transition-all group-hover:scale-110", styles.iconBg)}>
          <Icon className={cn("w-5 h-5", styles.iconColor)} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
            trend.isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          )}>
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div className={cn("metric-value mb-1", styles.valueColor)}>
        {value}
      </div>
      <div className="metric-label">{title}</div>
    </div>
  );
}
