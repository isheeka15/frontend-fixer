import { cn } from "@/lib/utils";

interface ThreatMapProps {
  className?: string;
}

// Simulated threat data points
const threatPoints = [
  { id: 1, x: 15, y: 35, severity: "critical", location: "Russia" },
  { id: 2, x: 70, y: 25, severity: "high", location: "China" },
  { id: 3, x: 25, y: 65, severity: "medium", location: "Brazil" },
  { id: 4, x: 45, y: 45, severity: "high", location: "Ukraine" },
  { id: 5, x: 80, y: 55, severity: "low", location: "Australia" },
  { id: 6, x: 10, y: 25, severity: "medium", location: "USA" },
];

const severityColors = {
  critical: "bg-destructive",
  high: "bg-warning",
  medium: "bg-info",
  low: "bg-muted-foreground",
};

export function ThreatMap({ className }: ThreatMapProps) {
  return (
    <div className={cn("rounded-lg bg-card border border-border overflow-hidden", className)}>
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Global Threat Map</h3>
        <p className="text-xs text-muted-foreground mt-1">Real-time attack origins</p>
      </div>
      
      <div className="relative aspect-[2/1] bg-secondary/30 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 cyber-grid opacity-50" />
        
        {/* World map silhouette (simplified) */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 50">
          <ellipse cx="20" cy="25" rx="15" ry="10" fill="currentColor" className="text-primary" />
          <ellipse cx="45" cy="22" rx="12" ry="12" fill="currentColor" className="text-primary" />
          <ellipse cx="48" cy="38" rx="6" ry="8" fill="currentColor" className="text-primary" />
          <ellipse cx="70" cy="20" rx="18" ry="12" fill="currentColor" className="text-primary" />
          <ellipse cx="80" cy="42" rx="8" ry="6" fill="currentColor" className="text-primary" />
        </svg>
        
        {/* Threat points */}
        {threatPoints.map((point, index) => (
          <div
            key={point.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-fade-in"
            style={{ 
              left: `${point.x}%`, 
              top: `${point.y}%`,
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Pulse ring */}
            <div className={cn(
              "absolute inset-0 w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2",
              severityColors[point.severity as keyof typeof severityColors],
              "opacity-30 animate-ping"
            )} />
            {/* Core dot */}
            <div className={cn(
              "w-3 h-3 rounded-full border-2 border-background",
              severityColors[point.severity as keyof typeof severityColors]
            )} />
            {/* Label */}
            <span className="absolute left-4 top-0 text-xs text-muted-foreground whitespace-nowrap">
              {point.location}
            </span>
          </div>
        ))}
        
        {/* Connecting lines (attack vectors) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="attackLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--destructive))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="15%" y1="35%" x2="50%" y2="50%" stroke="url(#attackLine)" strokeWidth="1" className="animate-pulse" />
          <line x1="70%" y1="25%" x2="50%" y2="50%" stroke="url(#attackLine)" strokeWidth="1" className="animate-pulse" />
        </svg>
      </div>
      
      {/* Stats footer */}
      <div className="p-4 grid grid-cols-4 gap-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-bold text-destructive font-mono">3</div>
          <div className="text-xs text-muted-foreground">Critical</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-warning font-mono">12</div>
          <div className="text-xs text-muted-foreground">High</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-info font-mono">28</div>
          <div className="text-xs text-muted-foreground">Medium</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-muted-foreground font-mono">156</div>
          <div className="text-xs text-muted-foreground">Low</div>
        </div>
      </div>
    </div>
  );
}
