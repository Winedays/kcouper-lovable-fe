type HeroProps = {
  couponCount: number;
};

const Hero = ({ couponCount }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-4 md:py-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="animate-fade-in text-3xl font-black tracking-tight md:text-4xl lg:text-5xl">
            省錢吃
            <span className="text-gradient">肯德基</span>
          </h1>
          <p className="mt-2 animate-fade-in text-sm text-muted-foreground opacity-0 [animation-delay:100ms] md:text-base">
            收集最新 KFC 優惠券，讓你用最划算的價格享受美味炸雞
          </p>
          <p className="mt-1 animate-fade-in text-xs text-muted-foreground/80 opacity-0 [animation-delay:200ms]">
            目前共有 <span className="font-semibold text-primary">{couponCount}</span> 張優惠券
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;