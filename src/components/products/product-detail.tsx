
"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { StarRating } from "@/components/products/star-rating";
import { StockBadge } from "@/components/products/stock-badge";
import { formatCurrency } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetail({ product, isOpen, onClose }: ProductDetailProps) {
  const { toast } = useToast();
  
  if (!product) return null;

  const handleEdit = () => {
    toast({
      title: "Edit Product",
      description: "Product editing functionality is not implemented in this demo",
    });
  };

  const handleDelete = () => {
    toast({
      title: "Delete Product",
      description: "Product deletion functionality is not implemented in this demo",
      variant: "destructive"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{product.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-3">
            <Badge variant="outline" className="capitalize bg-primary/10">
              {product.category}
            </Badge>
            <StarRating rating={product.rating?.rate || 0} />
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-2">
          <div className="aspect-[16/9] overflow-hidden rounded-lg">
            <img 
              src={product.image} 
              alt={product.title}
              className="object-contain w-full h-full"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-xl">
                {formatCurrency(product.price)}
              </p>
              <StockBadge stock={product.stock} />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleEdit}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>Delete</Button>
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
                  <p className="font-medium">Product ID</p>
                  <p className="text-muted-foreground">
                    {product.id}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Rating Count</p>
                  <p className="text-muted-foreground">
                    {product.rating?.count || 0} reviews
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
                  <li>Rating: {product.rating?.rate || 0} / 5</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
