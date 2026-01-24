import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export type SortOption = "code" | "price-asc" | "price-desc" | "discount" | "expiry";

type SortSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "code", label: "代碼" },
  { value: "price-asc", label: "價格（低→高）" },
  { value: "price-desc", label: "價格（高→低）" },
  { value: "discount", label: "折扣比例" },
  { value: "expiry", label: "到期日" },
];

const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={(val) => onChange(val as SortOption)}>
        <SelectTrigger className="w-[160px] bg-background">
          <SelectValue placeholder="排序方式" />
        </SelectTrigger>
        <SelectContent className="bg-background z-50">
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortSelect;
