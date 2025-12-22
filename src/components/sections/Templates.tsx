import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Users, Search, MessageSquare } from "lucide-react";
import { SciFiCard } from "@/components/ui/scifi-panel";

const Templates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const templates = [
    { icon: FileText, title: "Content Engine", tools: ["seo", "writer", "editor", "pub"] },
    { icon: Search, title: "Lead Generation", tools: ["scrape", "enrich", "score", "sync"] },
    { icon: Users, title: "Research & Monitor", tools: ["crawl", "analyze", "report", "alert"] },
    { icon: MessageSquare, title: "Community Ops", tools: ["respond", "triage", "escalate", "log"] },
  ];

  return (
    <section ref={ref} id="templates" className="relative py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-hex-grid opacity-20" />
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest mb-6">
            <span className="w-1 h-1 bg-primary" />Templates
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-medium mb-4 tracking-wider">
            Proven <span className="text-primary">AI Teams</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-4">
          {templates.map((t, i) => (
            <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.08 }}>
              <SciFiCard>
                <div className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                    <t.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm uppercase tracking-wider mb-2">{t.title}</h3>
                    <div className="flex gap-1.5 flex-wrap">
                      {t.tools.map((tool) => (
                        <span key={tool} className="px-2 py-0.5 text-[9px] font-mono bg-muted/50 text-muted-foreground uppercase tracking-wider">{tool}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </SciFiCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;
