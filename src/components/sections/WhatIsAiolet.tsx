import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Users, TrendingUp } from "lucide-react";

const WhatIsAiolet = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: MessageSquare,
      title: "Build",
      description:
        "Describe your workflow in plain English. Aiolet generates the agents, tools, and logic for you.",
    },
    {
      icon: Users,
      title: "Run",
      description:
        "Organize agents into real teams with roles, shared memory, and parallel execution.",
    },
    {
      icon: TrendingUp,
      title: "Scale",
      description:
        "Monitor performance, update behavior, and expand without rebuilding from scratch.",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background shift */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Build, Run, and Scale <span className="text-gradient">AI Teams</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Aiolet is an AI workspace built for people who already use AI, but are blocked by scale.
            Instead of stitching together fragile automations or juggling prompts, you describe what
            you want in plain English. Aiolet turns it into a working system of AI agents that
            collaborate, share context, and run reliably.
          </p>
          <p className="text-primary font-medium mt-4">
            No code. No prompt juggling. No chaos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            >
              <div className="group relative h-full bg-gradient-card rounded-2xl border border-border/50 p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
                {/* Icon container */}
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                    <card.icon className="w-7 h-7 text-primary" />
                  </div>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 w-14 h-14 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <h3 className="font-heading text-xl font-semibold mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {card.description}
                </p>

                {/* Animated indicator */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsAiolet;
