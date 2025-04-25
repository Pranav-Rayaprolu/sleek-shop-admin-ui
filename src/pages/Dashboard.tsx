
"use client";

import { AnalyticsSummary } from "@/components/dashboard/analytics-summary";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid, Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <Button className="hidden sm:flex">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      
      <section className="space-y-4">
        <AnalyticsSummary />
      </section>
      
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LayoutGrid className="h-5 w-5 mr-2" />
              Recent Products
            </CardTitle>
            <CardDescription>
              Your latest added products across all categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.slice(0, 3).map(product => (
                <div key={product.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
                    <img 
                      src={product.thumbnail} 
                      alt={product.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm line-clamp-1">{product.title}</p>
                    <div className="flex items-center">
                      <span className={`category-badge category-${product.category}`}>
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Button variant="outline" asChild>
                <a href="/products">View All Products</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
