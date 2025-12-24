import { cn } from "@/lib/utils";

interface NetworkActivityProps {
  className?: string;
}

interface ActivityItem {
  id: string;
  type: "inbound" | "outbound" | "blocked";
  ip: string;
  port: number;
  protocol: string;
  timestamp: string;
  bytes: string;
}

const activityData: ActivityItem[] = [
  { id: "1", type: "inbound", ip: "192.168.1.45", port: 443, protocol: "HTTPS", timestamp: "12:45:32", bytes: "2.4 MB" },
  { id: "2", type: "blocked", ip: "45.33.32.156", port: 22, protocol: "SSH", timestamp: "12:44:18", bytes: "0 B" },
  { id: "3", type: "outbound", ip: "172.217.14.206", port: 443, protocol: "HTTPS", timestamp: "12:43:55", bytes: "1.2 MB" },
  { id: "4", type: "inbound", ip: "192.168.1.12", port: 8080, protocol: "HTTP", timestamp: "12:42:10", bytes: "456 KB" },
  { id: "5", type: "blocked", ip: "103.24.77.99", port: 3389, protocol: "RDP", timestamp: "12:41:45", bytes: "0 B" },
  { id: "6", type: "outbound", ip: "151.101.1.69", port: 443, protocol: "HTTPS", timestamp: "12:40:22", bytes: "892 KB" },
];

const typeStyles = {
  inbound: { dot: "bg-info", text: "text-info" },
  outbound: { dot: "bg-success", text: "text-success" },
  blocked: { dot: "bg-destructive", text: "text-destructive" },
};

export function NetworkActivity({ className }: NetworkActivityProps) {
  return (
    <div className={cn("rounded-lg bg-card border border-border overflow-hidden", className)}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Live Network Activity</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-info" />
              Inbound
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success" />
              Outbound
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-destructive" />
              Blocked
            </span>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-border max-h-80 overflow-auto">
        {activityData.map((item, index) => {
          const styles = typeStyles[item.type];
          return (
            <div 
              key={item.id}
              className="flex items-center gap-4 px-4 py-3 hover:bg-secondary/50 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn("w-2 h-2 rounded-full status-pulse", styles.dot)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-foreground">{item.ip}</span>
                  <span className="text-xs text-muted-foreground">:{item.port}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 text-xs font-mono bg-secondary rounded">
                {item.protocol}
              </span>
              <span className={cn("text-xs font-medium capitalize", styles.text)}>
                {item.type}
              </span>
              <span className="text-xs text-muted-foreground font-mono w-16 text-right">
                {item.bytes}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {item.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
