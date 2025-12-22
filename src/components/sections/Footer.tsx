const Footer = () => {
  return (
    <footer className="relative py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <span className="font-heading font-semibold text-primary">aiolet</span>
            <span className="text-muted-foreground text-sm">.io</span>
          </div>

          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} aiolet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
