"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  calculateAnalyticsSummary,
  formatCurrency,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, LayoutGrid, DollarSign, Star, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { SummaryCard } from "@/components/dashboard/summary-card";

export default function Dashboard() {
  const { toast } = useToast();

  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Calculate analytics summary
  const analyticsSummary = calculateAnalyticsSummary(products);

  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "This feature is not implemented in this demo",
    });
  };

  if (productsError) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-500">
          Error loading products
        </h2>
        <p className="mt-2 text-muted-foreground">Please try again later</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Analytics Summary Cards */}
      {isLoadingProducts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  <Skeleton className="h-4 w-24" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-32 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Products"
            value={analyticsSummary.totalProducts.toString()}
            icon={<LayoutGrid className="h-4 w-4 text-muted-foreground" />}
            trend={{
              value: "+12%",
              isPositive: true,
              label: "from last month",
            }}
          />
          <SummaryCard
            title="Average Price"
            value={formatCurrency(analyticsSummary.averagePrice)}
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            trend={{
              value: "-2%",
              isPositive: false,
              label: "from last month",
            }}
          />
          <SummaryCard
            title="Average Rating"
            value={(
              products.reduce((sum, p) => sum + (p.rating?.rate || 0), 0) /
              Math.max(1, products.length)
            ).toFixed(1)}
            icon={<Star className="h-4 w-4 text-muted-foreground" />}
            trend={{
              value: "+0.2",
              isPositive: true,
              label: "from last month",
            }}
          />
          <SummaryCard
            title="Most Common Category"
            value={analyticsSummary.mostCommonCategory?.category || "N/A"}
            icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
            subtitle={`${analyticsSummary.mostCommonCategory?.count || 0} products`}
          />
        </div>
      )}

      {/* Recent Products */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LayoutGrid className="h-5 w-5 mr-2" />
              Recent Products
            </CardTitle>
            <CardDescription>
              Latest added products across all categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingProducts ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg border"
                  >
                    <Skeleton className="w-12 h-12 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.slice(0, 6).map((product) => (
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id}
                    className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
                      <img
                        src={product.thumbnail || product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-sm line-clamp-1">
                        {product.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                          {product.category}
                        </span>
                        <span className="text-xs font-medium">
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div className="text-center mt-6">
              <Button variant="outline" asChild>
                <Link to="/products">View All Products</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
