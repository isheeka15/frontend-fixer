import { AppLayout } from "@/components/AppLayout";
import { cn } from "@/lib/utils";
import { 
  Activity, 
  Shield, 
  AlertTriangle, 
  User,
  Settings,
  LogIn,
  LogOut,
  FileText,
  Clock,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "security" | "system" | "user" | "alert";
  action: string;
  details: string;
  user?: string;
  ip?: string;
  timestamp: string;
}

const activityLog: ActivityItem[] = [
  { id: "1", type: "alert", action: "Threat Blocked", details: "Brute force attack blocked from external IP", ip: "45.33.32.156", timestamp: "2 min ago" },
  { id: "2", type: "user", action: "User Login", details: "Successful authentication", user: "admin@company.com", ip: "192.168.1.45", timestamp: "5 min ago" },
  { id: "3", type: "security", action: "Firewall Rule Updated", details: "New blocking rule added for port 22", user: "admin@company.com", timestamp: "15 min ago" },
  { id: "4", type: "system", action: "System Scan Complete", details: "No vulnerabilities detected in scheduled scan", timestamp: "1 hour ago" },
  { id: "5", type: "alert", action: "Suspicious Activity", details: "Unusual outbound traffic pattern detected", ip: "10.0.0.52", timestamp: "2 hours ago" },
  { id: "6", type: "user", action: "User Logout", details: "Session ended", user: "analyst@company.com", timestamp: "3 hours ago" },
  { id: "7", type: "security", action: "Certificate Renewed", details: "SSL certificate renewed for api.example.com", user: "system", timestamp: "5 hours ago" },
  { id: "8", type: "system", action: "Backup Completed", details: "Daily backup completed successfully", timestamp: "6 hours ago" },
  { id: "9", type: "alert", action: "Port Scan Detected", details: "Sequential port scan blocked", ip: "103.24.77.99", timestamp: "8 hours ago" },
  { id: "10", type: "user", action: "Password Changed", details: "User password updated", user: "operator@company.com", timestamp: "12 hours ago" },
];

const typeConfig = {
  security: { icon: Shield, color: "text-primary", bg: "bg-primary/10" },
  system: { icon: Settings, color: "text-info", bg: "bg-info/10" },
  user: { icon: User, color: "text-success", bg: "bg-success/10" },
  alert: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
};

export default function ActivityPage() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Activity Log</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Complete audit trail of all system events
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "security", "system", "user", "alert"] as const).map((filter) => (
            <button
              key={filter}
              className={cn(
                "px-3 py-1.5 text-sm rounded-lg border transition-colors capitalize",
                filter === "all" 
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Activity Timeline */}
        <div className="rounded-lg bg-card border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
          </div>
          <div className="divide-y divide-border">
            {activityLog.map((item) => {
              const config = typeConfig[item.type];
              const Icon = config.icon;
              return (
                <div key={item.id} className="flex items-start gap-4 p-4 hover:bg-secondary/30 transition-colors">
                  <div className={cn("p-2 rounded-lg", config.bg)}>
                    <Icon className={cn("w-4 h-4", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">{item.action}</h4>
                      <span className={cn(
                        "px-2 py-0.5 text-xs rounded-full capitalize",
                        config.bg, config.color
                      )}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      {item.user && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {item.user}
                        </span>
                      )}
                      {item.ip && (
                        <span className="font-mono bg-secondary px-2 py-0.5 rounded">
                          {item.ip}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
