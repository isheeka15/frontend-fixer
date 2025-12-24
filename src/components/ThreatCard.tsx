import { cn } from "@/lib/utils";
import { AlertTriangle, Shield, Clock, ExternalLink } from "lucide-react";

interface ThreatCardProps {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  source: string;
  timestamp: string;
  className?: string;
}

const severityStyles = {
  critical: {
    badge: "bg-destructive/20 text-destructive border-destructive/30",
    icon: "text-destructive",
    glow: "hover:glow-destructive",
  },
  high: {
    badge: "bg-warning/20 text-warning border-warning/30",
    icon: "text-warning",
    glow: "hover:glow-warning",
  },
  medium: {
    badge: "bg-info/20 text-info border-info/30",
    icon: "text-info",
    glow: "hover:border-info/50",
  },
  low: {
    badge: "bg-muted text-muted-foreground border-border",
    icon: "text-muted-foreground",
    glow: "",
  },
};

export function ThreatCard({ id, title, description, severity, source, timestamp, className }: ThreatCardProps) {
  const styles = severityStyles[severity];

  return (
    <div className={cn(
      "p-4 rounded-lg bg-card border border-border transition-all cursor-pointer",
      "hover:border-primary/30",
      styles.glow,
      className
    )}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg bg-secondary", severity === "critical" && "animate-pulse")}>
            {severity === "critical" || severity === "high" ? (
              <AlertTriangle className={cn("w-4 h-4", styles.icon)} />
            ) : (
              <Shield className={cn("w-4 h-4", styles.icon)} />
            )}
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground font-mono">ID: {id}</p>
          </div>
        </div>
        <span className={cn("px-2 py-1 text-xs font-medium rounded-full border uppercase", styles.badge)}>
          {severity}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            {source}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timestamp}
          </span>
        </div>
        <button className="text-primary hover:text-primary/80 font-medium">
          Investigate →
        </button>
      </div>
    </div>
  );
}
