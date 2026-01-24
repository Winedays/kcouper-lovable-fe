import { cn } from "@/lib/utils";
import { X, Heart } from "lucide-react";

/**
 * Filter matching rules - key is filter name, value is array of strings to match
 * @type {Object<string, string[]>}
 */
export const filterMatchRules: Record<string, string[]> = {
  '蛋撻': ['原味蛋撻', '蛋撻'],
  '炸雞': ['咔啦脆雞', '卡啦脆雞'],
  '椒麻雞': ['青花椒香麻脆雞'],
  '紙包雞': ['義式香草紙包雞', '紙包雞'],
  '咔啦雞堡': ['咔啦雞腿堡', '卡啦雞腿堡'],
  '花生熔岩雞腿堡': ['花生熔岩卡啦雞腿堡', '花生熔岩咔啦雞腿堡'],
  '椒麻雞腿堡': ['青花椒香麻咔啦雞腿堡', '青花椒香麻卡啦雞腿堡', '青花椒咔啦雞腿堡'],
  '烤雞腿堡': ['紐奧良烙烤雞腿堡', '紐奧良烤腿堡', '紐澳良烤雞腿堡', '紐奧良烤雞腿堡'],
  '雞塊': ['上校雞塊'],
  '脆薯': ['香酥脆薯', '20:00後供應香酥脆薯', '小薯', '薯條'],
  'QQ球': ['雙色轉轉QQ球'],
  '點心盒': ['點心盒-上校雞塊+香酥脆薯', '點心盒'],
  '雞汁飯': ['20:00前供應雞汁風味飯', '雞汁風味飯'],
  '大福': ['草苺起司冰淇淋大福'],
};

export const itemFilters = [
  { id: "蛋撻", label: "蛋撻", emoji: "🥧" },
  { id: "炸雞", label: "炸雞", emoji: "🍗" },
  { id: "椒麻雞", label: "椒麻雞", emoji: "🌶️" },
  { id: "紙包雞", label: "紙包雞", emoji: "🍗" },
  { id: "咔啦雞堡", label: "咔啦雞堡", emoji: "🍔" },
  { id: "花生熔岩雞腿堡", label: "花生熔岩雞腿堡", emoji: "🍔" },
  { id: "椒麻雞腿堡", label: "椒麻雞腿堡", emoji: "🍔" },
  { id: "烤雞腿堡", label: "烤雞腿堡", emoji: "🍔" },
  { id: "雞塊", label: "雞塊", emoji: "🍖" },
  { id: "脆薯", label: "脆薯", emoji: "🍟" },
  { id: "QQ球", label: "QQ球", emoji: "🟡" },
  { id: "點心盒", label: "點心盒", emoji: "📦" },
  { id: "雞汁飯", label: "雞汁飯", emoji: "🍚" },
  { id: "大福", label: "大福", emoji: "🍡" },
] as const;

export type ItemFilterId = (typeof itemFilters)[number]["id"];

type ItemFilterProps = {
  activeFilters: ItemFilterId[];
  onFilterToggle: (filter: ItemFilterId) => void;
  onClearAll: () => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
};

const ItemFilter = ({
  activeFilters,
  onFilterToggle,
  onClearAll,
  showFavoritesOnly,
  onToggleFavorites,
  favoritesCount,
}: ItemFilterProps) => {
  const hasActiveFilters = activeFilters.length > 0 || showFavoritesOnly;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Favorites filter */}
      <button
        onClick={onToggleFavorites}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
          showFavoritesOnly
            ? "bg-primary text-primary-foreground shadow-md scale-105"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        <Heart className={cn("h-4 w-4", showFavoritesOnly && "fill-current")} />
        <span>收藏</span>
        {favoritesCount > 0 && (
          <span className={cn(
            "ml-1 rounded-full px-1.5 py-0.5 text-xs font-bold",
            showFavoritesOnly
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-primary/10 text-primary"
          )}>
            {favoritesCount}
          </span>
        )}
      </button>

      {/* Divider */}
      <div className="h-6 w-px bg-border" />

      {/* Item filters */}
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
