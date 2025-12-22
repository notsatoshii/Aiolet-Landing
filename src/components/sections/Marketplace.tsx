import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Share2, Star, Download } from "lucide-react";

const Marketplace = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Reuse What Works.{" "}
            <span className="text-gradient">Share What Performs.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aiolet includes a marketplace where high-performing AI teams can be reused,
            remixed, or rented. Install teams built by others or publish your own when
            you're ready.
          </p>
        </motion.div>

        {/* Marketplace Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30 p-8 overflow-hidden relative">
            <div className="grid grid-cols-3 gap-4">
              {[
                { rating: 4.9, installs: "2.3k", name: "SEO Blog Team" },
                { rating: 4.8, installs: "1.8k", name: "Lead Qualifier" },
                { rating: 4.7, installs: "956", name: "Support Triage" },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-muted/20 rounded-xl p-4 border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="w-full h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/10 mb-3" />
                  <h4 className="text-sm font-medium mb-2">{item.name}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {item.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {item.installs}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fade overlay */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/80 to-transparent flex items-end justify-center pb-4">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Coming soon
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Marketplace;
