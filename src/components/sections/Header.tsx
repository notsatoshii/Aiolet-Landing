import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoWhite from "@/assets/logo-white.png";
import WaitlistDialog from "@/components/WaitlistDialog";

const Header = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Background with border glow */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        
        <div className="container relative">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2 flex-shrink-0">
              <img 
                src={logoWhite} 
                alt="Aiolet Logo" 
                className="h-5 sm:h-6 w-auto"
                style={{ 
                  filter: 'brightness(0) saturate(100%) invert(74%) sepia(52%) saturate(505%) hue-rotate(130deg) brightness(92%) contrast(91%) drop-shadow(0 0 8px hsl(185 80% 55% / 0.6))'
                }} 
              />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["Features", "Templates", "Marketplace"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            <Button 
              variant="hero" 
              size="sm" 
              onClick={() => setWaitlistOpen(true)} 
              className="uppercase tracking-wider text-[10px] sm:text-xs px-3 sm:px-4 flex-shrink-0"
            >
              <span className="hidden sm:inline">Join Waitlist</span>
              <span className="sm:hidden">Join</span>
            </Button>
          </div>
        </div>
      </motion.header>
      
      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </>
  );
};

export default Header;
