import { AppLayout } from "@/components/AppLayout";
import { cn } from "@/lib/utils";
import { 
  Network as NetworkIcon, 
  Server, 
  Wifi, 
  Shield,
  Activity,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface Device {
  id: string;
  name: string;
  ip: string;
  mac: string;
  type: "server" | "workstation" | "router" | "firewall" | "iot";
  status: "online" | "offline" | "warning";
  traffic: string;
  lastSeen: string;
}

const devices: Device[] = [
  { id: "1", name: "Main Server", ip: "192.168.1.1", mac: "00:1A:2B:3C:4D:5E", type: "server", status: "online", traffic: "2.4 GB", lastSeen: "Now" },
  { id: "2", name: "Edge Firewall", ip: "192.168.1.2", mac: "00:1A:2B:3C:4D:5F", type: "firewall", status: "online", traffic: "15.8 GB", lastSeen: "Now" },
  { id: "3", name: "Core Router", ip: "192.168.1.3", mac: "00:1A:2B:3C:4D:60", type: "router", status: "online", traffic: "8.2 GB", lastSeen: "Now" },
  { id: "4", name: "Workstation-01", ip: "192.168.1.45", mac: "00:1A:2B:3C:4D:61", type: "workstation", status: "online", traffic: "456 MB", lastSeen: "Now" },
  { id: "5", name: "Workstation-02", ip: "192.168.1.46", mac: "00:1A:2B:3C:4D:62", type: "workstation", status: "warning", traffic: "1.2 GB", lastSeen: "2 min ago" },
  { id: "6", name: "IoT Sensor Hub", ip: "192.168.1.100", mac: "00:1A:2B:3C:4D:63", type: "iot", status: "online", traffic: "12 MB", lastSeen: "Now" },
  { id: "7", name: "Backup Server", ip: "192.168.1.10", mac: "00:1A:2B:3C:4D:64", type: "server", status: "offline", traffic: "0 B", lastSeen: "3 hours ago" },
  { id: "8", name: "Guest WiFi AP", ip: "192.168.1.5", mac: "00:1A:2B:3C:4D:65", type: "router", status: "online", traffic: "890 MB", lastSeen: "Now" },
];

const typeIcons = {
  server: Server,
  workstation: Activity,
  router: Wifi,
  firewall: Shield,
  iot: NetworkIcon,
};

const statusStyles = {
  online: { dot: "bg-success", text: "text-success" },
  offline: { dot: "bg-muted-foreground", text: "text-muted-foreground" },
  warning: { dot: "bg-warning", text: "text-warning" },
};

export default function Network() {
  const onlineCount = devices.filter(d => d.status === "online").length;
  const warningCount = devices.filter(d => d.status === "warning").length;
  const offlineCount = devices.filter(d => d.status === "offline").length;

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Network Overview</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Monitor all connected devices and network health
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <NetworkIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground font-mono">{devices.length}</div>
                <div className="text-xs text-muted-foreground">Total Devices</div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success font-mono">{onlineCount}</div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-warning font-mono">{warningCount}</div>
                <div className="text-xs text-muted-foreground">Warning</div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Server className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-muted-foreground font-mono">{offlineCount}</div>
                <div className="text-xs text-muted-foreground">Offline</div>
              </div>
            </div>
          </div>
        </div>

        {/* Devices Table */}
        <div className="rounded-lg bg-card border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Connected Devices</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Device</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">IP Address</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">MAC Address</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Traffic</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {devices.map((device) => {
                  const Icon = typeIcons[device.type];
                  const status = statusStyles[device.status];
                  return (
                    <tr key={device.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-secondary">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{device.name}</div>
                            <div className="text-xs text-muted-foreground capitalize">{device.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-mono text-sm text-foreground">{device.ip}</td>
                      <td className="px-4 py-4 font-mono text-sm text-muted-foreground">{device.mac}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", status.dot, device.status === "online" && "status-pulse")} />
                          <span className={cn("text-sm capitalize", status.text)}>{device.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-mono text-sm text-foreground">{device.traffic}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{device.lastSeen}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
