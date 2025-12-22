import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Activity, History, Settings, Power } from "lucide-react";

const SwarmManagement = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Eye, label: "Visual team structure" },
    { icon: Activity, label: "Activity logs and outputs" },
    { icon: History, label: "Version history and updates" },
    { icon: Settings, label: "Manual overrides" },
    { icon: Power, label: "Kill switch" },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/5" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              See Everything.{" "}
              <span className="text-gradient">Control Everything.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Most AI tools stop caring once the agent is deployed.
              Aiolet is built for what happens after. Run AI teams with
              visibility, structure, and control.
            </p>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={feature.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{feature.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">Content Team</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs rounded-md bg-muted hover:bg-muted/80 transition-colors">
                    Pause
                  </button>
                  <button className="px-3 py-1 text-xs rounded-md bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                    Override
                  </button>
                </div>
              </div>

              {/* Team Graph Mini */}
              <div className="p-6 border-b border-border/30">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Team Structure
                  </span>
                </div>
                <div className="relative h-24 bg-muted/10 rounded-lg p-4">
                  <div className="flex items-center justify-between h-full">
                    {["Research", "Write", "Review", "Post"].map((agent, i) => (
                      <motion.div
                        key={agent}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="relative"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                          <span className="text-[10px] font-medium">{agent}</span>
                        </div>
                        {i < 3 && (
                          <div className="absolute top-1/2 -right-6 w-4 h-0.5 bg-primary/30" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Live Activity
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { agent: "Research", action: "Completed keyword analysis", time: "2s ago", status: "success" },
                    { agent: "Write", action: "Generating draft...", time: "now", status: "active" },
                    { agent: "Review", action: "Waiting for input", time: "-", status: "pending" },
                  ].map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            log.status === "success"
                              ? "bg-green-500"
                              : log.status === "active"
                              ? "bg-secondary animate-pulse"
                              : "bg-muted-foreground"
                          }`}
                        />
                        <span className="text-xs font-medium text-primary">
                          {log.agent}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {log.action}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{log.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative layers */}
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl -z-10" />
            <div className="absolute inset-0 -translate-x-3 -translate-y-3 bg-card/30 rounded-2xl border border-border/20 -z-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SwarmManagement;
