import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md";
  showNumber?: boolean;
  totalRatings?: number;
}

export function RatingStars({
  rating,
  max = 5,
  size = "md",
  showNumber = true,
  totalRatings,
}: RatingStarsProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  const iconSize = size === "sm" ? 12 : 16;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars.map((star) => (
          <Star
            key={star}
            size={iconSize}
            className={cn(
              star <= Math.round(rating)
                ? "text-amber-400 fill-amber-400"
                : "text-gray-200 fill-gray-200"
            )}
          />
        ))}
      </div>
      {showNumber && (
        <span className={cn("font-medium text-gray-700", size === "sm" ? "text-xs" : "text-sm")}>
          {rating.toFixed(1)}
        </span>
      )}
      {totalRatings && (
        <span className="text-xs text-gray-400">({totalRatings.toLocaleString()})</span>
      )}
    </div>
  );
}
