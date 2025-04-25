"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft, Edit, Trash, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/api";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id,
  });

  const handleEditClick = () => {
    toast({
      title: "Edit Product",
      description: "This feature is not implemented in this demo.",
    });
  };

  const handleDeleteClick = () => {
    toast({
      title: "Delete Product",
      description: "This feature is not implemented in this demo.",
      variant: "destructive",
    });
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="text-xl font-semibold">Failed to load product</h2>
        <p className="text-muted-foreground text-center max-w-md">
          We couldn't load the product details. Please try again later.
        </p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  if (isLoading || !product) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-32" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 rounded-full" />
              ))}
              <Skeleton className="h-4 w-16 ml-2" />
            </div>
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">Product Details</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEditClick}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDeleteClick}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-1">
            <div className="relative aspect-square flex items-center justify-center bg-secondary/20 rounded-md overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{product.category}</Badge>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating.rate)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <div>
            <p className="text-3xl font-bold">
              {formatCurrency(product.price)}
            </p>
            <div className="flex items-center mt-2">
              <Badge
                variant={product.stock > 10 ? "outline" : "destructive"}
                className="bg-background"
              >
                {product.stock > 10
                  ? `In Stock (${product.stock} available)`
                  : product.stock > 0
                    ? `Low Stock (${product.stock} left)`
                    : "Out of Stock"}
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 border-b pb-2">
                  <span className="font-medium">ID</span>
                  <span>{product.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 border-b pb-2">
                  <span className="font-medium">Category</span>
                  <span>{product.category}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 border-b pb-2">
                  <span className="font-medium">Rating</span>
                  <span>{product.rating.rate} / 5</span>
                </div>
                <div className="grid grid-cols-2 gap-2 border-b pb-2">
                  <span className="font-medium">Stock</span>
                  <span>{product.stock}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Last Updated</span>
                  <span>
                    {new Date(
                      product.updatedAt || Date.now()
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 pt-4">
            <Button className="w-full">Add to Featured</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
