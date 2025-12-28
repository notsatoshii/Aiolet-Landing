import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WaitlistDialog = ({ open, onOpenChange }: WaitlistDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
      // Reset after closing
      setTimeout(() => {
        if (!open) {
          setSubmitted(false);
          setName("");
          setEmail("");
        }
      }, 500);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
      }, 300);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md border-primary/30 bg-background/95 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="py-8 text-center relative z-10"
          >
            <div className="w-12 h-12 bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-heading text-lg uppercase tracking-wider mb-2">You're on the list!</h3>
            <p className="text-sm text-muted-foreground">We'll reach out with early access.</p>
          </motion.div>
        ) : (
          <div className="relative z-10">
            <DialogHeader className="text-center mb-6">
              <DialogTitle className="font-heading text-xl uppercase tracking-wider">
                Join the <span className="text-primary">Waitlist</span>
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-2">
                Get early access to AI team orchestration.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="bg-background border-primary/30 font-mono placeholder:text-muted-foreground focus:border-primary/60"
                />
              </div>
              <div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="bg-background border-primary/30 font-mono placeholder:text-muted-foreground focus:border-primary/60"
                />
              </div>
              <Button variant="hero" size="default" className="w-full uppercase tracking-wider group">
                <span>Request Access</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Button>
              <p className="text-[10px] text-muted-foreground text-center font-mono uppercase tracking-widest">
                No spam. Early access only.
              </p>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistDialog;
