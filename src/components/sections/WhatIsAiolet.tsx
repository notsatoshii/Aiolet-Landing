import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, Boxes, Activity } from "lucide-react";

const WhatIsAiolet = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: Terminal,
      title: "Build",
      description:
        "Describe your workflow in plain English. Aiolet generates the agents, tools, and logic for you.",
      tag: "input → structure",
    },
    {
      icon: Boxes,
      title: "Run",
      description:
        "Organize agents into real teams with roles, shared memory, and parallel execution.",
      tag: "orchestration",
    },
    {
      icon: Activity,
      title: "Scale",
      description:
        "Monitor performance, update behavior, and expand without rebuilding from scratch.",
      tag: "observability",
    },
  ];

  return (
    <section ref={ref} id="features" className="relative py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine opacity-30" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-5 tracking-tight">
            Build, Run, and Scale{" "}
            <span className="text-primary">AI Teams</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Aiolet is an AI workspace for people who already use AI but are blocked by scale.
            Describe what you want in plain English. Aiolet turns it into a working system of
            AI agents that collaborate, share context, and run reliably.
          </p>
          <p className="text-primary font-medium mt-4 text-sm font-mono">
            No code. No prompt juggling. No chaos.
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
              <div className="group relative h-full bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-all duration-300">
                {/* Tag */}
                <span className="inline-block text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-4">
                  {card.tag}
                </span>

                {/* Icon */}
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <h3 className="font-heading text-lg font-medium mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>

                {/* Subtle indicator */}
                <div className="absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary/50 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsAiolet;
