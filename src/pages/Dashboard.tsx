import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { ThreatCard } from "@/components/ThreatCard";
import { NetworkActivity } from "@/components/NetworkActivity";
import { ThreatMap } from "@/components/ThreatMap";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Eye, 
  Bell,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const recentThreats = [
  {
    id: "THR-2847",
    title: "Brute Force Attack Detected",
    description: "Multiple failed SSH login attempts from external IP address targeting the main server.",
    severity: "critical" as const,
    source: "Firewall",
    timestamp: "2 min ago",
  },
  {
    id: "THR-2846",
    title: "Suspicious Outbound Traffic",
    description: "Unusual data transfer pattern detected to unknown external endpoint.",
    severity: "high" as const,
    source: "Network Monitor",
    timestamp: "15 min ago",
  },
  {
    id: "THR-2845",
    title: "Port Scan Detected",
    description: "Sequential port scanning activity from IP 45.33.32.156 blocked.",
    severity: "medium" as const,
    source: "IDS",
    timestamp: "1 hour ago",
  },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Security Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Real-time security monitoring and threat detection
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Bell className="w-4 h-4" />
              <span className="flex items-center gap-1">
                Alerts
                <span className="px-1.5 py-0.5 text-xs bg-destructive text-destructive-foreground rounded-full">
                  3
                </span>
              </span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Threats Blocked"
            value="2,847"
            icon={Shield}
            trend={{ value: 12, isPositive: true }}
            variant="success"
          />
          <StatCard
            title="Active Alerts"
            value="23"
            icon={AlertTriangle}
            trend={{ value: 5, isPositive: false }}
            variant="warning"
          />
          <StatCard
            title="Network Traffic"
            value="1.2 TB"
            icon={Activity}
            variant="info"
          />
          <StatCard
            title="Systems Monitored"
            value="156"
            icon={Eye}
            variant="default"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Threat Map - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ThreatMap />
          </div>

          {/* Recent Threats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Recent Threats</h2>
              <button className="text-sm text-primary hover:text-primary/80">View all →</button>
            </div>
            <div className="space-y-3">
              {recentThreats.map((threat) => (
                <ThreatCard
                  key={threat.id}
                  {...threat}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Network Activity - Full Width */}
        <NetworkActivity />
      </div>
    </AppLayout>
  );
}
