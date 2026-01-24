import { cn } from "@/lib/utils";

export const itemFilters = [
  { id: "all", label: "全部", emoji: "🍽️" },
  { id: "炸雞", label: "炸雞", emoji: "🍗" },
  { id: "蛋塔", label: "蛋塔", emoji: "🥧" },
  { id: "薯條", label: "薯條", emoji: "🍟" },
  { id: "雞塊", label: "雞塊", emoji: "🍖" },
  { id: "漢堡", label: "漢堡", emoji: "🍔" },
  { id: "可樂", label: "飲料", emoji: "🥤" },
] as const;

export type ItemFilterId = (typeof itemFilters)[number]["id"];

type ItemFilterProps = {
  activeFilter: ItemFilterId;
  onFilterChange: (filter: ItemFilterId) => void;
};

const ItemFilter = ({ activeFilter, onFilterChange }: ItemFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {itemFilters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            activeFilter === filter.id
              ? "bg-primary text-primary-foreground shadow-md scale-105"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          <span>{filter.emoji}</span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ItemFilter;
