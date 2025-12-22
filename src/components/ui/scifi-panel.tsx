import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { GlowingEffect } from "./glowing-effect";

interface SciFiPanelProps {
  children: ReactNode;
  className?: string;
  glowing?: boolean;
  label?: string;
}

export const SciFiPanel = ({ children, className, glowing = false, label }: SciFiPanelProps) => {
  return (
    <div className={cn(
      "relative",
      glowing && "glow-subtle",
      className
    )}>
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/60" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/60" />
      
      {/* Glowing Effect */}
      <GlowingEffect 
        spread={40} 
        glow={glowing}
        proximity={64}
        inactiveZone={0.5}
        borderWidth={2}
      />
      
      {/* Main border */}
      <div className={cn(
        "relative bg-card/80 backdrop-blur-sm border border-primary/20",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/5 before:to-transparent before:pointer-events-none"
      )}>
        {/* Label */}
        {label && (
          <div className="absolute -top-px left-6 right-6">
            <div className="relative inline-block">
              <div className="absolute inset-x-0 top-0 h-px bg-card" />
              <span className="relative px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-primary bg-card">
                {label}
              </span>
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="relative">
          {children}
        </div>
        
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan" />
        </div>
      </div>
    </div>
  );
};

interface SciFiCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const SciFiCard = ({ children, className, hoverable = true }: SciFiCardProps) => {
  return (
    <div className={cn(
      "relative group",
      className
    )}>
      {/* Glowing Effect on hover */}
      {hoverable && (
        <GlowingEffect 
          spread={30} 
          glow
          blur={4}
          proximity={48}
          inactiveZone={0.4}
          borderWidth={1}
        />
      )}
      
      {/* Card */}
      <div className={cn(
        "relative bg-card border border-primary/20 overflow-hidden",
        hoverable && "group-hover:border-primary/40 transition-colors duration-300"
      )}>
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        {/* Corner dots */}
        <div className="absolute top-2 left-2 w-1 h-1 bg-primary/40 group-hover:bg-primary/80 transition-colors" />
        <div className="absolute top-2 right-2 w-1 h-1 bg-primary/40 group-hover:bg-primary/80 transition-colors" />
        
        {children}
      </div>
    </div>
  );
};

interface DataDisplayProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export const DataDisplay = ({ label, value, trend, className }: DataDisplayProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </div>
      <div className="font-mono text-2xl text-primary tabular-nums" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>
        {value}
        {trend && (
          <span className={cn(
            "ml-2 text-xs",
            trend === "up" && "text-green-400",
            trend === "down" && "text-red-400",
            trend === "neutral" && "text-muted-foreground"
          )}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </span>
        )}
      </div>
    </div>
  );
};
