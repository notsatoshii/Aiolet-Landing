import { motion, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";

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
        staggerChildren: 0.12,
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
    "Turn natural language into working agent workflows",
    "Organize multiple agents into structured teams",
    "Monitor, control, and scale with confidence",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[100px]" />
      
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
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              AI Team Orchestration Platform
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight mb-6"
            >
              Single AI Agents{" "}
              <span className="text-muted-foreground">Don't Scale.</span>
              <br />
              <span className="text-gradient">Teams Do.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Describe what you want in plain English.{" "}
              <span className="text-foreground font-medium">Aiolet</span> builds and runs structured AI teams you can monitor, manage, and trust.
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-2.5 mb-10">
              {bullets.map((bullet, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 text-muted-foreground text-sm"
                >
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Button variant="hero" size="lg" className="group">
                Join the Waitlist
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button variant="ghost-border" size="lg">
                See How It Works
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
            <div className="relative bg-card/60 backdrop-blur-sm rounded-xl border border-border p-5 shadow-xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-muted-foreground font-mono">aiolet.command</span>
                </div>
              </div>

              {/* Input Section */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground font-mono uppercase tracking-wide">input</span>
                </div>
                <div className="bg-background/50 rounded-lg p-3.5 border border-border/50 font-mono">
                  <p className="text-sm text-foreground/90 min-h-[40px] leading-relaxed">
                    <span className="text-primary">$</span> {typedText}
                    <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-cursor" />
                  </p>
                </div>
              </div>

              {/* Workflow Canvas */}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-mono uppercase tracking-wide">output</span>
                  {showWorkflow && (
                    <span className="flex items-center gap-1.5 text-xs font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-500">running</span>
                    </span>
                  )}
                </div>

                <div className="bg-background/50 rounded-lg p-5 border border-border/50 min-h-[180px] relative overflow-hidden">
                  {showWorkflow ? (
                    <WorkflowVisualization />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        processing...
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Subtle glow */}
            <div className="absolute -inset-2 bg-primary/3 rounded-2xl blur-xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WorkflowVisualization = () => {
  const agents = [
    { id: "research", label: "research", x: 30, y: 25, delay: 0 },
    { id: "write", label: "write", x: 120, y: 75, delay: 0.15 },
    { id: "review", label: "review", x: 210, y: 25, delay: 0.3 },
    { id: "post", label: "post", x: 300, y: 75, delay: 0.45 },
  ];

  return (
    <div className="relative w-full h-[140px]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 120">
        {/* Connection lines */}
        {[
          { x1: 60, y1: 42, x2: 120, y2: 72 },
          { x1: 150, y1: 72, x2: 210, y2: 42 },
          { x1: 240, y1: 42, x2: 300, y2: 72 },
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
          />
        ))}
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
          <div className="w-14 h-14 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group">
            <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">
              {agent.label}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Shared context indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary/60" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
