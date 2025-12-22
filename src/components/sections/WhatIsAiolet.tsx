import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Terminal, Boxes, Activity, MessageSquare, GitBranch, LayoutGrid } from "lucide-react";
import { SciFiCard } from "@/components/ui/scifi-panel";

const WhatIsAiolet = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Parallax for cards
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const card1Y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [10, -10]); // Middle card moves least (anchor)
  const card3Y = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const cards = [
    {
      icon: Terminal,
      morphIcon: GitBranch,
      title: "Build",
      tag: "INPUT → STRUCTURE",
      description: "Describe your workflow in plain English. Aiolet generates the agents, tools, and logic.",
      parallax: card1Y,
    },
    {
      icon: Boxes,
      morphIcon: LayoutGrid,
      title: "Run",
      tag: "ORCHESTRATION",
      description: "Organize agents into teams with roles, shared memory, and parallel execution.",
      parallax: card2Y,
    },
    {
      icon: Activity,
      morphIcon: Activity,
      title: "Scale",
      tag: "OBSERVABILITY",
      description: "Monitor performance, update behavior, and expand without rebuilding.",
      parallax: card3Y,
    },
  ];

  return (
    <section ref={ref} id="features" className="relative py-24 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-hex-grid opacity-20" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest mb-6">
            <span className="w-1 h-1 bg-primary" />
            Core Functions
          </div>
          
          <h2 className="font-heading text-2xl md:text-3xl font-medium mb-5 tracking-wider">
            Build, Run, and Scale{" "}
            <span className="text-primary" style={{ textShadow: '0 0 30px hsl(var(--primary) / 0.5)' }}>AI Teams</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            An AI workspace for those blocked by scale. Describe what you want. 
            Get a working system of agents that collaborate and run reliably.
          </p>
          <p className="text-primary font-mono text-xs mt-4 tracking-widest uppercase">
            No code. No chaos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
          {cards.map((card, index) => (
            <MorphingCard key={card.title} card={card} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CardProps {
  card: {
    icon: React.ComponentType<{ className?: string }>;
    morphIcon: React.ComponentType<{ className?: string }>;
    title: string;
    tag: string;
    description: string;
    parallax: any;
  };
  index: number;
  isInView: boolean;
}

const MorphingCard = ({ card, index, isInView }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = card.icon;
  const MorphIcon = card.morphIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: "easeOut" }}
      style={{ y: card.parallax }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SciFiCard>
        <motion.div 
          className="p-6"
          animate={{ 
            y: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Tag */}
          <span className="inline-block text-[9px] font-mono text-primary/60 uppercase tracking-widest mb-4">
            {card.tag}
          </span>

          {/* Morphing Icon Area */}
          <div className="mb-4">
            <div className="relative w-14 h-14">
              <motion.div 
                className="absolute inset-0 bg-primary/20 blur-lg"
                animate={{ opacity: isHovered ? 0.8 : 0.4 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="relative w-full h-full bg-primary/10 border border-primary/30 flex items-center justify-center overflow-hidden"
                animate={{ 
                  backgroundColor: isHovered ? 'hsl(var(--primary) / 0.2)' : 'hsl(var(--primary) / 0.1)',
                  borderColor: isHovered ? 'hsl(var(--primary) / 0.5)' : 'hsl(var(--primary) / 0.3)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Default icon */}
                <motion.div
                  animate={{ 
                    opacity: isHovered ? 0 : 1,
                    scale: isHovered ? 0.8 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute"
                >
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>
                
                {/* Morphed mini-diagram */}
                <motion.div
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute"
                >
                  {card.title === "Build" && <BuildMiniDiagram />}
                  {card.title === "Run" && <RunMiniDiagram />}
                  {card.title === "Scale" && <ScaleMiniDiagram />}
                </motion.div>
              </motion.div>
            </div>
          </div>

          <h3 className="font-heading text-lg font-medium mb-2 tracking-wider uppercase">
            {card.title}
          </h3>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {card.description}
          </p>
          
          {/* Secondary line on hover */}
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              height: isHovered ? 'auto' : 0,
              marginTop: isHovered ? 8 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="text-xs text-primary/70 font-mono uppercase tracking-wider overflow-hidden"
          >
            {card.title === "Build" && "→ Intent becomes structure"}
            {card.title === "Run" && "→ Coordination, not chaos"}
            {card.title === "Scale" && "→ Grow without rebuilding"}
          </motion.p>
        </motion.div>
      </SciFiCard>
    </motion.div>
  );
};

// Mini diagrams for morphing effect
const BuildMiniDiagram = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    {/* Chat bubble morphing to nodes */}
    <rect x="4" y="10" width="6" height="6" stroke="hsl(var(--primary))" strokeWidth="1" fill="hsl(var(--primary) / 0.2)" />
    <line x1="10" y1="13" x2="14" y2="13" stroke="hsl(var(--primary))" strokeWidth="1" />
    <rect x="14" y="6" width="5" height="5" stroke="hsl(var(--primary))" strokeWidth="1" fill="hsl(var(--primary) / 0.2)" />
    <rect x="14" y="16" width="5" height="5" stroke="hsl(var(--primary))" strokeWidth="1" fill="hsl(var(--primary) / 0.2)" />
    <line x1="19" y1="8.5" x2="23" y2="8.5" stroke="hsl(var(--primary))" strokeWidth="1" />
    <line x1="19" y1="18.5" x2="23" y2="18.5" stroke="hsl(var(--primary))" strokeWidth="1" />
  </svg>
);

const RunMiniDiagram = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    {/* Single node splitting into cluster */}
    <rect x="11" y="4" width="6" height="6" stroke="hsl(var(--primary))" strokeWidth="1" fill="hsl(var(--primary) / 0.3)" />
    <line x1="14" y1="10" x2="14" y2="13" stroke="hsl(var(--primary))" strokeWidth="1" />
    <line x1="14" y1="13" x2="6" y2="18" stroke="hsl(var(--primary))" strokeWidth="1" />
    <line x1="14" y1="13" x2="14" y2="18" stroke="hsl(var(--primary))" strokeWidth="1" />
    <line x1="14" y1="13" x2="22" y2="18" stroke="hsl(var(--primary))" strokeWidth="1" />
    <rect x="3" y="18" width="5" height="5" stroke="hsl(var(--primary))" strokeWidth="1" fill="hsl(var(--primary) / 0.2)" />
    <rect x="11.5" y="18" width="5" height="5" stroke="hsl(var(--primary))" strokeWidth="1" fill="hsl(var(--primary) / 0.2)" />
    <rect x="20" y="18" width="5" height="5" stroke="hsl(var(--primary))" strokeWidth="1" fill="hsl(var(--primary) / 0.2)" />
  </svg>
);

const ScaleMiniDiagram = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    {/* Expanding grid */}
    <rect x="11" y="11" width="6" height="6" stroke="hsl(var(--primary))" strokeWidth="1" fill="hsl(var(--primary) / 0.3)" />
    <rect x="3" y="3" width="4" height="4" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="hsl(var(--primary) / 0.1)" opacity="0.7" />
    <rect x="21" y="3" width="4" height="4" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="hsl(var(--primary) / 0.1)" opacity="0.7" />
    <rect x="3" y="21" width="4" height="4" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="hsl(var(--primary) / 0.1)" opacity="0.7" />
    <rect x="21" y="21" width="4" height="4" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="hsl(var(--primary) / 0.1)" opacity="0.7" />
    <line x1="11" y1="14" x2="7" y2="14" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.5" />
    <line x1="17" y1="14" x2="21" y2="14" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.5" />
    <line x1="14" y1="11" x2="14" y2="7" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.5" />
    <line x1="14" y1="17" x2="14" y2="21" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

export default WhatIsAiolet;
