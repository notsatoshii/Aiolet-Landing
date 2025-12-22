import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Users, Search, MessageSquare } from "lucide-react";

const Templates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const templates = [
    {
      icon: FileText,
      title: "Content Engine Team",
      description: "Research, write, edit, and publish blog posts automatically",
      tools: ["seo_analyzer", "writer", "editor", "publisher"],
    },
    {
      icon: Search,
      title: "Lead Generation Team",
      description: "Find, qualify, and enrich leads from multiple sources",
      tools: ["scraper", "enricher", "scorer", "crm_sync"],
    },
    {
      icon: Users,
      title: "Research & Monitoring",
      description: "Track competitors, trends, and market signals in real-time",
      tools: ["crawler", "analyzer", "reporter", "alerter"],
    },
    {
      icon: MessageSquare,
      title: "Community Operations",
      description: "Manage support tickets, social mentions, and community engagement",
      tools: ["responder", "triage", "escalator", "analytics"],
    },
  ];

  return (
    <section ref={ref} id="templates" className="relative py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine opacity-20" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-5 tracking-tight">
            Start With <span className="text-primary">Proven AI Teams</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Don't start from scratch. Use ready-made AI teams designed for real workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {templates.map((template, index) => (
            <motion.div
              key={template.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
            >
              <div className="group relative h-full bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <template.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-base font-medium mb-1.5 group-hover:text-primary transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {template.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-muted/50 text-muted-foreground"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subtle indicator */}
                <div className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary/50 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;
