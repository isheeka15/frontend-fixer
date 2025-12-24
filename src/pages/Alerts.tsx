import { AppLayout } from "@/components/AppLayout";
import { cn } from "@/lib/utils";
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  source: string;
  timestamp: string;
  status: "open" | "investigating" | "resolved";
  ip?: string;
}

const alertsData: Alert[] = [
  {
    id: "ALT-3001",
    title: "Brute Force Attack Detected",
    description: "Multiple failed SSH login attempts detected from external IP. 847 attempts in the last hour.",
    severity: "critical",
    source: "Firewall",
    timestamp: "2 minutes ago",
    status: "open",
    ip: "45.33.32.156",
  },
  {
    id: "ALT-3000",
    title: "Malware Signature Detected",
    description: "Known malware signature identified in downloaded file. File has been quarantined.",
    severity: "critical",
    source: "Endpoint Protection",
    timestamp: "15 minutes ago",
    status: "investigating",
    ip: "192.168.1.45",
  },
  {
    id: "ALT-2999",
    title: "Unusual Outbound Traffic",
    description: "Large data transfer to unknown external endpoint detected from internal server.",
    severity: "high",
    source: "Network Monitor",
    timestamp: "1 hour ago",
    status: "investigating",
    ip: "10.0.0.52",
  },
  {
    id: "ALT-2998",
    title: "Port Scan Activity",
    description: "Sequential port scanning detected and blocked from external source.",
    severity: "medium",
    source: "IDS",
    timestamp: "2 hours ago",
    status: "resolved",
    ip: "103.24.77.99",
  },
  {
    id: "ALT-2997",
    title: "Failed Authentication Attempts",
    description: "Multiple failed login attempts on admin portal from unknown IP.",
    severity: "high",
    source: "Auth Service",
    timestamp: "3 hours ago",
    status: "open",
    ip: "89.45.67.123",
  },
  {
    id: "ALT-2996",
    title: "SSL Certificate Expiring",
    description: "SSL certificate for api.example.com will expire in 7 days.",
    severity: "low",
    source: "Certificate Monitor",
    timestamp: "5 hours ago",
    status: "open",
  },
  {
    id: "ALT-2995",
    title: "DNS Query Anomaly",
    description: "Unusual DNS query pattern detected, possible DNS tunneling attempt.",
    severity: "medium",
    source: "DNS Monitor",
    timestamp: "6 hours ago",
    status: "resolved",
    ip: "192.168.1.102",
  },
];

const severityStyles = {
  critical: {
    badge: "bg-destructive/20 text-destructive border-destructive/30",
    dot: "bg-destructive",
  },
  high: {
    badge: "bg-warning/20 text-warning border-warning/30",
    dot: "bg-warning",
  },
  medium: {
    badge: "bg-info/20 text-info border-info/30",
    dot: "bg-info",
  },
  low: {
    badge: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground",
  },
};

const statusStyles = {
  open: { badge: "bg-destructive/10 text-destructive", icon: AlertTriangle },
  investigating: { badge: "bg-warning/10 text-warning", icon: Eye },
  resolved: { badge: "bg-success/10 text-success", icon: CheckCircle },
};

export default function Alerts() {
  const [filter, setFilter] = useState<"all" | "open" | "investigating" | "resolved">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlerts = alertsData.filter((alert) => {
    const matchesFilter = filter === "all" || alert.status === filter;
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const alertCounts = {
    all: alertsData.length,
    open: alertsData.filter(a => a.status === "open").length,
    investigating: alertsData.filter(a => a.status === "investigating").length,
    resolved: alertsData.filter(a => a.status === "resolved").length,
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Security Alerts</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Monitor and manage security incidents
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <div className="flex items-center gap-2">
            {(["all", "open", "investigating", "resolved"] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(status)}
                className={cn(
                  "capitalize",
                  filter === status && "bg-primary text-primary-foreground"
                )}
              >
                {status}
                <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-secondary">
                  {alertCounts[status]}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const severity = severityStyles[alert.severity];
            const status = statusStyles[alert.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={alert.id}
                className={cn(
                  "p-4 rounded-lg bg-card border border-border transition-all",
                  "hover:border-primary/30 cursor-pointer"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Severity Indicator */}
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className={cn("w-3 h-3 rounded-full", severity.dot, alert.severity === "critical" && "animate-pulse")} />
                    {alert.severity === "critical" && (
                      <div className={cn("w-1.5 h-1.5 rounded-full", severity.dot, "opacity-50")} />
                    )}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-medium text-foreground">{alert.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground font-mono">{alert.id}</span>
                          <span className={cn("px-2 py-0.5 text-xs font-medium rounded-full border uppercase", severity.badge)}>
                            {alert.severity}
                          </span>
                          <span className={cn("px-2 py-0.5 text-xs font-medium rounded-full flex items-center gap-1", status.badge)}>
                            <StatusIcon className="w-3 h-3" />
                            {alert.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {alert.source}
                      </span>
                      {alert.ip && (
                        <span className="font-mono bg-secondary px-2 py-0.5 rounded">
                          {alert.ip}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {alert.status === "open" && (
                      <Button size="sm" variant="outline" className="text-xs">
                        Investigate
                      </Button>
                    )}
                    {alert.status !== "resolved" && (
                      <Button size="sm" variant="outline" className="text-xs text-success border-success/30 hover:bg-success/10">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredAlerts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No alerts match your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
