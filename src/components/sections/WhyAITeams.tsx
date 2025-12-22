import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { SciFiPanel } from "@/components/ui/scifi-panel";

const WhyAITeams = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeView, setActiveView] = useState<"single" | "team">("single");

  return (
    <section ref={ref} className="relative py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest mb-6">
            <span className="w-1 h-1 bg-primary" />
            Architecture
          </div>
          
          <h2 className="font-heading text-2xl md:text-3xl font-medium mb-5 tracking-wider">
            Teams Outperform{" "}
            <span className="text-primary" style={{ textShadow: '0 0 30px hsl(var(--primary) / 0.5)' }}>Single Agents</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            As complexity increases, reliability drops. AI teams behave like real departments — 
            parallel, structured, and reliable.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex bg-card border border-primary/30">
            <button
              onClick={() => setActiveView("single")}
              className={`px-5 py-2 text-[10px] font-mono uppercase tracking-widest transition-all duration-200 ${
                activeView === "single"
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Single Agent
            </button>
            <button
              onClick={() => setActiveView("team")}
              className={`px-5 py-2 text-[10px] font-mono uppercase tracking-widest transition-all duration-200 ${
                activeView === "team"
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              AI Team
            </button>
          </div>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
        >
          <SciFiPanel label={activeView === "single" ? "Single Agent Mode" : "Team Mode"}>
            <div className="p-6 md:p-10">
              <div className="relative h-[280px] md:h-[320px]">
                {activeView === "single" ? <SingleAgentView /> : <TeamAgentView />}
              </div>

              {/* Status Labels */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {activeView === "single" ? (
                  <>
                    <StatusLabel label="Bottlenecks" variant="error" />
                    <StatusLabel label="Fragile" variant="error" />
                    <StatusLabel label="Limited" variant="error" />
                  </>
                ) : (
                  <>
                    <StatusLabel label="Parallel" variant="success" />
                    <StatusLabel label="Structured" variant="success" />
                    <StatusLabel label="Reliable" variant="success" />
                  </>
                )}
              </div>
            </div>
          </SciFiPanel>
        </motion.div>
      </div>
    </section>
  );
};

const StatusLabel = ({ label, variant }: { label: string; variant: "success" | "error" }) => {
  const styles = variant === "success"
    ? "bg-green-500/10 text-green-400 border-green-500/30"
    : "bg-red-500/10 text-red-400 border-red-500/30";
  
  const dotStyle = variant === "success" 
    ? "bg-green-400" 
    : "bg-red-400";

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 border text-[10px] font-mono uppercase tracking-widest ${styles}`}>
      <span className={`w-1 h-1 ${dotStyle}`} style={{ boxShadow: `0 0 6px currentColor` }} />
      {label}
    </span>
  );
};

const SingleAgentView = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-fine opacity-30" />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        {/* Central overloaded node */}
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 blur-xl animate-pulse" />
          <div className="relative w-24 h-24 bg-card border-2 border-red-500/50 flex items-center justify-center">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-red-500" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-red-500" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-red-500" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-red-500" />
            
            <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest">Overload</span>
          </div>
        </div>
        
        {/* Warning pulse */}
        <div className="absolute inset-0 border-2 border-red-500/30 animate-ping" style={{ animationDuration: '2s' }} />

        {/* Chaotic connections */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="absolute w-16 h-px bg-gradient-to-r from-red-500/50 to-transparent"
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "0 50%",
              left: "50%",
              top: "50%",
            }}
          >
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border border-red-500/40 bg-red-500/10"
              style={{ transform: `rotate(-${angle}deg)` }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const TeamAgentView = () => {
  // Use pixel positions for precise alignment
  const nodes = [
    { label: "LEAD", x: 50, y: 15 },
    { label: "RSRCH", x: 15, y: 45 },
    { label: "CREATE", x: 50, y: 45 },
    { label: "REVW", x: 85, y: 45 },
    { label: "EXEC", x: 50, y: 78 },
  ];

  const connections = [
    // From LEAD to middle row
    { from: { x: 50, y: 22 }, to: { x: 15, y: 38 } },
    { from: { x: 50, y: 22 }, to: { x: 50, y: 38 } },
    { from: { x: 50, y: 22 }, to: { x: 85, y: 38 } },
    // From middle row to EXEC
    { from: { x: 15, y: 52 }, to: { x: 50, y: 71 } },
    { from: { x: 50, y: 52 }, to: { x: 50, y: 71 } },
    { from: { x: 85, y: 52 }, to: { x: 50, y: 71 } },
  ];

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-grid-fine opacity-30" />
      
      {/* Connections SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow-team" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <marker id="arrow-team" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
            <polygon points="0 0, 4 2, 0 4" fill="hsl(var(--primary))" fillOpacity="0.5" />
          </marker>
        </defs>
        
        {connections.map((conn, i) => (
          <motion.line
            key={i}
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke="hsl(var(--primary))"
            strokeWidth="0.8"
            markerEnd="url(#arrow-team)"
            filter="url(#glow-team)"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.6, pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
          />
        ))}
      </svg>

      {/* Central context hub */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-primary/20 blur-lg" />
          <div className="relative w-full h-full bg-primary/10 border border-primary/40 rotate-45 flex items-center justify-center"
               style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.25)' }}>
            <div className="w-3 h-3 bg-primary/50 -rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-primary" />
            </div>
          </div>
        </div>
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-primary/50 uppercase tracking-widest whitespace-nowrap">
          Context
        </span>
      </motion.div>

      {/* Agent nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.08 + i * 0.06, ease: "easeOut" }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-primary/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <div 
              className="relative w-12 h-12 bg-card border border-primary/40 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all cursor-pointer"
              style={{ boxShadow: '0 0 12px hsl(var(--primary) / 0.12)' }}
            >
              {/* Corner accents */}
              <div className="absolute -top-px -left-px w-2 h-2 border-l border-t border-primary" />
              <div className="absolute -top-px -right-px w-2 h-2 border-r border-t border-primary" />
              <div className="absolute -bottom-px -left-px w-2 h-2 border-l border-b border-primary" />
              <div className="absolute -bottom-px -right-px w-2 h-2 border-r border-b border-primary" />
              
              {/* Status dot */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 border border-background" 
                   style={{ boxShadow: '0 0 6px #4ade80' }} />
              
              <span className="text-[9px] font-mono text-primary uppercase tracking-wider">
                {node.label}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WhyAITeams;
