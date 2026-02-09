import { Search, X, Heart, SlidersHorizontal, Info } from "lucide-react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { itemFilters, type ItemFilterId } from "./ItemFilter";
import SortSelect, { type SortOption } from "./SortSelect";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

type SearchPanelProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchAllOptions: boolean;
  onSearchAllOptionsChange: (value: boolean) => void;
  activeFilters: ItemFilterId[];
  onFilterToggle: (filter: ItemFilterId) => void;
  onClearAll: () => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  resultCount: number;
};

const SearchPanel = ({
  searchQuery,
  onSearchChange,
  searchAllOptions,
  onSearchAllOptionsChange,
  activeFilters,
  onFilterToggle,
  onClearAll,
  showFavoritesOnly,
  onToggleFavorites,
  favoritesCount,
  sortBy,
  onSortChange,
  resultCount,
}: SearchPanelProps) => {
  const hasActiveFilters = activeFilters.length > 0 || showFavoritesOnly;

  return (
    <div className="border-b border-border/50 bg-background">
      <div className="container py-4">
        {/* Search row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search input */}
          <div data-tour="search" className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜尋優惠券或食品名稱..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-10 bg-secondary/50 pl-9 pr-4 text-sm"
              aria-label="搜尋優惠券"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="清除搜尋"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search all options toggle */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="search-all-options-panel"
              checked={searchAllOptions}
              onCheckedChange={(checked) => onSearchAllOptionsChange(checked === true)}
            />
            <Label
              htmlFor="search-all-options-panel"
              className="cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              搜尋所有選項
            </Label>
          </div>

          {/* Sort select */}
          <div data-tour="sort">
            <SortSelect value={sortBy} onChange={onSortChange} />
          </div>
        </div>

        {/* Filters row */}
        <div className="mt-4 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
          
          <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {/* Favorites filter */}
            <div data-tour="favorites" className="flex shrink-0 items-center gap-1">
              <button
                onClick={onToggleFavorites}
                aria-pressed={showFavoritesOnly}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                  showFavoritesOnly
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                <Heart className={cn("h-3.5 w-3.5", showFavoritesOnly && "fill-current")} />
                <span>收藏</span>
                {favoritesCount > 0 && (
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    showFavoritesOnly
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  )}>
                    {favoritesCount}
                  </span>
                )}
              </button>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                    <Info className="h-3.5 w-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="max-w-xs text-center" side="bottom">
                  <p className="text-xs text-muted-foreground">
                    收藏功能會將資料儲存在瀏覽器的本地儲存空間中。如果換了裝置、清除瀏覽器資料或使用無痕模式，收藏記錄就會消失。
                  </p>
                </PopoverContent>
              </Popover>
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-border shrink-0" />

            {/* Item filters */}
            <div data-tour="filters" className="flex items-center gap-2">
            {itemFilters.map((filter) => {
              const isActive = activeFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => onFilterToggle(filter.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  <span>{filter.emoji}</span>
                  <span>{filter.label}</span>
                </button>
              );
            })}
            </div>
          </div>

          {/* Clear filters button */}
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all duration-200"
            >
              <X className="h-3 w-3" />
              <span>清除</span>
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="mt-3 text-xs text-muted-foreground">
          共找到{" "}
          <span className="font-semibold text-foreground">{resultCount}</span>{" "}
          張優惠券
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;