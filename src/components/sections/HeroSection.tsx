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
  return (
    <div className="relative w-full h-[160px]">
      <div className="absolute inset-0 bg-grid-fine opacity-30" />
      
      {/* Grid-based layout for perfect alignment */}
      <div className="relative w-full h-full flex flex-col items-center gap-0 py-1">
        
        {/* Row 1: Orchestrator */}
        <div className="flex justify-center w-full relative z-10">
          <WorkflowNode label="ORCH" role="Orchestrator" tier="leader" icon="◈" />
        </div>

        {/* Connector: Orchestrator to Managers */}
        <div className="w-full flex justify-center relative h-5">
          {/* Vertical line from orchestrator */}
          <motion.div 
            className="absolute top-0 left-1/2 w-px h-1/2 bg-primary/50"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            style={{ transformOrigin: 'top' }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
          {/* Horizontal bar */}
          <motion.div 
            className="absolute top-1/2 left-1/4 w-1/2 h-px bg-primary/50"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          />
          {/* Left drop */}
          <motion.div 
            className="absolute top-1/2 left-1/4 w-px h-1/2 bg-primary/50"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            style={{ transformOrigin: 'top' }}
            transition={{ duration: 0.2, delay: 0.4 }}
          />
          {/* Right drop */}
          <motion.div 
            className="absolute top-1/2 right-1/4 w-px h-1/2 bg-primary/50"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            style={{ transformOrigin: 'top' }}
            transition={{ duration: 0.2, delay: 0.4 }}
          />
        </div>

        {/* Row 2: Managers */}
        <div className="flex justify-around w-full px-2 relative z-10">
          <WorkflowNode label="R-MGR" role="Research Lead" tier="manager" />
          <WorkflowNode label="C-MGR" role="Content Lead" tier="manager" />
        </div>

        {/* Connector: Managers to Workers */}
        <div className="w-full flex relative h-5">
          {/* Left team connectors */}
          <div className="flex-1 relative">
            {/* Vertical from R-MGR */}
            <motion.div 
              className="absolute top-0 left-1/2 w-px h-1/2 bg-primary/40"
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              style={{ transformOrigin: 'top' }}
              transition={{ duration: 0.2, delay: 0.5 }}
            />
            {/* Horizontal bar for left workers */}
            <motion.div 
              className="absolute top-1/2 left-[15%] w-[70%] h-px bg-primary/40"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.55 }}
            />
            {/* Drops to 3 workers */}
            <motion.div className="absolute top-1/2 left-[15%] w-px h-1/2 bg-primary/40" />
            <motion.div className="absolute top-1/2 left-1/2 w-px h-1/2 bg-primary/40" />
            <motion.div className="absolute top-1/2 left-[85%] w-px h-1/2 bg-primary/40" />
          </div>
          
          {/* Right team connectors */}
          <div className="flex-1 relative">
            {/* Vertical from C-MGR */}
            <motion.div 
              className="absolute top-0 left-1/2 w-px h-1/2 bg-primary/40"
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              style={{ transformOrigin: 'top' }}
              transition={{ duration: 0.2, delay: 0.5 }}
            />
            {/* Horizontal bar for right workers */}
            <motion.div 
              className="absolute top-1/2 left-[15%] w-[70%] h-px bg-primary/40"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.55 }}
            />
            {/* Drops to 3 workers */}
            <motion.div className="absolute top-1/2 left-[15%] w-px h-1/2 bg-primary/40" />
            <motion.div className="absolute top-1/2 left-1/2 w-px h-1/2 bg-primary/40" />
            <motion.div className="absolute top-1/2 left-[85%] w-px h-1/2 bg-primary/40" />
          </div>
        </div>

        {/* Row 3: Workers - split into two teams */}
        <div className="flex w-full relative z-10">
          {/* Left team: Research workers */}
          <div className="flex-1 flex justify-around px-1">
            <WorkflowNode label="SCRP" role="Scraper" tier="worker" />
            <WorkflowNode label="ANLY" role="Analyst" tier="worker" />
            <WorkflowNode label="FACT" role="Fact Check" tier="worker" />
          </div>
          {/* Right team: Content workers */}
          <div className="flex-1 flex justify-around px-1">
            <WorkflowNode label="WRIT" role="Writer" tier="worker" />
            <WorkflowNode label="EDIT" role="Editor" tier="worker" />
            <WorkflowNode label="PUB" role="Publisher" tier="worker" />
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkflowNode = ({ 
  label, 
  role, 
  tier, 
  icon 
}: { 
  label: string; 
  role: string; 
  tier: 'leader' | 'manager' | 'worker';
  icon?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const tierColor = {
    leader: "hsl(45 100% 60%)",
    manager: "hsl(var(--primary))",
    worker: "hsl(var(--primary) / 0.8)"
  }[tier];
  
  const sizeClass = {
    leader: "w-8 h-8 sm:w-10 sm:h-10",
    manager: "w-6 h-6 sm:w-8 sm:h-8",
    worker: "w-5 h-5 sm:w-6 sm:h-6"
  }[tier];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.1 : 1 }}
        className={`relative ${sizeClass} flex items-center justify-center cursor-pointer`}
        style={{
          backgroundColor: isHovered ? `${tierColor}20` : 'hsl(var(--card))',
          border: `1px solid ${tierColor}`,
          boxShadow: isHovered ? `0 0 12px ${tierColor}50` : `0 0 4px ${tierColor}20`
        }}
      >
        {/* Corner accents */}
        <div className="absolute -top-px -left-px w-1 h-1 border-l border-t" style={{ borderColor: tierColor }} />
        <div className="absolute -top-px -right-px w-1 h-1 border-r border-t" style={{ borderColor: tierColor }} />
        <div className="absolute -bottom-px -left-px w-1 h-1 border-l border-b" style={{ borderColor: tierColor }} />
        <div className="absolute -bottom-px -right-px w-1 h-1 border-r border-b" style={{ borderColor: tierColor }} />
        
        {/* Status indicator */}
        <div 
          className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-green-400" 
          style={{ boxShadow: '0 0 3px #4ade80' }} 
        />
        
        {icon ? (
          <span className="text-[10px] sm:text-xs" style={{ color: tierColor }}>{icon}</span>
        ) : (
          <span className="text-[5px] sm:text-[7px] font-mono font-medium" style={{ color: tierColor }}>
            {label}
          </span>
        )}
      </motion.div>
      
      {/* Label below */}
      <span 
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[5px] sm:text-[6px] font-mono uppercase tracking-wider whitespace-nowrap"
        style={{ color: `${tierColor}` }}
      >
        {label}
      </span>
      
      {/* Tooltip on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-card border whitespace-nowrap pointer-events-none z-10"
          style={{ borderColor: `${tierColor}60` }}
        >
          <span className="text-[8px] font-mono" style={{ color: tierColor }}>{role}</span>
        </motion.div>
      )}
    </motion.div>
  );
};


export default HeroSection;
