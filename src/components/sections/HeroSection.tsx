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
        setTimeout(() => setShowWorkflow(true), 500);
      }
    }, 35);
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
  
  const nodes = [
    { id: "input", label: "INPUT", role: "Trigger", x: 10, y: 50, icon: "→" },
    { id: "research", label: "RSRCH", role: "Researcher", x: 80, y: 50 },
    { id: "write", label: "WRITE", role: "Writer", x: 150, y: 50 },
    { id: "review", label: "REVW", role: "QA Reviewer", x: 220, y: 50 },
    { id: "post", label: "POST", role: "Publisher", x: 290, y: 50 },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
  ];

  const getConnectionOpacity = (fromIdx: number, toIdx: number) => {
    if (!hoveredNode) return 0.5;
    const fromNode = nodes[fromIdx];
    const toNode = nodes[toIdx];
    if (fromNode.id === hoveredNode || toNode.id === hoveredNode) return 0.9;
    return 0.2;
  };

  return (
    <div className="relative w-full h-[140px]">
      <div className="absolute inset-0 bg-grid-fine opacity-40" />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 140" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow-line" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="hsl(var(--primary))" fillOpacity="0.6" />
          </marker>
        </defs>

        {connections.map((conn, i) => {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          const fromX = from.x + 28;
          const toX = to.x + 2;
          const y = 70;
          const opacity = getConnectionOpacity(conn.from, conn.to);
          
          return (
            <g key={i}>
              <motion.line
                x1={fromX}
                y1={y}
                x2={toX}
                y2={y}
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                filter="url(#glow-line)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity * 0.4 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <motion.line
                x1={fromX}
                y1={y}
                x2={toX}
                y2={y}
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
                initial={{ opacity: 0 }}
                animate={{ opacity }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              />
              <motion.circle
                cx={fromX}
                cy={y}
                r="2"
                fill="hsl(var(--primary))"
                initial={{ cx: fromX, opacity: 0 }}
                animate={{ cx: toX, opacity: 0.8 }}
                transition={{ 
                  delay: 0.8 + i * 0.15, 
                  duration: 0.8, 
                  repeat: Infinity, 
                  repeatDelay: 2.5,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              />
            </g>
          );
        })}
      </svg>

      {nodes.map((node, i) => {
        const isHovered = hoveredNode === node.id;
        const isDimmed = hoveredNode && !isHovered;
        
        return (
          <motion.div
            key={node.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1.04 : 1, 
              opacity: isDimmed ? 0.4 : 1 
            }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute"
            style={{ left: node.x, top: node.y }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="relative group cursor-pointer">
              <motion.div 
                className="absolute -inset-1 bg-primary/15 blur-md"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div 
                className="relative w-[30px] h-[30px] bg-card border border-primary/50 flex items-center justify-center transition-colors duration-300"
                animate={{ 
                  borderColor: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.5)',
                  backgroundColor: isHovered ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--card))'
                }}
                style={{ boxShadow: isHovered ? '0 0 20px hsl(var(--primary) / 0.3)' : '0 0 12px hsl(var(--primary) / 0.15)' }}
              >
                <div className="absolute -top-px -left-px w-2 h-2 border-l border-t border-primary" />
                <div className="absolute -top-px -right-px w-2 h-2 border-r border-t border-primary" />
                <div className="absolute -bottom-px -left-px w-2 h-2 border-l border-b border-primary" />
                <div className="absolute -bottom-px -right-px w-2 h-2 border-r border-b border-primary" />
                
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 border border-background" 
                     style={{ boxShadow: '0 0 6px #4ade80' }} />
                
                {node.icon ? (
                  <span className="text-xs text-primary">{node.icon}</span>
                ) : (
                  <div className="w-2.5 h-2.5 bg-primary/40 border border-primary/60" />
                )}
              </motion.div>
              
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-primary/70 uppercase tracking-wider whitespace-nowrap">
                {node.label}
              </span>
              
              {/* Tooltip on hover */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-card border border-primary/40 whitespace-nowrap pointer-events-none"
              >
                <span className="text-[9px] font-mono text-primary">{node.role}</span>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HeroSection;
