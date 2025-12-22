import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm border-b border-border/40" />
      <div className="container relative">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <span className="font-heading font-semibold text-lg tracking-tight">
              <span className="text-primary">aiolet</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#templates"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Templates
            </a>
            <a
              href="#marketplace"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Marketplace
            </a>
          </nav>

          <Button variant="default" size="sm" onClick={scrollToWaitlist}>
            Join Waitlist
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
