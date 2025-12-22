import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Activity, History, Settings, Power } from "lucide-react";
import { SciFiPanel, DataDisplay } from "@/components/ui/scifi-panel";

const SwarmManagement = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Eye, label: "Visual team structure" },
    { icon: Activity, label: "Activity logs & outputs" },
    { icon: History, label: "Version history" },
    { icon: Settings, label: "Manual overrides" },
    { icon: Power, label: "Kill switch" },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest mb-6">
              <span className="w-1 h-1 bg-primary" />
              Control Plane
            </div>
            
            <h2 className="font-heading text-2xl md:text-3xl font-medium mb-5 tracking-wider">
              See Everything.{" "}
              <span className="text-primary" style={{ textShadow: '0 0 30px hsl(var(--primary) / 0.5)' }}>Control Everything.</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Most AI tools stop caring once deployed. Aiolet is built for what happens after. 
              Full visibility, structure, and control.
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
                  <div className="relative w-8 h-8 bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-mono uppercase tracking-wide text-[11px]">
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
            <SciFiPanel glowing label="System Monitor">
              <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-primary/20">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-400" style={{ boxShadow: '0 0 8px #4ade80' }} />
                    <span className="text-xs font-mono uppercase tracking-widest">content_team</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest bg-muted border border-border hover:border-primary/30 transition-colors">
                      Pause
                    </button>
                    <button className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors">
                      Override
                    </button>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-5 pb-5 border-b border-primary/20">
                  <DataDisplay label="Tasks/hr" value="847" trend="up" />
                  <DataDisplay label="Success" value="99.2%" trend="up" />
                  <DataDisplay label="Latency" value="120ms" trend="neutral" />
                </div>

                {/* Team Structure */}
                <div className="mb-5">
                  <span className="text-[9px] font-mono text-primary/60 uppercase tracking-widest mb-3 block">
                    › Structure
                  </span>
                  <div className="relative h-16 bg-background/50 border border-primary/20">
                    <div className="absolute inset-0 bg-grid-fine opacity-30" />
                    
                    {/* Connection lines SVG */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <marker id="arrow-sm" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                          <polygon points="0 0, 4 2, 0 4" fill="hsl(var(--primary))" fillOpacity="0.5" />
                        </marker>
                      </defs>
                      {[0, 1, 2].map((i) => (
                        <motion.line
                          key={i}
                          x1={`${12.5 + i * 25 + 5}%`}
                          y1="50%"
                          x2={`${12.5 + (i + 1) * 25 - 5}%`}
                          y2="50%"
                          stroke="hsl(var(--primary))"
                          strokeWidth="1"
                          markerEnd="url(#arrow-sm)"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 0.5 } : {}}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        />
                      ))}
                    </svg>
                    
                    <div className="relative flex items-center justify-around h-full px-4">
                      {["RSRCH", "WRITE", "REVW", "POST"].map((agent, i) => (
                        <motion.div
                          key={agent}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={isInView ? { scale: 1, opacity: 1 } : {}}
                          transition={{ delay: 0.4 + i * 0.08 }}
                          className="relative"
                        >
                          <div 
                            className="w-9 h-9 bg-card border border-primary/40 flex items-center justify-center"
                            style={{ boxShadow: '0 0 10px hsl(var(--primary) / 0.15)' }}
                          >
                            {/* Corner accents */}
                            <div className="absolute -top-px -left-px w-1.5 h-1.5 border-l border-t border-primary" />
                            <div className="absolute -top-px -right-px w-1.5 h-1.5 border-r border-t border-primary" />
                            <div className="absolute -bottom-px -left-px w-1.5 h-1.5 border-l border-b border-primary" />
                            <div className="absolute -bottom-px -right-px w-1.5 h-1.5 border-r border-b border-primary" />
                            
                            <span className="text-[7px] font-mono text-primary tracking-wider">{agent}</span>
                          </div>
                          {/* Status dot */}
                          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 border border-background" 
                               style={{ boxShadow: '0 0 4px #4ade80' }} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Activity Feed */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-3 h-3 text-primary/60" />
                    <span className="text-[9px] font-mono text-primary/60 uppercase tracking-widest">
                      Activity
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { agent: "RSRCH", action: "Keyword analysis complete", time: "2s", status: "done" },
                      { agent: "WRITE", action: "Generating draft...", time: "now", status: "active" },
                      { agent: "REVW", action: "Queued", time: "-", status: "pending" },
                    ].map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 + i * 0.08 }}
                        className="flex items-center justify-between py-2 px-2.5 bg-background/50 border border-primary/10"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-1.5 h-1.5 ${
                              log.status === "done"
                                ? "bg-green-400"
                                : log.status === "active"
                                ? "bg-primary animate-pulse"
                                : "bg-muted-foreground/50"
                            }`}
                            style={log.status === "done" ? { boxShadow: '0 0 6px #4ade80' } : log.status === "active" ? { boxShadow: '0 0 6px hsl(var(--primary))' } : {}}
                          />
                          <span className="text-[9px] font-mono text-primary tracking-wider">
                            {log.agent}
                          </span>
                          <span className="text-[9px] text-muted-foreground">
                            {log.action}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-muted-foreground">{log.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </SciFiPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SwarmManagement;
