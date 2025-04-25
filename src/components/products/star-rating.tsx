
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export function StarRating({ rating, maxRating = 5, className }: StarRatingProps) {
  // Calculate the filled and empty portions
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = Math.floor(maxRating - rating - (hasHalfStar ? 1 : 0));
  
  return (
    <div className={cn("flex items-center", className)}>
      {/* Filled stars */}
      {Array.from({ length: filledStars }).map((_, i) => (
        <Star key={`filled-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className="w-4 h-4 text-yellow-400" />
          <div className="absolute inset-0 overflow-hidden w-[50%]">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      )}
      
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />
      ))}
      
      <span className="ml-1 text-xs text-muted-foreground">({rating.toFixed(1)})</span>
    </div>
  );
}
