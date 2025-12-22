import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Pen, Rocket, User, Briefcase, Search } from "lucide-react";

const WhoItsFor = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const audiences = [
    { icon: Pen, label: "Content operators" },
    { icon: Rocket, label: "Growth hackers" },
    { icon: User, label: "Indie founders" },
    { icon: Briefcase, label: "AI consultants" },
    { icon: Search, label: "Research-heavy prosumers" },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/5" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Built for <span className="text-gradient">Operators</span>, Not Experiments
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
            >
              <div className="group flex items-center gap-3 px-6 py-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <audience.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">{audience.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
