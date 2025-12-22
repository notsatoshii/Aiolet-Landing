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
    <section ref={ref} className="relative py-24 lg:py-28 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-5 tracking-tight">
              See Everything.{" "}
              <span className="text-primary">Control Everything.</span>
            </h2>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              Most AI tools stop caring once the agent is deployed.
              Aiolet is built for what happens after. Run AI teams with
              visibility, structure, and control.
            </p>

            <ul className="space-y-3">
              {features.map((feature, index) => (
                <motion.li
                  key={feature.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {feature.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative"
          >
            <div className="relative bg-card rounded-xl border border-border overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-mono">content_team</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-2.5 py-1 text-[10px] font-mono rounded bg-muted hover:bg-muted/80 transition-colors text-muted-foreground">
                    pause
                  </button>
                  <button className="px-2.5 py-1 text-[10px] font-mono rounded bg-primary/15 text-primary hover:bg-primary/25 transition-colors">
                    override
                  </button>
                </div>
              </div>

              {/* Team Structure */}
              <div className="p-4 border-b border-border">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  structure
                </span>
                <div className="relative h-16 mt-3">
                  <div className="flex items-center justify-between h-full px-4">
                    {["research", "write", "review", "post"].map((agent, i) => (
                      <motion.div
                        key={agent}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        className="relative flex flex-col items-center"
                      >
                        <div className="w-10 h-10 rounded-md bg-background border border-border flex items-center justify-center">
                          <span className="text-[9px] font-mono text-muted-foreground">{agent}</span>
                        </div>
                        {i < 3 && (
                          <div className="absolute top-1/2 -right-6 w-3 h-px bg-border" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    activity
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { agent: "research", action: "completed keyword analysis", time: "2s", status: "done" },
                    { agent: "write", action: "generating draft...", time: "now", status: "active" },
                    { agent: "review", action: "waiting", time: "-", status: "pending" },
                  ].map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      className="flex items-center justify-between py-2 px-2.5 rounded-md bg-background/50"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            log.status === "done"
                              ? "bg-green-500"
                              : log.status === "active"
                              ? "bg-primary animate-pulse"
                              : "bg-muted-foreground/50"
                          }`}
                        />
                        <span className="text-[10px] font-mono text-primary">
                          {log.agent}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {log.action}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">{log.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Subtle depth */}
            <div className="absolute inset-0 -translate-x-2 -translate-y-2 bg-muted/20 rounded-xl border border-border -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SwarmManagement;
