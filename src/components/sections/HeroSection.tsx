import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Hexagon } from "lucide-react";
import { SciFiPanel } from "@/components/ui/scifi-panel";

const HeroSection = () => {
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Build me a content team that researches, writes, reviews, and posts daily.";
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.02]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowWorkflow(true), 300);
      }
    }, 25);
    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const bullets = [
    "Natural language → agent workflows",
    "Multi-agent teams with structure",
    "Full observability and control",
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-hero" 
        style={{ y: bgY }}
      />
      <motion.div 
        className="absolute inset-0 bg-grid opacity-40" 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
      />
      <motion.div 
        className="absolute inset-0 bg-hex-grid opacity-30" 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
      />
      <div className="absolute inset-0 scanline-overlay" />
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Glowing orb with subtle movement */}
      <motion.div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[150px]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
      />
      
      {/* Corner decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 border-l-2 border-t-2 border-primary/20" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border-r-2 border-b-2 border-primary/20" />
      
      <div className="container relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content - No parallax on text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-primary text-xs font-mono uppercase tracking-widest mb-8"
            >
              <Hexagon className="w-3 h-3" />
              <span>AI Team Orchestration</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] mb-6"
              style={{ textShadow: '0 0 40px hsl(var(--primary) / 0.3)' }}
            >
              <span className="text-muted-foreground">Single AI Agents</span>
              <br />
              <span className="text-muted-foreground">Don't Scale.</span>
              <br />
              <span className="text-primary">Teams Do.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              Describe what you want in plain English.{" "}
              <span className="text-primary font-medium">AIOLET</span> builds and runs structured AI teams you can monitor, manage, and trust.
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-2 mb-10">
              {bullets.map((bullet, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center gap-3 text-muted-foreground text-sm font-mono"
                >
                  <span className="w-1.5 h-1.5 bg-primary" style={{ boxShadow: '0 0 6px hsl(var(--primary))' }} />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Button variant="hero" size="lg" className="group uppercase tracking-wider">
                <span>Join Waitlist</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Button>
              <Button variant="ghost-border" size="lg" className="uppercase tracking-wider">
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Demo with parallax depth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ scale: canvasScale, y: canvasY }}
            className="relative"
          >
            <SciFiPanel glowing label="Command Interface">
              <div className="p-5">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-primary/20">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] text-primary font-mono uppercase tracking-widest">aiolet.sys</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-green-400">ONLINE</span>
                  </div>
                </div>

                {/* Input Section */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-primary/60 font-mono uppercase tracking-widest">› input</span>
                  </div>
                  <div className="bg-background/60 rounded-sm p-3 border border-primary/20 font-mono">
                    <p className="text-sm text-foreground/90 min-h-[40px] leading-relaxed">
                      <span className="text-primary">$</span> {typedText}
                      <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-cursor" />
                    </p>
                  </div>
                </div>

                {/* Output Section */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-primary/60 font-mono uppercase tracking-widest">› output</span>
                    {showWorkflow && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-1.5 text-[10px] font-mono"
                      >
                        <span className="w-1.5 h-1.5 bg-green-400" style={{ boxShadow: '0 0 6px #4ade80' }} />
                        <span className="text-green-400 uppercase">Executing</span>
                      </motion.span>
                    )}
                  </div>

                  <div className="bg-background/60 rounded-sm p-5 border border-primary/20 min-h-[180px] relative overflow-hidden">
                    {showWorkflow ? (
                      <WorkflowVisualization />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 text-primary/60 text-sm font-mono"
                        >
                          <div className="w-2 h-2 bg-primary animate-pulse" />
                          <span className="uppercase tracking-widest">Processing</span>
                          <span className="animate-pulse">...</span>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SciFiPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WorkflowVisualization = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Hierarchical org structure: Orchestrator at top, managers, then workers
  const nodes = [
    // Top level - Orchestrator
    { id: "orchestrator", label: "ORCH", role: "Orchestrator", x: 155, y: 8, tier: "leader", icon: "◈" },
    
    // Middle level - Managers
    { id: "research-mgr", label: "R-MGR", role: "Research Lead", x: 70, y: 55, tier: "manager" },
    { id: "content-mgr", label: "C-MGR", role: "Content Lead", x: 240, y: 55, tier: "manager" },
    
    // Bottom level - Workers
    { id: "web-scraper", label: "SCRP", role: "Web Scraper", x: 15, y: 105, tier: "worker" },
    { id: "analyst", label: "ANLY", role: "Data Analyst", x: 70, y: 105, tier: "worker" },
    { id: "fact-check", label: "FACT", role: "Fact Checker", x: 125, y: 105, tier: "worker" },
    { id: "writer", label: "WRIT", role: "Writer", x: 195, y: 105, tier: "worker" },
    { id: "editor", label: "EDIT", role: "Editor", x: 250, y: 105, tier: "worker" },
    { id: "publisher", label: "PUB", role: "Publisher", x: 305, y: 105, tier: "worker" },
  ];

  // Connections showing hierarchy and cross-team communication
  const connections = [
    // Orchestrator to managers
    { from: "orchestrator", to: "research-mgr", type: "command" },
    { from: "orchestrator", to: "content-mgr", type: "command" },
    
    // Research manager to workers
    { from: "research-mgr", to: "web-scraper", type: "delegate" },
    { from: "research-mgr", to: "analyst", type: "delegate" },
    { from: "research-mgr", to: "fact-check", type: "delegate" },
    
    // Content manager to workers
    { from: "content-mgr", to: "writer", type: "delegate" },
    { from: "content-mgr", to: "editor", type: "delegate" },
    { from: "content-mgr", to: "publisher", type: "delegate" },
    
    // Cross-team data flow
    { from: "analyst", to: "writer", type: "data" },
    { from: "fact-check", to: "editor", type: "data" },
  ];

  const getNodeById = (id: string) => nodes.find(n => n.id === id);

  const getConnectionOpacity = (fromId: string, toId: string) => {
    if (!hoveredNode) return 0.5;
    if (fromId === hoveredNode || toId === hoveredNode) return 1;
    return 0.15;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "leader": return "hsl(45 100% 60%)"; // Gold
      case "manager": return "hsl(var(--primary))";
      case "worker": return "hsl(var(--primary) / 0.7)";
      default: return "hsl(var(--primary))";
    }
  };

  const getNodeSize = (tier: string) => {
    switch (tier) {
      case "leader": return 36;
      case "manager": return 30;
      case "worker": return 26;
      default: return 26;
    }
  };

  return (
    <div className="relative w-full h-[160px]">
      <div className="absolute inset-0 bg-grid-fine opacity-30" />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 160" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow-line-hero" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <marker id="arrow-command" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="hsl(var(--primary))" fillOpacity="0.8" />
          </marker>
          <marker id="arrow-data" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" fill="hsl(160 100% 45%)" fillOpacity="0.8" />
          </marker>
        </defs>

        {connections.map((conn, i) => {
          const from = getNodeById(conn.from);
          const to = getNodeById(conn.to);
          if (!from || !to) return null;

          const fromSize = getNodeSize(from.tier);
          const toSize = getNodeSize(to.tier);
          const fromX = from.x + fromSize / 2;
          const fromY = from.y + fromSize;
          const toX = to.x + toSize / 2;
          const toY = to.y;
          
          const opacity = getConnectionOpacity(conn.from, conn.to);
          const isDataFlow = conn.type === "data";
          const strokeColor = isDataFlow ? "hsl(160 100% 45%)" : "hsl(var(--primary))";
          const markerId = isDataFlow ? "arrow-data" : "arrow-command";
          
          // Create curved paths for hierarchy, straight dashed for data flow
          const midY = (fromY + toY) / 2;
          const path = isDataFlow 
            ? `M ${fromX} ${fromY - 5} L ${toX} ${toY + 5}`
            : `M ${fromX} ${fromY} Q ${fromX} ${midY} ${(fromX + toX) / 2} ${midY} Q ${toX} ${midY} ${toX} ${toY}`;
          
          return (
            <g key={i}>
              <motion.path
                d={path}
                stroke={strokeColor}
                strokeWidth={isDataFlow ? 1 : 1.5}
                strokeDasharray={isDataFlow ? "4 3" : "none"}
                fill="none"
                filter="url(#glow-line-hero)"
                markerEnd={`url(#${markerId})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity * 0.7 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
              {/* Animated data particle */}
              <motion.circle
                r="2"
                fill={strokeColor}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  offsetDistance: ["0%", "100%"],
                }}
                transition={{
                  delay: 1 + i * 0.1,
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{ offsetPath: `path("${path}")` }}
              />
            </g>
          );
        })}
      </svg>

      {nodes.map((node, i) => {
        const isHovered = hoveredNode === node.id;
        const isDimmed = hoveredNode && !isHovered;
        const size = getNodeSize(node.tier);
        const tierColor = getTierColor(node.tier);
        
        return (
          <motion.div
            key={node.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1.06 : 1, 
              opacity: isDimmed ? 0.35 : 1 
            }}
            transition={{ delay: i * 0.04, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute"
            style={{ left: node.x, top: node.y }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="relative group cursor-pointer">
              <motion.div 
                className="absolute -inset-1.5 blur-md"
                style={{ backgroundColor: tierColor }}
                animate={{ opacity: isHovered ? 0.25 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div 
                className="relative flex items-center justify-center transition-colors duration-300"
                style={{ 
                  width: size, 
                  height: size,
                  backgroundColor: isHovered ? `${tierColor}20` : 'hsl(var(--card))',
                  border: `1px solid ${tierColor}`,
                  boxShadow: isHovered 
                    ? `0 0 20px ${tierColor}50` 
                    : `0 0 8px ${tierColor}25`
                }}
              >
                {/* Corner accents */}
                <div className="absolute -top-px -left-px w-1.5 h-1.5 border-l border-t" style={{ borderColor: tierColor }} />
                <div className="absolute -top-px -right-px w-1.5 h-1.5 border-r border-t" style={{ borderColor: tierColor }} />
                <div className="absolute -bottom-px -left-px w-1.5 h-1.5 border-l border-b" style={{ borderColor: tierColor }} />
                <div className="absolute -bottom-px -right-px w-1.5 h-1.5 border-r border-b" style={{ borderColor: tierColor }} />
                
                {/* Status indicator */}
                <div 
                  className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 border border-background" 
                  style={{ boxShadow: '0 0 4px #4ade80' }} 
                />
                
                {node.icon ? (
                  <span className="text-sm" style={{ color: tierColor }}>{node.icon}</span>
                ) : (
                  <div 
                    className="border" 
                    style={{ 
                      width: size * 0.35, 
                      height: size * 0.35, 
                      backgroundColor: `${tierColor}40`,
                      borderColor: `${tierColor}80`
                    }} 
                  />
                )}
              </motion.div>
              
              <span 
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] font-mono uppercase tracking-wider whitespace-nowrap"
                style={{ color: `${tierColor}90` }}
              >
                {node.label}
              </span>
              
              {/* Tooltip on hover */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-card border whitespace-nowrap pointer-events-none z-10"
                style={{ borderColor: `${tierColor}60` }}
              >
                <span className="text-[9px] font-mono" style={{ color: tierColor }}>{node.role}</span>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};


export default HeroSection;
