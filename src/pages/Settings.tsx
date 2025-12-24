import { AppLayout } from "@/components/AppLayout";
import { cn } from "@/lib/utils";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Monitor,
  Lock,
  User,
  Globe,
  Zap,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface SettingGroup {
  title: string;
  icon: React.ElementType;
  settings: {
    name: string;
    description: string;
    enabled: boolean;
  }[];
}

const settingsGroups: SettingGroup[] = [
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { name: "Email Alerts", description: "Receive critical alerts via email", enabled: true },
      { name: "Push Notifications", description: "Browser push notifications for threats", enabled: true },
      { name: "Daily Reports", description: "Receive daily security summary", enabled: false },
      { name: "Weekly Digest", description: "Weekly threat analysis report", enabled: true },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    settings: [
      { name: "Auto-block Threats", description: "Automatically block detected threats", enabled: true },
      { name: "Two-Factor Auth", description: "Require 2FA for all admin actions", enabled: true },
      { name: "Session Timeout", description: "Auto logout after 30 min of inactivity", enabled: true },
      { name: "IP Whitelisting", description: "Restrict access to whitelisted IPs", enabled: false },
    ],
  },
  {
    title: "Monitoring",
    icon: Monitor,
    settings: [
      { name: "Real-time Scanning", description: "Continuous network traffic analysis", enabled: true },
      { name: "Deep Packet Inspection", description: "Analyze packet contents for threats", enabled: true },
      { name: "Behavioral Analysis", description: "AI-powered anomaly detection", enabled: true },
      { name: "Geographic Blocking", description: "Block traffic from high-risk regions", enabled: false },
    ],
  },
  {
    title: "Performance",
    icon: Zap,
    settings: [
      { name: "High Performance Mode", description: "Prioritize speed over deep analysis", enabled: false },
      { name: "Cache Rules", description: "Cache firewall rules for faster processing", enabled: true },
      { name: "Parallel Processing", description: "Use multiple cores for scanning", enabled: true },
    ],
  },
];

export default function Settings() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Configure security preferences and system behavior
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Save Changes
          </Button>
        </div>

        {/* Settings Groups */}
        <div className="space-y-6">
          {settingsGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.title} className="rounded-lg bg-card border border-border overflow-hidden">
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{group.title}</h3>
                </div>
                <div className="divide-y divide-border">
                  {group.settings.map((setting) => (
                    <div key={setting.name} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                      <div>
                        <h4 className="font-medium text-foreground">{setting.name}</h4>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch defaultChecked={setting.enabled} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Danger Zone */}
        <div className="rounded-lg border border-destructive/30 overflow-hidden">
          <div className="p-4 border-b border-destructive/30 bg-destructive/5">
            <h3 className="font-semibold text-destructive">Danger Zone</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Reset All Rules</h4>
                <p className="text-sm text-muted-foreground">Clear all custom firewall rules</p>
              </div>
              <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                Reset Rules
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Factory Reset</h4>
                <p className="text-sm text-muted-foreground">Reset all settings to default values</p>
              </div>
              <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                Factory Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
