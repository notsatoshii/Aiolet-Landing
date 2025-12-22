import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section ref={ref} id="waitlist" className="relative py-24 lg:py-28 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
            Build AI Teams That{" "}
            <span className="text-primary">Actually Scale</span>
          </h2>
          <p className="text-base text-muted-foreground mb-8">
            We're opening access in stages. Join the waitlist to get early access.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-xl border border-primary/30 p-6"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-medium mb-1">
                You're on the list
              </h3>
              <p className="text-sm text-muted-foreground">
                We'll reach out soon with early access.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="bg-card rounded-xl border border-border p-5"
            >
              <div className="space-y-3 mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                />
                <select
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border text-sm text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-card">
                    What do you want to automate? (optional)
                  </option>
                  <option value="content" className="bg-card">
                    Content creation & publishing
                  </option>
                  <option value="leads" className="bg-card">
                    Lead generation & outreach
                  </option>
                  <option value="research" className="bg-card">
                    Research & monitoring
                  </option>
                  <option value="support" className="bg-card">
                    Customer support
                  </option>
                  <option value="other" className="bg-card">
                    Something else
                  </option>
                </select>
              </div>

              <Button variant="default" size="default" className="w-full group">
                Join the Waitlist
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>

              <p className="text-[10px] text-muted-foreground mt-3 font-mono">
                No spam. Early access only.
              </p>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
