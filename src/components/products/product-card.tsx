
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StarRating } from "@/components/products/star-rating";
import { StockBadge } from "@/components/products/stock-badge";
import { formatCurrency } from "@/lib/data";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
      onClick={() => onClick(product)}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
        />
        {product.discountPercentage && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium py-1 px-2 rounded-full">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
      <CardContent className="pt-4 flex-grow">
        <div className="space-y-2">
          <div>
            <span className={`category-badge category-${product.category}`}>
              {product.category}
            </span>
          </div>
          <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>
          <div className="flex items-center justify-between">
            <p className="font-medium">
              {formatCurrency(product.price)}
              {product.discountPercentage && (
                <span className="text-xs text-muted-foreground line-through ml-2">
                  {formatCurrency(Math.round(product.price / (1 - product.discountPercentage / 100)))}
                </span>
              )}
            </p>
          </div>
          <StarRating rating={product.rating} />
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <StockBadge stock={product.stock} />
      </CardFooter>
    </Card>
  );
}
