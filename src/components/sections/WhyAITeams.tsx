import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { SciFiPanel } from "@/components/ui/scifi-panel";

const WhyAITeams = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeView, setActiveView] = useState<"single" | "team">("single");

  // Parallax for depth effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className="relative py-24 lg:py-28 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" 
        style={{ y: bgY }}
      />
      <div className="absolute inset-0 noise-overlay" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
              className={`px-5 py-2 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 ${
                activeView === "single"
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Single Agent
            </button>
            <button
              onClick={() => setActiveView("team")}
              className={`px-5 py-2 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 ${
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
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {activeView === "single" ? <SingleAgentView /> : <TeamAgentView />}
                </motion.div>
              </div>

              {/* Status Labels */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <motion.div
                  key={`labels-${activeView}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-wrap justify-center gap-3"
                >
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
                </motion.div>
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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        {/* Central overloaded node */}
        <div className="relative">
          <motion.div 
            className="absolute inset-0 bg-red-500/20 blur-xl"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative w-24 h-24 bg-card border-2 border-red-500/50 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-red-500" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-red-500" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-red-500" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-red-500" />
            
            <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest">Overload</span>
          </div>
        </div>

        {/* Chaotic connections */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: "easeOut" }}
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
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Complex hierarchical structure with multiple departments
  const nodes = [
    // Executive layer
    { id: "orchestrator", label: "ORCH", role: "Orchestrator", x: 50, y: 8, tier: "exec" },
    
    // Department heads
    { id: "research-lead", label: "R-LEAD", role: "Research Lead", x: 22, y: 32, tier: "lead" },
    { id: "content-lead", label: "C-LEAD", role: "Content Lead", x: 50, y: 32, tier: "lead" },
    { id: "ops-lead", label: "O-LEAD", role: "Ops Lead", x: 78, y: 32, tier: "lead" },
    
    // Workers - Research team
    { id: "scraper", label: "SCRP", role: "Scraper", x: 10, y: 60, tier: "worker" },
    { id: "analyst", label: "ANLY", role: "Analyst", x: 28, y: 60, tier: "worker" },
    
    // Workers - Content team  
    { id: "writer", label: "WRIT", role: "Writer", x: 42, y: 60, tier: "worker" },
    { id: "editor", label: "EDIT", role: "Editor", x: 58, y: 60, tier: "worker" },
    
    // Workers - Ops team
    { id: "qa", label: "QA", role: "QA Agent", x: 72, y: 60, tier: "worker" },
    { id: "publisher", label: "PUB", role: "Publisher", x: 90, y: 60, tier: "worker" },
    
    // Shared resources
    { id: "memory", label: "MEM", role: "Shared Memory", x: 50, y: 85, tier: "resource" },
  ];

  const connections = [
    // Executive to leads
    { from: "orchestrator", to: "research-lead", type: "command" },
    { from: "orchestrator", to: "content-lead", type: "command" },
    { from: "orchestrator", to: "ops-lead", type: "command" },
    
    // Research lead to workers
    { from: "research-lead", to: "scraper", type: "delegate" },
    { from: "research-lead", to: "analyst", type: "delegate" },
    
    // Content lead to workers
    { from: "content-lead", to: "writer", type: "delegate" },
    { from: "content-lead", to: "editor", type: "delegate" },
    
    // Ops lead to workers
    { from: "ops-lead", to: "qa", type: "delegate" },
    { from: "ops-lead", to: "publisher", type: "delegate" },
    
    // Cross-team data flows
    { from: "analyst", to: "writer", type: "data" },
    { from: "editor", to: "qa", type: "data" },
    { from: "qa", to: "publisher", type: "data" },
    
    // Memory connections (bidirectional concept)
    { from: "analyst", to: "memory", type: "sync" },
    { from: "writer", to: "memory", type: "sync" },
    { from: "qa", to: "memory", type: "sync" },
  ];

  const getNodeById = (id: string) => nodes.find(n => n.id === id);

  const getTierStyle = (tier: string) => {
    switch (tier) {
      case "exec": return { color: "hsl(45 100% 60%)", size: 44 };
      case "lead": return { color: "hsl(var(--primary))", size: 38 };
      case "worker": return { color: "hsl(185 80% 55%)", size: 32 };
      case "resource": return { color: "hsl(280 80% 65%)", size: 36 };
      default: return { color: "hsl(var(--primary))", size: 32 };
    }
  };

  const getConnectionOpacity = (fromId: string, toId: string) => {
    if (!hoveredNode) return 0.5;
    if (fromId === hoveredNode || toId === hoveredNode) return 1;
    return 0.15;
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-grid-fine opacity-25" />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow-team" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <marker id="arrow-cmd" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
            <polygon points="0 0, 4 2, 0 4" fill="hsl(var(--primary))" fillOpacity="0.7" />
          </marker>
          <marker id="arrow-data" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
            <polygon points="0 0, 4 2, 0 4" fill="hsl(160 100% 50%)" fillOpacity="0.7" />
          </marker>
          <marker id="arrow-sync" markerWidth="3" markerHeight="3" refX="2" refY="1.5" orient="auto">
            <polygon points="0 0, 3 1.5, 0 3" fill="hsl(280 80% 65%)" fillOpacity="0.7" />
          </marker>
        </defs>
        
        {connections.map((conn, i) => {
          const from = getNodeById(conn.from);
          const to = getNodeById(conn.to);
          if (!from || !to) return null;
          
          const opacity = getConnectionOpacity(conn.from, conn.to);
          const isData = conn.type === "data";
          const isSync = conn.type === "sync";
          const strokeColor = isSync 
            ? "hsl(280 80% 65%)" 
            : isData 
              ? "hsl(160 100% 50%)" 
              : "hsl(var(--primary))";
          const markerId = isSync ? "arrow-sync" : isData ? "arrow-data" : "arrow-cmd";
          
          return (
            <motion.line
              key={i}
              x1={`${from.x}%`}
              y1={`${from.y + 4}%`}
              x2={`${to.x}%`}
              y2={`${to.y - 2}%`}
              stroke={strokeColor}
              strokeWidth={isSync ? 0.5 : 0.8}
              strokeDasharray={isData || isSync ? "3 2" : "none"}
              markerEnd={`url(#${markerId})`}
              filter="url(#glow-team)"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: opacity * 0.7, pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.03, ease: "easeOut" }}
            />
          );
        })}
      </svg>

      {/* Agent nodes */}
      {nodes.map((node, i) => {
        const style = getTierStyle(node.tier);
        const isHovered = hoveredNode === node.id;
        const isDimmed = hoveredNode && !isHovered;
        const sizePx = style.size;
        
        return (
          <motion.div
            key={node.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1.06 : 1, opacity: isDimmed ? 0.35 : 1 }}
            transition={{ delay: 0.05 + i * 0.03, duration: 0.4, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="relative group cursor-pointer">
              <motion.div 
                className="absolute -inset-1.5 blur-md"
                style={{ backgroundColor: style.color }}
                animate={{ opacity: isHovered ? 0.3 : 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.div 
                className="relative flex items-center justify-center bg-card border"
                style={{ 
                  width: sizePx, 
                  height: sizePx,
                  borderColor: style.color,
                  borderRadius: node.tier === "resource" ? "50%" : "2px",
                  boxShadow: isHovered 
                    ? `0 0 20px ${style.color}50` 
                    : `0 0 8px ${style.color}20`
                }}
                whileHover={{ backgroundColor: `${style.color}15` }}
                transition={{ duration: 0.25 }}
              >
                {node.tier !== "resource" && (
                  <>
                    <div className="absolute -top-px -left-px w-1.5 h-1.5 border-l border-t" style={{ borderColor: style.color }} />
                    <div className="absolute -top-px -right-px w-1.5 h-1.5 border-r border-t" style={{ borderColor: style.color }} />
                    <div className="absolute -bottom-px -left-px w-1.5 h-1.5 border-l border-b" style={{ borderColor: style.color }} />
                    <div className="absolute -bottom-px -right-px w-1.5 h-1.5 border-r border-b" style={{ borderColor: style.color }} />
                  </>
                )}
                
                <div 
                  className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 border border-background rounded-full" 
                  style={{ boxShadow: '0 0 4px #4ade80' }} 
                />
                
                <span 
                  className="text-[8px] font-mono uppercase tracking-wider"
                  style={{ color: style.color }}
                >
                  {node.label}
                </span>
              </motion.div>
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 3 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-card border whitespace-nowrap pointer-events-none z-10"
                style={{ borderColor: `${style.color}60` }}
              >
                <span className="text-[8px] font-mono" style={{ color: style.color }}>{node.role}</span>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WhyAITeams;
