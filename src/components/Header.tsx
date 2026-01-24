import { Github, Mail, FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
            <span className="text-lg font-black text-primary-foreground">K</span>
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-gradient">KCouper</span>
          </span>
        </div>

        <p className="hidden text-center text-sm text-muted-foreground md:block">
          本網站僅提供優惠資訊整理，非 KFC 官方網站
        </p>

        <nav className="flex items-center gap-2">
          <a
            href="https://github.com/Winedays/KCouper/blob/master/CHANGELOG.md"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            title="更新日誌"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">更新日誌</span>
          </a>
          <a
            href="mailto:contact@kcouper.com"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            title="聯絡我們"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">聯絡我們</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            title="GitHub"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;