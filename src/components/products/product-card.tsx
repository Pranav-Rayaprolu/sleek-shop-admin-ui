
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StarRating } from "@/components/products/star-rating";
import { StockBadge } from "@/components/products/stock-badge";
import { formatCurrency } from "@/lib/api";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card 
      className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col bg-card hover:bg-accent/5"
      onClick={() => onClick(product)}
    >
      <div className="aspect-square relative overflow-hidden bg-background">
        <img 
          src={product.image} 
          alt={product.title}
          className="object-contain w-full h-full p-4 transition-transform duration-300 group-hover:scale-110"
        />
        {product.discountPercentage && (
          <div className="absolute top-2 right-2 bg-destructive/90 text-destructive-foreground text-xs font-semibold py-1 px-2 rounded-full">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
      <CardContent className="pt-4 flex-grow space-y-3">
        <div className="space-y-2">
          <Badge variant="secondary" className="capitalize font-medium">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-base line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <p className="font-bold text-lg">
              {formatCurrency(product.price)}
            </p>
          </div>
          <StarRating rating={product.rating?.rate || 0} size={16} />
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <StockBadge stock={product.stock} />
      </CardFooter>
    </Card>
  );
}
