import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";
import { Star, Heart, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export function ProductCard({
  product,
  onClick,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow relative group">
      <div
        className="relative aspect-square bg-secondary/20 flex items-center justify-center overflow-hidden group"
        onClick={() => onClick(product)}
      >
        <img
          src={product.image || product.thumbnail}
          alt={product.title}
          className="object-contain max-h-full max-w-full transition-transform group-hover:scale-105"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 opacity-80 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            // Add to favorites (not implemented)
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Badge
          className="absolute top-2 left-2"
          variant={
            product.stock > 10
              ? "secondary"
              : product.stock > 0
                ? "outline"
                : "destructive"
          }
        >
          {product.stock > 10
            ? "In Stock"
            : product.stock > 0
              ? "Low Stock"
              : "Out of Stock"}
        </Badge>
      </div>

      <CardContent className="flex-1 p-4" onClick={() => onClick(product)}>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground capitalize">
              {product.category}
            </p>
            <h3 className="font-medium line-clamp-2 mt-1">{product.title}</h3>
          </div>

          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating.rate)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 border-t flex justify-between items-center">
        <p className="font-semibold">{formatCurrency(product.price)}</p>
        <div className="flex gap-2">
          {onEdit && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          )}

          {onDelete && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product);
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          )}

          <Button
            variant="default"
            size="sm"
            className="h-8 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onClick(product);
            }}
          >
            View
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
