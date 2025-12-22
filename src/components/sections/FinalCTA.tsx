import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

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
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-background to-background" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Build AI Teams That{" "}
            <span className="text-gradient">Actually Scale</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            We're opening access in stages. Join the waitlist to get early access
            and help shape the platform.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl border border-green-500/30 p-8"
            >
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2">
                You're on the list!
              </h3>
              <p className="text-muted-foreground">
                We'll reach out soon with early access.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-8"
            >
              <div className="space-y-4 mb-6">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <select
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 text-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
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
              </div>

              <Button variant="hero" size="xl" className="w-full group">
                Join the Waitlist
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <p className="text-xs text-muted-foreground mt-4">
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
