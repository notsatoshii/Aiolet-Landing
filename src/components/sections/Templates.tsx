import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Lightbulb, Brain, TrendingUp, Handshake, 
  Megaphone, Headphones, LineChart, Video
} from "lucide-react";
import { InfiniteGridCard } from "@/components/ui/infinite-grid-card";

interface Template {
  icon: React.ElementType;
  title: string;
  archetype: string;
  primaryValue: string;
  description: string;
  agents: string[];
  tools: string[];
  category: "core" | "specialized";
}

const Templates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const templates: Template[] = [
    // Core Templates
    {
      icon: Lightbulb,
      title: "Idea → MVP Builder",
      archetype: "Solo Builder",
      primaryValue: "Time saving + clarity",
      description: "Turns raw ideas into scoped features. Breaks ideas into tasks, milestones, and priorities. Flags technical and UX risks early.",
      agents: ["Product Strategist", "Technical Architect", "UX Reviewer"],
      tools: ["Cursor", "Linear", "Notion", "GitHub"],
      category: "core"
    },
    {
      icon: Brain,
      title: "Founder's Second Brain",
      archetype: "Solo Builder / Operator",
      primaryValue: "Decision support + time saving",
      description: "Stores context across projects, ideas, and conversations. Helps with prioritization and tradeoffs. Answers \"What should I work on today?\"",
      agents: ["Memory Agent", "Strategy Agent", "Execution Planner"],
      tools: ["Notion", "Slack", "Calendar", "MCPs"],
      category: "core"
    },
    {
      icon: TrendingUp,
      title: "Growth & Distribution Engine",
      archetype: "Operator / Growth Lead",
      primaryValue: "Growth + distribution",
      description: "Scans trends and competitors. Generates content ideas. Handles replies, engagement, and iteration loops.",
      agents: ["Trend Scanner", "Content Generator", "Engagement Agent", "Performance Analyst"],
      tools: ["Twitter/X", "LinkedIn", "Reddit", "Analytics"],
      category: "core"
    },
    {
      icon: Handshake,
      title: "Outbound Sales & BD Machine",
      archetype: "Small Team / Operator",
      primaryValue: "Business development",
      description: "Researches leads and partners. Qualifies them automatically. Crafts personalized outreach and follow-ups. Maintains CRM memory.",
      agents: ["Research Agent", "Qualification Agent", "Outreach Agent", "Follow-up Agent"],
      tools: ["LinkedIn", "Email", "HubSpot", "Apollo"],
      category: "core"
    },
    {
      icon: Megaphone,
      title: "Marketing Campaign Studio",
      archetype: "Small Team / Startup",
      primaryValue: "Marketing + speed",
      description: "Plans campaigns end-to-end. Generates copy, visuals, and launch timelines. Coordinates multi-channel releases.",
      agents: ["Campaign Strategist", "Copy Agent", "Creative Agent", "QA / Brand Guard"],
      tools: ["Figma", "Canva", "Twitter/X", "Mailchimp"],
      category: "core"
    },
    {
      icon: Headphones,
      title: "Customer Support Command Center",
      archetype: "Startup / Operator",
      primaryValue: "Time saving + scale",
      description: "Handles frontline support. Diagnoses issues internally. Escalates only when needed. Learns from past tickets.",
      agents: ["Frontline Support Agent", "Diagnostic Agent", "Knowledge Agent", "Escalation Agent"],
      tools: ["Intercom", "Zendesk", "Slack", "Telegram"],
      category: "core"
    },
    // Specialized Templates
    {
      icon: LineChart,
      title: "Web3 Trader Intelligence Desk",
      archetype: "Trader (Web3-native)",
      primaryValue: "Signal + speed",
      description: "Ingests on-chain data, news, and social signals. Detects narrative shifts and anomalies. Stress-tests positions and scenarios.",
      agents: ["Data Ingestion Agent", "Signal Detection Agent", "Risk & Scenario Agent", "Decision Assistant"],
      tools: ["Telegram", "Dune", "DefiLlama", "Twitter/X"],
      category: "specialized"
    },
    {
      icon: Video,
      title: "Content Creator Growth Factory",
      archetype: "Content Creator",
      primaryValue: "Growth + consistency",
      description: "Turns long-form ideas into shorts, threads, and posts. Maintains voice and style. Optimizes timing, hooks, and formats.",
      agents: ["Ideation Agent", "Repurposing Agent", "Style & Voice Agent", "Analytics Agent"],
      tools: ["YouTube", "TikTok", "Twitter/X", "Opus Clip"],
      category: "specialized"
    },
  ];

  const coreTemplates = templates.filter(t => t.category === "core");
  const specializedTemplates = templates.filter(t => t.category === "specialized");

  return (
    <section ref={ref} id="templates" className="relative py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-hex-grid opacity-20" />
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest mb-6">
            <span className="w-1 h-1 bg-primary" />Templates
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-medium mb-4 tracking-wider">
            Proven <span className="text-primary" style={{ textShadow: '0 0 30px hsl(var(--primary) / 0.5)' }}>AI Teams</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Pre-built agent teams for common workflows. Deploy in minutes, customize as needed.
          </p>
        </motion.div>

        {/* Core Templates */}
        <div className="mb-10">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={isInView ? { opacity: 1 } : {}}
            className="flex items-center gap-2 mb-5"
          >
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest">Core Templates</span>
            <div className="flex-1 h-px bg-primary/20" />
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreTemplates.map((t, i) => (
              <TemplateCard 
                key={t.title} 
                template={t} 
                index={i} 
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Specialized Templates */}
        <div>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 mb-5"
          >
            <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest">Specialized Power Templates</span>
            <div className="flex-1 h-px bg-yellow-400/20" />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {specializedTemplates.map((t, i) => (
              <TemplateCard 
                key={t.title} 
                template={t} 
                index={i + coreTemplates.length} 
                isInView={isInView}
                isSpecialized
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TemplateCard = ({ 
  template, 
  index, 
  isInView, 
  isSpecialized = false 
}: { 
  template: Template; 
  index: number; 
  isInView: boolean;
  isSpecialized?: boolean;
}) => {
  const Icon = template.icon;
  const accentColor = isSpecialized ? "hsl(45 100% 60%)" : "hsl(var(--primary))";
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={isInView ? { opacity: 1, y: 0 } : {}} 
      transition={{ delay: 0.1 + index * 0.06 }}
    >
      <InfiniteGridCard className="h-full">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div 
              className="w-10 h-10 border flex items-center justify-center shrink-0"
              style={{ 
                borderColor: accentColor, 
                backgroundColor: `${accentColor}15`,
                boxShadow: `0 0 10px ${accentColor}20`
              }}
            >
              {/* Corner accents */}
              <div className="absolute -top-px -left-px w-1.5 h-1.5 border-l border-t" style={{ borderColor: accentColor }} />
              <div className="absolute -top-px -right-px w-1.5 h-1.5 border-r border-t" style={{ borderColor: accentColor }} />
              <div className="absolute -bottom-px -left-px w-1.5 h-1.5 border-l border-b" style={{ borderColor: accentColor }} />
              <div className="absolute -bottom-px -right-px w-1.5 h-1.5 border-r border-b" style={{ borderColor: accentColor }} />
              <Icon className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-sm uppercase tracking-wider mb-1" style={{ color: isSpecialized ? 'hsl(45 100% 70%)' : undefined }}>
                {template.title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                  {template.archetype}
                </span>
                <span className="text-[8px] text-muted-foreground">•</span>
                <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: accentColor }}>
                  {template.primaryValue}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
            {template.description}
          </p>

          {/* Agent Team */}
          <div className="mb-3">
            <span className="text-[8px] font-mono text-primary/50 uppercase tracking-widest block mb-1.5">Agent Team</span>
            <div className="flex gap-1.5 flex-wrap">
              {template.agents.map((agent) => (
                <span 
                  key={agent} 
                  className="px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider border"
                  style={{ 
                    backgroundColor: `${accentColor}10`,
                    borderColor: `${accentColor}30`,
                    color: accentColor
                  }}
                >
                  {agent}
                </span>
              ))}
            </div>
          </div>

          {/* Used Tools */}
          <div>
            <span className="text-[8px] font-mono text-muted-foreground/50 uppercase tracking-widest block mb-1.5">Integrations</span>
            <div className="flex gap-1.5 flex-wrap">
              {template.tools.map((tool) => (
                <span 
                  key={tool} 
                  className="px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider border border-border/50 bg-background/50 text-muted-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </InfiniteGridCard>
    </motion.div>
  );
};

export default Templates;
