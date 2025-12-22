import { motion, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
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
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const bullets = [
    "Turn natural language into working agent workflows",
    "Organize multiple agents into real teams with roles and structure",
    "See what your agents do, fix what breaks, and scale with confidence",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="container relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              Single AI Agents Don't Scale.{" "}
              <span className="text-gradient">Teams Do.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Describe what you want in plain English.{" "}
              <span className="text-foreground">Aiolet</span> builds and runs structured AI teams you can monitor, manage, and trust.
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-3 mb-10">
              {bullets.map((bullet, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.15 }}
                  className="flex items-start gap-3 text-muted-foreground text-sm md:text-base"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="hero" size="xl" className="group">
                Join the Waitlist
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="ghost-border" size="xl">
                See How It Works
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-2xl">
              {/* Chat Panel */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Input</span>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                  <p className="text-sm md:text-base text-foreground min-h-[48px]">
                    {typedText}
                    <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-blink" />
                  </p>
                </div>
              </div>

              {/* Workflow Canvas */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-2 h-2 rounded-full ${showWorkflow ? 'bg-green-500 animate-pulse-glow' : 'bg-muted'}`} />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {showWorkflow ? 'Team Created' : 'Processing...'}
                  </span>
                  {showWorkflow && (
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      Running
                    </span>
                  )}
                </div>

                <div className="bg-muted/20 rounded-lg p-6 border border-border/30 min-h-[200px] relative overflow-hidden">
                  {showWorkflow ? (
                    <WorkflowVisualization />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-shimmer w-full h-full absolute inset-0" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WorkflowVisualization = () => {
  const agents = [
    { id: "research", label: "Research", x: 50, y: 20, delay: 0 },
    { id: "write", label: "Write", x: 150, y: 80, delay: 0.2 },
    { id: "review", label: "Review", x: 250, y: 20, delay: 0.4 },
    { id: "post", label: "Post", x: 350, y: 80, delay: 0.6 },
  ];

  return (
    <div className="relative w-full h-[160px]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 140">
        {/* Connection lines */}
        {[
          { x1: 80, y1: 40, x2: 150, y2: 80 },
          { x1: 180, y1: 80, x2: 250, y2: 40 },
          { x1: 280, y1: 40, x2: 350, y2: 80 },
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="100"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
            opacity={0.5}
          />
        ))}
      </svg>

      {agents.map((agent) => (
        <motion.div
          key={agent.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: agent.delay, duration: 0.4, type: "spring" }}
          className="absolute"
          style={{ left: agent.x, top: agent.y }}
        >
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center backdrop-blur-sm hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer">
            <span className="text-xs font-medium text-foreground">{agent.label}</span>
          </div>
        </motion.div>
      ))}

      {/* Central memory indicator */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
