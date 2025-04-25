
"use client";

import { useState, useEffect } from "react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/products/product-card";
import { ProductFilter } from "@/components/products/product-filter";
import { Pagination } from "@/components/products/pagination";
import { ProductDetail } from "@/components/products/product-detail";
import { Category, FilterOptions, Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function Products() {
  const { toast } = useToast();
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: "",
    category: null,
    minRating: 0,
    minPrice: 0,
    maxPrice: 20000,
  });
  
  // Calculate the max price from all products
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Extract all unique categories from products
  const categories: Category[] = [...new Set(products.map(p => p.category))];
  
  // Items per page
  const itemsPerPage = 6;
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Filter by search
    if (filterOptions.search) {
      const searchLower = filterOptions.search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by category
    if (filterOptions.category) {
      result = result.filter(p => p.category === filterOptions.category);
    }
    
    // Filter by rating
    if (filterOptions.minRating > 0) {
      result = result.filter(p => p.rating >= filterOptions.minRating);
    }
    
    // Filter by price range
    result = result.filter(p => 
      p.price >= filterOptions.minPrice && 
      p.price <= filterOptions.maxPrice
    );
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filterOptions]);
  
  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handlers
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
  };
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };
  
  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "This feature is not implemented in this demo",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Filter Sidebar */}
        <div className="md:border-r pr-0 md:pr-4">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <ProductFilter
              maxPrice={maxPrice}
              categories={categories}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>
        
        {/* Products Grid */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: itemsPerPage }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-28" />
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-4 rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={handleProductClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setFilterOptions({
                      search: "",
                      category: null,
                      minRating: 0,
                      minPrice: 0,
                      maxPrice: maxPrice
                    })}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            
              {currentProducts.length > 0 && (
                <div className="py-4">
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
