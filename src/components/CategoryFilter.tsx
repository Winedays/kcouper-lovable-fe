import { categories, type Category } from "@/data/coupons";
import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
};

const categoryEmojis: Record<Category, string> = {
  全部: "🏷️",
  炸雞: "🍗",
  套餐: "🍱",
  蛋塔: "🥧",
  漢堡: "🍔",
  點心: "🍟",
  飲料: "🥤",
};

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "category-chip",
            activeCategory === category && "active"
          )}
        >
          <span>{categoryEmojis[category]}</span>
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
