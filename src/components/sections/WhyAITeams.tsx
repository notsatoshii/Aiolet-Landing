import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SciFiPanel } from "@/components/ui/scifi-panel";

const WhyAITeams = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeView, setActiveView] = useState<"single" | "team">("single");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" 
        style={{ y: bgY }}
      />
      <div className="absolute inset-0 noise-overlay" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest mb-6">
            <span className="w-1 h-1 bg-primary" />
            Architecture
          </div>
          
          <h2 className="font-heading text-2xl md:text-3xl font-medium mb-5 tracking-wider">
            Teams Outperform{" "}
            <span className="text-primary" style={{ textShadow: '0 0 30px hsl(var(--primary) / 0.5)' }}>Single Agents</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            As complexity increases, reliability drops. AI teams behave like real departments — 
            parallel, structured, and reliable.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-card border-2 border-primary/40 shadow-lg shadow-primary/10">
            <button
              onClick={() => setActiveView("single")}
              className={`px-6 py-3 text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                activeView === "single"
                  ? "bg-red-500/20 text-red-400 border-r border-red-500/30"
                  : "text-muted-foreground hover:text-foreground border-r border-primary/20"
              }`}
            >
              ⚠ Single Agent
            </button>
            <button
              onClick={() => setActiveView("team")}
              className={`px-6 py-3 text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                activeView === "team"
                  ? "bg-green-500/20 text-green-400"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ✓ AI Team
            </button>
          </div>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <SciFiPanel label={activeView === "single" ? "Single Agent Mode — Bottleneck" : "Team Mode — Parallel Execution"}>
            <div className="p-6 md:p-8">
              <div className="relative h-[420px] md:h-[480px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    {activeView === "single" ? <SingleAgentView /> : <TeamAgentView />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Legend */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex flex-wrap justify-center gap-4 text-[10px] font-mono uppercase tracking-wider text-muted-foreground"
              >
                {activeView === "team" ? (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm border-2 border-yellow-400 bg-yellow-400/20" />
                      <span>Orchestrator</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm border-2 border-primary bg-primary/20" />
                      <span>Leads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm border-2 border-cyan-400 bg-cyan-400/20" />
                      <span>Workers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-px bg-primary" />
                      <span>Command</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-px bg-green-400" style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(142 76% 56%), hsl(142 76% 56%) 4px, transparent 4px, transparent 8px)' }} />
                      <span>Data Flow</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm border-2 border-red-500 bg-red-500/20" />
                      <span>Overloaded Agent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-red-500/80" />
                      <span>Failed Task</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-yellow-500/80" />
                      <span>Timeout</span>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </SciFiPanel>
        </motion.div>
      </div>
    </section>
  );
};

// ============ SINGLE AGENT VIEW ============
const SingleAgentView = () => {
  const [tasksState, setTasksState] = useState<Array<{ id: number; status: 'pending' | 'processing' | 'failed' | 'timeout' | 'complete' }>>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initialize 10 tasks
    const initialTasks = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      status: 'pending' as const
    }));
    setTasksState(initialTasks);
    setCompletedCount(0);
    setFailedCount(0);
    setProgress(0);

    // Simulate processing with failures
    const results = [
      { delay: 800, result: 'complete' },
      { delay: 1500, result: 'complete' },
      { delay: 2200, result: 'failed' },
      { delay: 2900, result: 'complete' },
      { delay: 3500, result: 'timeout' },
      { delay: 4200, result: 'failed' },
      { delay: 4800, result: 'timeout' },
      { delay: 5400, result: 'failed' },
      { delay: 6000, result: 'timeout' },
      { delay: 6500, result: 'failed' },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    results.forEach((r, i) => {
      // Start processing
      const processingTimeout = setTimeout(() => {
        setTasksState(prev => prev.map((t, idx) => 
          idx === i ? { ...t, status: 'processing' } : t
        ));
      }, r.delay - 400);
      timeouts.push(processingTimeout);

      // Complete/fail
      const resultTimeout = setTimeout(() => {
        setTasksState(prev => prev.map((t, idx) => 
          idx === i ? { ...t, status: r.result as 'complete' | 'failed' | 'timeout' } : t
        ));
        if (r.result === 'complete') {
          setCompletedCount(prev => prev + 1);
          setProgress(prev => Math.min(prev + 10, 30));
        } else {
          setFailedCount(prev => prev + 1);
        }
      }, r.delay);
      timeouts.push(resultTimeout);
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-fine opacity-20" />
      
      {/* Metrics Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-0 left-0 bg-card/80 border border-red-500/30 p-4"
      >
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">Performance</div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-mono text-red-400">{completedCount}</span>
          <span className="text-lg font-mono text-muted-foreground">/10</span>
        </div>
        <div className="text-[10px] font-mono text-red-400 mt-1">
          {failedCount} FAILED
        </div>
        
        {/* Stalling progress bar */}
        <div className="mt-3 w-32 h-1.5 bg-muted/30 border border-red-500/20">
          <motion.div 
            className="h-full bg-red-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-[9px] font-mono text-red-400/70 mt-1">STALLED</div>
      </motion.div>

      {/* Central Agent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Stress glow */}
          <motion.div 
            className="absolute -inset-8 bg-red-500/30 blur-2xl rounded-full"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Agent box */}
          <div className="relative w-28 h-28 bg-card border-2 border-red-500 flex flex-col items-center justify-center">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-red-500" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-red-500" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-red-500" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-red-500" />
            
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-xs font-mono text-red-400 uppercase tracking-widest"
            >
              AGENT
            </motion.div>
            <div className="text-[10px] font-mono text-red-500/70 mt-1">OVERLOADED</div>
            
            {/* Stress indicator */}
            <motion.div 
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-red-500/20 border border-red-500/50"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <span className="text-[8px] font-mono text-red-400">CPU 100%</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Task Queue (left side) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute left-8 top-1/2 -translate-y-1/2"
      >
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
          Task Queue
        </div>
        <div className="flex flex-col gap-1.5">
          {tasksState.slice(0, 5).map((task, i) => (
            <TaskBlock key={task.id} index={i} status={task.status} />
          ))}
        </div>
      </motion.div>

      {/* Results (right side) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute right-8 top-1/2 -translate-y-1/2"
      >
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
          Results
        </div>
        <div className="flex flex-col gap-1.5">
          {tasksState.slice(5).map((task, i) => (
            <TaskBlock key={task.id} index={i + 5} status={task.status} side="right" />
          ))}
        </div>
      </motion.div>

      {/* Incoming arrows - responsive using percentages */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[...Array(5)].map((_, i) => (
          <motion.g key={`arrow-in-${i}`}>
            <motion.line
              x1="15"
              y1={30 + i * 10}
              x2="40"
              y2={45 + i * 2}
              stroke="url(#grad-in)"
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
            />
            <polygon 
              points="40,43 40,47 43,45" 
              fill="hsl(0 70% 50%)" 
              opacity="0.8"
              style={{ transform: `translateY(${i * 2}px)` }}
            />
          </motion.g>
        ))}
        <defs>
          <linearGradient id="grad-in" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(0 70% 50%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(0 70% 50%)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="grad-out-fail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(0 70% 50%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(0 70% 50%)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="grad-out-success" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(142 76% 56%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(142 76% 56%)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Outgoing arrows */}
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={`arrow-out-${i}`}
            x1="60"
            y1={45 + i * 2}
            x2="85"
            y2={30 + i * 10}
            stroke={i < 1 ? "url(#grad-out-success)" : "url(#grad-out-fail)"}
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={{ opacity: i < 1 ? [0.8, 1, 0.8] : [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </svg>
      {/* Status badges */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
        <StatusLabel label="Bottlenecks" variant="error" />
        <StatusLabel label="Fragile" variant="error" />
        <StatusLabel label="Limited" variant="error" />
      </div>
    </div>
  );
};

const TaskBlock = ({ index, status, side = 'left' }: { index: number; status: string; side?: 'left' | 'right' }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'complete':
        return 'bg-green-500/80 border-green-400 text-green-200';
      case 'failed':
        return 'bg-red-500/80 border-red-400 text-red-200';
      case 'timeout':
        return 'bg-yellow-500/80 border-yellow-400 text-yellow-200';
      case 'processing':
        return 'bg-primary/60 border-primary text-primary-foreground animate-pulse';
      default:
        return 'bg-muted/40 border-muted-foreground/30 text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'complete': return '✓';
      case 'failed': return '✕';
      case 'timeout': return '⏱';
      case 'processing': return '◌';
      default: return '○';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -10 : 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`w-16 h-7 border flex items-center justify-center gap-1 ${getStatusStyle()}`}
    >
      <span className="text-[9px]">{getStatusIcon()}</span>
      <span className="text-[9px] font-mono">T{index + 1}</span>
    </motion.div>
  );
};

// ============ TEAM AGENT VIEW ============
const TeamAgentView = () => {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    // Animate completion counter
    const interval = setInterval(() => {
      setCompletedCount(prev => {
        if (prev >= 10) {
          clearInterval(interval);
          return 10;
        }
        return prev + 1;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const departments = [
    {
      name: 'Research',
      color: 'hsl(200 80% 55%)',
      lead: { id: 'research-lead', label: 'R-LEAD', status: 'active' },
      workers: [
        { id: 'scraper', label: 'SCRAPER', status: 'complete' },
        { id: 'analyst', label: 'ANALYST', status: 'active' },
      ]
    },
    {
      name: 'Content',
      color: 'hsl(var(--primary))',
      lead: { id: 'content-lead', label: 'C-LEAD', status: 'active' },
      workers: [
        { id: 'writer', label: 'WRITER', status: 'active' },
        { id: 'editor', label: 'EDITOR', status: 'idle' },
      ]
    },
    {
      name: 'Ops',
      color: 'hsl(160 70% 50%)',
      lead: { id: 'ops-lead', label: 'O-LEAD', status: 'idle' },
      workers: [
        { id: 'qa', label: 'QA', status: 'idle' },
        { id: 'publisher', label: 'PUB', status: 'idle' },
      ]
    }
  ];

  return (
    <div className="relative w-full h-full">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-fine opacity-15" />

      {/* Metrics Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-0 left-0 bg-card/80 border border-green-500/30 p-4"
      >
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">Performance</div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-mono text-green-400">{completedCount}</span>
          <span className="text-lg font-mono text-muted-foreground">/10</span>
        </div>
        <div className="text-[10px] font-mono text-green-400 mt-1">
          0 FAILED
        </div>
        
        {/* Success progress bar */}
        <div className="mt-3 w-32 h-1.5 bg-muted/30 border border-green-500/20">
          <motion.div 
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${completedCount * 10}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-[9px] font-mono text-green-400/70 mt-1">OPTIMAL</div>
      </motion.div>

      {/* Orchestrator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute left-1/2 -translate-x-1/2 top-4"
      >
        <AgentNode 
          label="ORCHESTRATOR" 
          color="hsl(45 100% 60%)" 
          size="lg" 
          status="active"
        />
      </motion.div>

      {/* Command lines from Orchestrator to Leads - using viewBox for proper scaling */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 0 }}>
        <defs>
          <marker id="arrow-cmd-team" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="hsl(45 100% 60%)" fillOpacity="0.8" />
          </marker>
        </defs>
        
        {/* Orchestrator to leads - percentage-based coordinates */}
        {departments.map((dept, i) => {
          // Calculate x positions for 3 departments: 20%, 50%, 80%
          const xPos = 20 + i * 30;
          return (
            <motion.g key={dept.name}>
              <motion.line
                x1="50"
                y1="18"
                x2={xPos}
                y2="32"
                stroke="hsl(45 100% 60%)"
                strokeWidth="0.4"
                strokeOpacity="0.6"
                vectorEffect="non-scaling-stroke"
                markerEnd="url(#arrow-cmd-team)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              />
              {/* Animated particle */}
              <motion.circle
                r="0.8"
                fill="hsl(45 100% 60%)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  cx: [50, xPos],
                  cy: [18, 32]
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.8 + i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            </motion.g>
          );
        })}

        {/* Data flows between workers - percentage based */}
        <motion.line
          x1="30"
          y1="60"
          x2="50"
          y2="60"
          stroke="hsl(160 70% 50%)"
          strokeWidth="0.4"
          strokeDasharray="1.5 1"
          strokeOpacity="0.6"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        />
        <motion.line
          x1="60"
          y1="60"
          x2="78"
          y2="60"
          stroke="hsl(160 70% 50%)"
          strokeWidth="0.4"
          strokeDasharray="1.5 1"
          strokeOpacity="0.6"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        />
      </svg>

      {/* Departments */}
      <div className="absolute inset-x-4 top-[130px] flex justify-center gap-4 md:gap-8">
        {departments.map((dept, deptIndex) => (
          <motion.div
            key={dept.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + deptIndex * 0.1 }}
            className="flex-1 max-w-[180px]"
          >
            {/* Department container */}
            <div 
              className="border rounded-sm p-3 bg-card/40"
              style={{ borderColor: `${dept.color}40` }}
            >
              {/* Department name */}
              <div 
                className="text-[10px] font-mono uppercase tracking-widest mb-3 pb-2 border-b text-center"
                style={{ color: dept.color, borderColor: `${dept.color}30` }}
              >
                {dept.name}
              </div>

              {/* Lead */}
              <div className="flex justify-center mb-4">
                <AgentNode 
                  label={dept.lead.label} 
                  color={dept.color} 
                  size="md" 
                  status={dept.lead.status as 'active' | 'idle' | 'complete'}
                />
              </div>

              {/* Workers */}
              <div className="flex justify-center gap-2">
                {dept.workers.map((worker, wIndex) => (
                  <motion.div
                    key={worker.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + deptIndex * 0.1 + wIndex * 0.05 }}
                  >
                    <AgentNode 
                      label={worker.label} 
                      color="hsl(185 80% 55%)" 
                      size="sm" 
                      status={worker.status as 'active' | 'idle' | 'complete'}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Data particles flowing */}
      <DataParticles />

      {/* Status badges */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
        <StatusLabel label="Parallel" variant="success" />
        <StatusLabel label="Structured" variant="success" />
        <StatusLabel label="Reliable" variant="success" />
      </div>
    </div>
  );
};

const AgentNode = ({ 
  label, 
  color, 
  size = 'md',
  status = 'idle'
}: { 
  label: string; 
  color: string; 
  size?: 'sm' | 'md' | 'lg';
  status?: 'idle' | 'active' | 'complete';
}) => {
  const sizeClasses = {
    sm: 'w-14 h-10 text-[8px]',
    md: 'w-16 h-11 text-[9px]',
    lg: 'w-24 h-12 text-[10px]'
  };

  const statusColors = {
    idle: 'bg-muted-foreground/50',
    active: 'bg-primary animate-pulse',
    complete: 'bg-green-400'
  };

  return (
    <div className="relative group">
      {/* Glow effect */}
      <motion.div 
        className="absolute -inset-2 blur-lg opacity-0 group-hover:opacity-40 transition-opacity"
        style={{ backgroundColor: color }}
      />
      
      <div 
        className={`relative ${sizeClasses[size]} bg-card border-2 flex items-center justify-center transition-all group-hover:scale-105`}
        style={{ borderColor: color }}
      >
        {/* Corner accents */}
        <div className="absolute -top-px -left-px w-2 h-2 border-l-2 border-t-2" style={{ borderColor: color }} />
        <div className="absolute -top-px -right-px w-2 h-2 border-r-2 border-t-2" style={{ borderColor: color }} />
        <div className="absolute -bottom-px -left-px w-2 h-2 border-l-2 border-b-2" style={{ borderColor: color }} />
        <div className="absolute -bottom-px -right-px w-2 h-2 border-r-2 border-b-2" style={{ borderColor: color }} />

        {/* Status indicator */}
        <div 
          className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${statusColors[status]}`}
          style={{ boxShadow: status === 'active' ? `0 0 8px ${color}` : 'none' }}
        />

        <span className="font-mono uppercase tracking-wider" style={{ color }}>
          {label}
        </span>
      </div>
    </div>
  );
};

const DataParticles = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Animated particles flowing between nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={i}
          r="0.6"
          fill="hsl(160 70% 50%)"
          filter="url(#glow-particle)"
          initial={{ 
            cx: 20, 
            cy: 55, 
            opacity: 0 
          }}
          animate={{ 
            cx: [20, 50, 80],
            cy: [55, 50, 55],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "linear"
          }}
        />
      ))}
      <defs>
        <filter id="glow-particle" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

const StatusLabel = ({ label, variant }: { label: string; variant: "success" | "error" }) => {
  const styles = variant === "success"
    ? "bg-green-500/10 text-green-400 border-green-500/30"
    : "bg-red-500/10 text-red-400 border-red-500/30";
  
  const dotStyle = variant === "success" 
    ? "bg-green-400" 
    : "bg-red-400";

  return (
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 border text-[10px] font-mono uppercase tracking-widest ${styles}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`} style={{ boxShadow: `0 0 6px currentColor` }} />
      {label}
    </motion.span>
  );
};

export default WhyAITeams;
