import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

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

        <nav className="flex items-center gap-4">
          <Button
            variant="hero"
            size="sm"
            asChild
          >
            <a
              href="https://www.kfcclub.com.tw/Order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>前往點餐</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
