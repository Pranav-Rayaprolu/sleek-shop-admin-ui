
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StockBadgeProps {
  stock: number;
  lowThreshold?: number;
}

export function StockBadge({ stock, lowThreshold = 30 }: StockBadgeProps) {
  const isInStock = stock > 0;
  const isLowStock = isInStock && stock <= lowThreshold;
  
  return (
    <Badge variant="outline" className={cn(
      "text-xs font-medium",
      isInStock 
        ? isLowStock 
          ? "text-amber-500 border-amber-500" 
          : "text-green-500 border-green-500"
        : "text-red-500 border-red-500"
    )}>
      {isInStock 
        ? isLowStock 
          ? `Low Stock (${stock})`
          : `In Stock (${stock})` 
        : "Out of Stock"}
    </Badge>
  );
}
