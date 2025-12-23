import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="relative py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img 
              src={logoWhite} 
              alt="Aiolet Logo" 
              className="h-5 w-auto"
              style={{ 
                filter: 'brightness(0) saturate(100%) invert(74%) sepia(52%) saturate(505%) hue-rotate(130deg) brightness(92%) contrast(91%) drop-shadow(0 0 6px hsl(185 80% 55% / 0.4))'
              }} 
            />
          </div>

          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Aiolet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
