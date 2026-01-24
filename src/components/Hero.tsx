import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

type HeroProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  couponCount: number;
  searchAllOptions: boolean;
  onSearchAllOptionsChange: (value: boolean) => void;
};

const Hero = ({ searchQuery, onSearchChange, couponCount, searchAllOptions, onSearchAllOptionsChange }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-8 md:py-12">
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
            
            {/* Search all options toggle */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <Checkbox
                id="search-all-options"
                checked={searchAllOptions}
                onCheckedChange={(checked) => onSearchAllOptionsChange(checked === true)}
              />
              <Label
                htmlFor="search-all-options"
                className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                搜尋所有可替換的餐點選項
              </Label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
