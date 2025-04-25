
"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { StarRating } from "@/components/products/star-rating";
import { StockBadge } from "@/components/products/stock-badge";
import { formatCurrency } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetail({ product, isOpen, onClose }: ProductDetailProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{product.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-3">
            <span className={`category-badge category-${product.category}`}>
              {product.category}
            </span>
            <StarRating rating={product.rating} />
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-2">
          <div className="aspect-[16/9] overflow-hidden rounded-lg">
            <img 
              src={product.images[0] || product.thumbnail} 
              alt={product.title}
              className="object-cover w-full h-full"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-xl">
                {formatCurrency(product.price)}
                {product.discountPercentage && (
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    {formatCurrency(Math.round(product.price / (1 - product.discountPercentage / 100)))}
                  </span>
                )}
              </p>
              <StockBadge stock={product.stock} />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
          </div>
          
          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <p className="text-sm">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Created On</p>
                  <p className="text-muted-foreground">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Last Updated</p>
                  <p className="text-muted-foreground">
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="specs" className="pt-4">
              <div className="text-sm">
                <p className="font-medium mb-2">Product Specifications</p>
                <ul className="space-y-2 ml-5 list-disc">
                  <li>SKU: PROD-{product.id}</li>
                  <li>Category: {product.category}</li>
                  <li>Stock Level: {product.stock} units</li>
                  <li>Rating: {product.rating} / 5</li>
                  {product.discountPercentage && <li>Discount: {product.discountPercentage}%</li>}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
