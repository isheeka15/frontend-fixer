import { AppLayout } from "@/components/AppLayout";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Shield,
  Activity,
  Globe,
  Clock,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const trafficData = [
  { time: "00:00", inbound: 2400, outbound: 1800, blocked: 120 },
  { time: "04:00", inbound: 1398, outbound: 1200, blocked: 80 },
  { time: "08:00", inbound: 4800, outbound: 3200, blocked: 320 },
  { time: "12:00", inbound: 6800, outbound: 4800, blocked: 450 },
  { time: "16:00", inbound: 5400, outbound: 4200, blocked: 280 },
  { time: "20:00", inbound: 4300, outbound: 3100, blocked: 190 },
  { time: "23:59", inbound: 2100, outbound: 1500, blocked: 95 },
];

const threatsByType = [
  { name: "Brute Force", value: 35, color: "hsl(0, 85%, 55%)" },
  { name: "Port Scan", value: 28, color: "hsl(38, 100%, 55%)" },
  { name: "Malware", value: 18, color: "hsl(200, 100%, 50%)" },
  { name: "DDoS", value: 12, color: "hsl(145, 100%, 45%)" },
  { name: "Other", value: 7, color: "hsl(220, 15%, 55%)" },
];

const weeklyData = [
  { day: "Mon", threats: 45 },
  { day: "Tue", threats: 52 },
  { day: "Wed", threats: 38 },
  { day: "Thu", threats: 67 },
  { day: "Fri", threats: 49 },
  { day: "Sat", threats: 23 },
  { day: "Sun", threats: 18 },
];

const topSourceIPs = [
  { ip: "45.33.32.156", country: "Russia", attacks: 847, blocked: true },
  { ip: "103.24.77.99", country: "China", attacks: 523, blocked: true },
  { ip: "89.45.67.123", country: "Ukraine", attacks: 312, blocked: false },
  { ip: "178.62.23.45", country: "Netherlands", attacks: 198, blocked: true },
  { ip: "185.220.101.8", country: "Germany", attacks: 156, blocked: false },
];

export default function Analysis() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Security Analysis</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Detailed threat analytics and network insights
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Last 24 hours</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Traffic</span>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <div className="text-2xl font-bold text-foreground font-mono mt-1">24.7 GB</div>
            <div className="text-xs text-success mt-1">+12% from yesterday</div>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Threats Detected</span>
              <TrendingDown className="w-4 h-4 text-success" />
            </div>
            <div className="text-2xl font-bold text-warning font-mono mt-1">292</div>
            <div className="text-xs text-success mt-1">-8% from yesterday</div>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Block Rate</span>
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary font-mono mt-1">98.7%</div>
            <div className="text-xs text-muted-foreground mt-1">Highly effective</div>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Response</span>
              <Activity className="w-4 h-4 text-info" />
            </div>
            <div className="text-2xl font-bold text-info font-mono mt-1">1.2s</div>
            <div className="text-xs text-muted-foreground mt-1">Detection time</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Traffic Chart */}
          <div className="lg:col-span-2 p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Network Traffic Overview</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="inbound" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(200, 100%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(200, 100%, 50%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="outbound" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(145, 100%, 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(145, 100%, 45%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="blocked" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 85%, 55%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(0, 85%, 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                  <XAxis dataKey="time" stroke="hsl(220, 15%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 8%)",
                      border: "1px solid hsl(222, 30%, 18%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area type="monotone" dataKey="inbound" stroke="hsl(200, 100%, 50%)" fill="url(#inbound)" />
                  <Area type="monotone" dataKey="outbound" stroke="hsl(145, 100%, 45%)" fill="url(#outbound)" />
                  <Area type="monotone" dataKey="blocked" stroke="hsl(0, 85%, 55%)" fill="url(#blocked)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-info" /> Inbound
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-success" /> Outbound
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-destructive" /> Blocked
              </span>
            </div>
          </div>

          {/* Threats by Type */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Threats by Type</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={threatsByType}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {threatsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 8%)",
                      border: "1px solid hsl(222, 30%, 18%)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {threatsByType.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </span>
                  <span className="font-mono text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Trends */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Weekly Threat Trends</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                  <XAxis dataKey="day" stroke="hsl(220, 15%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 8%)",
                      border: "1px solid hsl(222, 30%, 18%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="threats" fill="hsl(180, 100%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Attack Sources */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Top Attack Sources</h3>
            <div className="space-y-3">
              {topSourceIPs.map((source, index) => (
                <div
                  key={source.ip}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-mono">
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-mono text-sm text-foreground">{source.ip}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Globe className="w-3 h-3" />
                        {source.country}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-foreground">{source.attacks}</div>
                    <div className={cn(
                      "text-xs",
                      source.blocked ? "text-success" : "text-warning"
                    )}>
                      {source.blocked ? "Blocked" : "Monitoring"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
