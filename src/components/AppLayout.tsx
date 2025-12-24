import { AppSidebar } from "@/components/AppSidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="cyber-grid absolute inset-0 pointer-events-none opacity-30" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
