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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/30" />
      <div className="container relative">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-xl text-gradient">aiolet</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
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

          <Button variant="hero" size="sm" onClick={scrollToWaitlist}>
            Join Waitlist
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
