import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { SciFiPanel } from "@/components/ui/scifi-panel";

const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section ref={ref} id="waitlist" className="relative py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[150px]" />

      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="max-w-md mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-medium mb-4 tracking-wider">
            AI Teams That <span className="text-primary">Scale</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-8">Join the waitlist for early access.</p>

          {submitted ? (
            <SciFiPanel>
              <div className="p-6 text-center">
                <div className="w-10 h-10 bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-heading text-sm uppercase tracking-wider mb-1">Confirmed</h3>
                <p className="text-xs text-muted-foreground">We'll reach out with early access.</p>
              </div>
            </SciFiPanel>
          ) : (
            <SciFiPanel label="Access Request">
              <form onSubmit={handleSubmit} className="p-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2.5 mb-4 bg-background border border-primary/30 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
                />
                <Button variant="hero" size="default" className="w-full uppercase tracking-wider group">
                  <span>Request Access</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                <p className="text-[9px] text-muted-foreground mt-3 font-mono uppercase tracking-widest">No spam. Early access only.</p>
              </form>
            </SciFiPanel>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
