import { Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 z-50 w-full border-t border-border/50 bg-background">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-primary">
              <span className="text-sm font-black text-primary-foreground">K</span>
            </div>
            <span className="text-sm font-semibold text-foreground">KCouper</span>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            本網站僅提供優惠資訊整理，非 KFC 官方網站
          </p>

          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@kcouper.com"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              <span>聯絡我們</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
