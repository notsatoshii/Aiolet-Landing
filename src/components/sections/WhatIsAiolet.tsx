import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, Boxes, Activity } from "lucide-react";
import { SciFiCard } from "@/components/ui/scifi-panel";

const WhatIsAiolet = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: Terminal,
      title: "Build",
      tag: "INPUT → STRUCTURE",
      description:
        "Describe your workflow in plain English. Aiolet generates the agents, tools, and logic.",
    },
    {
      icon: Boxes,
      title: "Run",
      tag: "ORCHESTRATION",
      description:
        "Organize agents into teams with roles, shared memory, and parallel execution.",
    },
    {
      icon: Activity,
      title: "Scale",
      tag: "OBSERVABILITY",
      description:
        "Monitor performance, update behavior, and expand without rebuilding.",
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
          transition={{ duration: 0.5 }}
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
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
            >
              <SciFiCard>
                <div className="p-6">
                  {/* Tag */}
                  <span className="inline-block text-[9px] font-mono text-primary/60 uppercase tracking-widest mb-4">
                    {card.tag}
                  </span>

                  {/* Icon */}
                  <div className="mb-4">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 bg-primary/20 blur-lg" />
                      <div className="relative w-full h-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <card.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-medium mb-2 tracking-wider uppercase">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </SciFiCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsAiolet;
