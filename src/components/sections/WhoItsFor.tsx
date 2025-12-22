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
    { icon: Search, label: "Research prosumers" },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-28 overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
            Built for <span className="text-primary">Operators</span>
          </h2>
          <p className="text-sm text-muted-foreground">Not experiments. Not demos. Real work.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.06 }}
            >
              <div className="group flex items-center gap-2.5 px-4 py-2.5 bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-200">
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <audience.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {audience.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
