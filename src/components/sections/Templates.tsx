import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Users, Search, MessageSquare, ArrowRight } from "lucide-react";

const Templates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const templates = [
    {
      icon: FileText,
      title: "Content Engine Team",
      description: "Research, write, edit, and publish blog posts automatically",
      tools: ["SEO Analyzer", "Writer", "Editor", "Publisher"],
      color: "primary",
    },
    {
      icon: Search,
      title: "Lead Generation Team",
      description: "Find, qualify, and enrich leads from multiple sources",
      tools: ["Scraper", "Enricher", "Scorer", "CRM Sync"],
      color: "secondary",
    },
    {
      icon: Users,
      title: "Research & Monitoring",
      description: "Track competitors, trends, and market signals in real-time",
      tools: ["Crawler", "Analyzer", "Reporter", "Alerter"],
      color: "primary",
    },
    {
      icon: MessageSquare,
      title: "Community Operations",
      description: "Manage support tickets, social mentions, and community engagement",
      tools: ["Responder", "Triage", "Escalator", "Analytics"],
      color: "secondary",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/5 via-background to-background" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Start With <span className="text-gradient">Proven AI Teams</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't start from scratch. Use ready-made AI teams designed for real workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <div className="group relative h-full bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      template.color === "primary"
                        ? "bg-primary/10"
                        : "bg-secondary/10"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    <template.icon
                      className={`w-6 h-6 ${
                        template.color === "primary"
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {template.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-1 text-xs rounded-md bg-muted/50 text-muted-foreground"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl ${
                    template.color === "primary"
                      ? "bg-primary/10"
                      : "bg-secondary/10"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;
