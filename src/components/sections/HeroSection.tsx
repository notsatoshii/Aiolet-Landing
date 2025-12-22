import { motion, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Hexagon } from "lucide-react";
import { SciFiPanel } from "@/components/ui/scifi-panel";

const HeroSection = () => {
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Build me a content team that researches, writes, reviews, and posts daily.";

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
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const bullets = [
    "Natural language → agent workflows",
    "Multi-agent teams with structure",
    "Full observability and control",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-hex-grid opacity-30" />
      <div className="absolute inset-0 scanline-overlay" />
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Glowing orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      
      {/* Animated corner decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 border-l-2 border-t-2 border-primary/20 animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border-r-2 border-b-2 border-primary/20 animate-pulse-glow" />
      
      <div className="container relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
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
              <span className="text-primary animate-flicker">Teams Do.</span>
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
                  transition={{ delay: 0.6 + index * 0.1 }}
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
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button variant="ghost-border" size="lg" className="uppercase tracking-wider">
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
                      <span className="flex items-center gap-1.5 text-[10px] font-mono">
                        <span className="w-1.5 h-1.5 bg-green-400 animate-pulse" style={{ boxShadow: '0 0 6px #4ade80' }} />
                        <span className="text-green-400 uppercase">Executing</span>
                      </span>
                    )}
                  </div>

                  <div className="bg-background/60 rounded-sm p-5 border border-primary/20 min-h-[180px] relative overflow-hidden">
                    {showWorkflow ? (
                      <WorkflowVisualization />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-primary/60 text-sm font-mono">
                          <div className="w-2 h-2 bg-primary animate-pulse" />
                          <span className="uppercase tracking-widest">Processing</span>
                          <span className="animate-pulse">...</span>
                        </div>
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
  const agents = [
    { id: "research", label: "RSRCH", x: 20, y: 25, delay: 0 },
    { id: "write", label: "WRITE", x: 100, y: 75, delay: 0.15 },
    { id: "review", label: "REVW", x: 180, y: 25, delay: 0.3 },
    { id: "post", label: "POST", x: 260, y: 75, delay: 0.45 },
  ];

  return (
    <div className="relative w-full h-[140px]">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-fine opacity-50" />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 120">
        {/* Connection lines with glow */}
        {[
          { x1: 50, y1: 42, x2: 100, y2: 72 },
          { x1: 130, y1: 72, x2: 180, y2: 42 },
          { x1: 210, y1: 42, x2: 260, y2: 72 },
        ].map((line, i) => (
          <g key={i}>
            <motion.line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeOpacity="0.2"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            />
            <motion.line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
            />
          </g>
        ))}
        
        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {agents.map((agent) => (
        <motion.div
          key={agent.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: agent.delay, duration: 0.3, ease: "easeOut" }}
          className="absolute"
          style={{ left: agent.x, top: agent.y }}
        >
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute inset-0 bg-primary/20 blur-md" />
            
            {/* Node */}
            <div className="relative w-12 h-12 bg-card border border-primary/40 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all cursor-pointer group"
                 style={{ boxShadow: '0 0 15px hsl(var(--primary) / 0.2)' }}>
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary" />
              
              <span className="text-[9px] font-mono text-primary group-hover:text-primary transition-colors tracking-wider">
                {agent.label}
              </span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Central hub */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 bg-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="relative w-full h-full bg-card border border-primary/60 rotate-45 flex items-center justify-center"
               style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.4)' }}>
            <div className="w-2 h-2 bg-primary -rotate-45" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
