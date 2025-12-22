import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Download } from "lucide-react";

const Marketplace = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="marketplace" className="relative py-24 lg:py-28 overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-5 tracking-tight">
            Reuse What Works.{" "}
            <span className="text-primary">Share What Performs.</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            A marketplace where high-performing AI teams can be reused, remixed, or rented.
            Install teams built by others or publish your own.
          </p>
        </motion.div>

        {/* Marketplace Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card rounded-xl border border-border p-6 overflow-hidden relative">
            <div className="grid grid-cols-3 gap-3">
              {[
                { rating: 4.9, installs: "2.3k", name: "seo_blog_team" },
                { rating: 4.8, installs: "1.8k", name: "lead_qualifier" },
                { rating: 4.7, installs: "956", name: "support_triage" },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="bg-background rounded-lg p-3 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-full h-12 rounded-md bg-muted/30 mb-2.5 flex items-center justify-center">
                    <div className="w-6 h-6 rounded bg-primary/20" />
                  </div>
                  <h4 className="text-xs font-mono mb-1.5 truncate">{item.name}</h4>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                      {item.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-2.5 h-2.5" />
                      {item.installs}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Coming soon overlay */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent flex items-end justify-center pb-3">
              <span className="text-xs font-mono text-muted-foreground">
                coming soon
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Marketplace;
