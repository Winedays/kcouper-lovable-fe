import { HelpCircle } from "lucide-react";
import { useTour } from "@/hooks/useTour";

/**
 * Button component to manually trigger the site tour
 * Placed in the header for easy access
 */
const TourButton = () => {
  const { startTour } = useTour();

  return (
    <button
      onClick={startTour}
      className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      aria-label="網站導覽"
      title="查看網站導覽"
    >
      <HelpCircle className="h-4 w-4" />
      <span className="hidden sm:inline">導覽</span>
    </button>
  );
};

export default TourButton;
