import { Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border/30">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-xl text-gradient">aiolet</span>
            <span className="text-muted-foreground">.io</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/20 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aiolet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
