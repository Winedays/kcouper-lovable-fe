import { HelpCircle } from "lucide-react";
import { useTour } from "@/hooks/useTour";

type TourButtonProps = {
  showLabel?: boolean;
  /** When "menu-item", renders matching mobile nav item styles */
  variant?: "default" | "menu-item";
  /** Callback fired before tour starts (e.g. to close a menu) */
  onBeforeStart?: () => void;
};

/**
 * Button component to manually trigger the site tour
 * Placed in the header for easy access
 */
const TourButton = ({ showLabel = false, variant = "default", onBeforeStart }: TourButtonProps) => {
  const { startTour } = useTour();

  const handleClick = () => {
    if (onBeforeStart) {
      onBeforeStart();
      setTimeout(startTour, 350);
    } else {
      startTour();
    }
  };

  if (variant === "menu-item") {
    return (
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
        aria-label="網站導覽"
        title="查看網站導覽"
      >
        <HelpCircle className="h-4 w-4" />
        <span>導覽</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      aria-label="網站導覽"
      title="查看網站導覽"
    >
      <HelpCircle className="h-4 w-4" />
      <span className={showLabel ? "" : "hidden sm:inline"}>導覽</span>
    </button>
  );
};

export default TourButton;
