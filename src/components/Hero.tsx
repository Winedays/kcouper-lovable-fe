import { Search } from "lucide-react";
import { Input } from "./ui/input";

type HeroProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  couponCount: number;
};

const Hero = ({ searchQuery, onSearchChange, couponCount }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="animate-fade-in text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
            省錢吃
            <span className="text-gradient">肯德基</span>
          </h1>
          <p className="mt-4 animate-fade-in text-lg text-muted-foreground opacity-0 [animation-delay:100ms]">
            收集最新 KFC 優惠券，讓你用最划算的價格享受美味炸雞
          </p>
          <p className="mt-2 animate-fade-in text-sm text-muted-foreground/80 opacity-0 [animation-delay:200ms]">
            目前共有 <span className="font-semibold text-primary">{couponCount}</span> 張優惠券
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 max-w-md animate-fade-in opacity-0 [animation-delay:300ms]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="搜尋優惠券或食品名稱..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-12 rounded-xl border-border/60 bg-card pl-12 pr-4 text-base shadow-card transition-shadow duration-200 placeholder:text-muted-foreground/60 focus:shadow-card-hover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
