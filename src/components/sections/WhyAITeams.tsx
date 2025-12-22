import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const WhyAITeams = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeView, setActiveView] = useState<"single" | "team">("single");

  return (
    <section ref={ref} className="relative py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/3 to-background" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-5 tracking-tight">
            Real Work Requires Teams,{" "}
            <span className="text-primary">Not Single Agents</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Single agents work for simple tasks. As complexity increases, reliability drops.
            Aiolet solves this by letting you run AI teams that behave like real departments.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex rounded-lg bg-muted/30 p-1 border border-border">
            <button
              onClick={() => setActiveView("single")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeView === "single"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Single Agent
            </button>
            <button
              onClick={() => setActiveView("team")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeView === "team"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              AI Team
            </button>
          </div>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="bg-card rounded-xl border border-border p-6 md:p-10">
            <div className="relative h-[260px] md:h-[300px]">
              {activeView === "single" ? <SingleAgentView /> : <TeamAgentView />}
            </div>

            {/* Status Labels */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {activeView === "single" ? (
                <>
                  <StatusLabel label="Bottlenecks" variant="warning" />
                  <StatusLabel label="Fragile" variant="warning" />
                  <StatusLabel label="Hard to scale" variant="warning" />
                </>
              ) : (
                <>
                  <StatusLabel label="Parallel" variant="success" />
                  <StatusLabel label="Structured" variant="success" />
                  <StatusLabel label="Reliable" variant="success" />
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatusLabel = ({ label, variant }: { label: string; variant: "success" | "warning" }) => {
  const styles = variant === "success"
    ? "bg-primary/10 text-primary border-primary/20"
    : "bg-destructive/10 text-destructive border-destructive/20";

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium ${styles}`}>
      <span className={`w-1 h-1 rounded-full ${variant === "success" ? "bg-primary" : "bg-destructive"}`} />
      {label}
    </span>
  );
};

const SingleAgentView = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        {/* Central overloaded node */}
        <div className="w-20 h-20 rounded-xl bg-destructive/10 border-2 border-destructive/40 flex items-center justify-center">
          <span className="text-xs font-mono text-destructive">agent</span>
        </div>
        
        {/* Warning pulse */}
        <div className="absolute inset-0 rounded-xl bg-destructive/10 animate-ping" style={{ animationDuration: '2s' }} />

        {/* Chaotic connections */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="absolute w-12 h-px bg-gradient-to-r from-destructive/40 to-transparent"
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "0 50%",
              left: "50%",
              top: "50%",
            }}
          >
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-sm bg-destructive/20 border border-destructive/40"
              style={{ transform: `rotate(-${angle}deg)` }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const TeamAgentView = () => {
  const agents = [
    { label: "lead", x: "50%", y: "12%" },
    { label: "research", x: "22%", y: "45%" },
    { label: "create", x: "50%", y: "45%" },
    { label: "review", x: "78%", y: "45%" },
    { label: "execute", x: "50%", y: "78%" },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full">
        {[
          { x1: "50%", y1: "20%", x2: "22%", y2: "38%" },
          { x1: "50%", y1: "20%", x2: "50%", y2: "38%" },
          { x1: "50%", y1: "20%", x2: "78%", y2: "38%" },
          { x1: "22%", y1: "52%", x2: "50%", y2: "70%" },
          { x1: "50%", y1: "52%", x2: "50%", y2: "70%" },
          { x1: "78%", y1: "52%", x2: "50%", y2: "70%" },
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
          />
        ))}
      </svg>

      {/* Shared context */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-12 h-12 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary/60" />
          </div>
        </div>
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-primary/60 whitespace-nowrap">
          context
        </span>
      </motion.div>

      {/* Agent nodes */}
      {agents.map((agent, i) => (
        <motion.div
          key={agent.label}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 + i * 0.08, ease: "easeOut" }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: agent.x, top: agent.y }}
        >
          <div className="w-14 h-14 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-colors cursor-pointer">
            <span className="text-[10px] font-mono text-muted-foreground">
              {agent.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WhyAITeams;
