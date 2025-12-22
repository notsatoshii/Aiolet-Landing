import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const WhyAITeams = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeView, setActiveView] = useState<"single" | "team">("single");

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Real Work Requires Teams,{" "}
            <span className="text-gradient">Not Single Agents</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Single agents work for simple tasks. Real workflows don't stay simple.
            As complexity increases, reliability drops. Aiolet solves this by letting
            you run AI teams that behave more like real departments.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-xl bg-muted/30 p-1 border border-border/50">
            <button
              onClick={() => setActiveView("single")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeView === "single"
                  ? "bg-card text-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Single Agent
            </button>
            <button
              onClick={() => setActiveView("team")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeView === "team"
                  ? "bg-card text-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              AI Team
            </button>
          </div>
        </motion.div>

        {/* Comparison Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 md:p-12">
            <div className="relative h-[300px] md:h-[350px]">
              {activeView === "single" ? <SingleAgentView /> : <TeamAgentView />}
            </div>

            {/* Labels */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {activeView === "single" ? (
                <>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive border border-destructive/20 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    Bottlenecks
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive border border-destructive/20 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    Fragile
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive border border-destructive/20 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    Hard to scale
                  </span>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Parallel
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Structured
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Reliable
                  </span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SingleAgentView = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central overloaded node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-24 h-24 rounded-full bg-destructive/20 border-2 border-destructive/50 flex items-center justify-center animate-pulse">
          <span className="text-sm font-medium text-destructive">Agent</span>
        </div>
        
        {/* Warning indicator */}
        <div className="absolute -top-1 -right-1">
          <AlertTriangle className="w-6 h-6 text-destructive animate-pulse" />
        </div>

        {/* Chaotic branches */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="absolute w-16 h-0.5 bg-gradient-to-r from-destructive/50 to-transparent"
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "0 50%",
              left: "50%",
              top: "50%",
            }}
          >
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-destructive/30 border border-destructive/50"
              style={{ transform: `rotate(-${angle}deg)` }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Background chaos lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${Math.random() * 100}% ${Math.random() * 100}% Q ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%`}
            stroke="hsl(var(--destructive))"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
};

const TeamAgentView = () => {
  const agents = [
    { label: "Lead", x: "50%", y: "15%" },
    { label: "Research", x: "20%", y: "45%" },
    { label: "Create", x: "50%", y: "45%" },
    { label: "Review", x: "80%", y: "45%" },
    { label: "Execute", x: "50%", y: "75%" },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Lines from Lead to row 2 */}
        {[
          { x1: "50%", y1: "22%", x2: "20%", y2: "38%" },
          { x1: "50%", y1: "22%", x2: "50%", y2: "38%" },
          { x1: "50%", y1: "22%", x2: "80%", y2: "38%" },
          { x1: "20%", y1: "52%", x2: "50%", y2: "68%" },
          { x1: "50%", y1: "52%", x2: "50%", y2: "68%" },
          { x1: "80%", y1: "52%", x2: "50%", y2: "68%" },
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeOpacity="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          />
        ))}
      </svg>

      {/* Shared memory core */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
          </div>
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-secondary whitespace-nowrap">
          Shared Memory
        </span>
      </motion.div>

      {/* Agent nodes */}
      {agents.map((agent, i) => (
        <motion.div
          key={agent.label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: agent.x, top: agent.y }}
        >
          <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-primary/20 transition-all cursor-pointer group">
            <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
              {agent.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WhyAITeams;
