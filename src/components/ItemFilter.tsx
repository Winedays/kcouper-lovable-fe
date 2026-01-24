import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export const itemFilters = [
  { id: "炸雞", label: "炸雞", emoji: "🍗" },
  { id: "蛋塔", label: "蛋塔", emoji: "🥧" },
  { id: "薯條", label: "薯條", emoji: "🍟" },
  { id: "雞塊", label: "雞塊", emoji: "🍖" },
  { id: "漢堡", label: "漢堡", emoji: "🍔" },
  { id: "飲料", label: "飲料", emoji: "🥤" },
] as const;

export type ItemFilterId = (typeof itemFilters)[number]["id"];

type ItemFilterProps = {
  activeFilters: ItemFilterId[];
  onFilterToggle: (filter: ItemFilterId) => void;
  onClearAll: () => void;
};

const ItemFilter = ({ activeFilters, onFilterToggle, onClearAll }: ItemFilterProps) => {
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {itemFilters.map((filter) => {
        const isActive = activeFilters.includes(filter.id);
        return (
          <button
            key={filter.id}
            onClick={() => onFilterToggle(filter.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <span>{filter.emoji}</span>
            <span>{filter.label}</span>
          </button>
        );
      })}
      
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all duration-200"
        >
          <X className="h-3.5 w-3.5" />
          <span>清除篩選</span>
        </button>
      )}
    </div>
  );
};

export default ItemFilter;
