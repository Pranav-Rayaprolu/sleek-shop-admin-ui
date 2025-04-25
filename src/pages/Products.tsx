
"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories, calculateAnalyticsSummary, formatCurrency } from "@/lib/api";
import { ProductCard } from "@/components/products/product-card";
import { ProductFilter } from "@/components/products/product-filter";
import { Pagination } from "@/components/products/pagination";
import { ProductDetail } from "@/components/products/product-detail";
import { Category, FilterOptions, Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { SummaryCard } from "@/components/products/summary-card";

export default function Products() {
  const { toast } = useToast();
  
  // State
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: "",
    category: null,
    minRating: 0,
    minPrice: 0,
    maxPrice: 10000,
  });
  
  // Fetch products
  const { 
    data: products = [], 
    isLoading: isLoadingProducts,
    error: productsError
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  // Fetch categories
  const { 
    data: categories = [], 
    isLoading: isLoadingCategories 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Calculate analytics summary
  const analyticsSummary = calculateAnalyticsSummary(products);
  
  // Calculate max price from all products for the price filter
  const maxPrice = Math.max(...products.map(p => p.price), 1000);
  
  // Items per page
  const itemsPerPage = 6;
  
  // Apply filters
  useEffect(() => {
    if (products.length === 0) return;
    
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
      result = result.filter(p => (p.rating?.rate || 0) >= filterOptions.minRating);
    }
    
    // Filter by price range
    result = result.filter(p => 
      p.price >= filterOptions.minPrice && 
      p.price <= filterOptions.maxPrice
    );
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filterOptions, products]);
  
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

  if (productsError) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-500">Error loading products</h2>
        <p className="mt-2 text-muted-foreground">Please try again later</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Analytics Summary Cards */}
      {!isLoadingProducts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Products"
            value={analyticsSummary.totalProducts.toString()}
            icon="package"
            trend={{
              value: "+12%",
              isPositive: true,
              label: "from last month"
            }}
          />
          <SummaryCard
            title="Average Price"
            value={formatCurrency(analyticsSummary.averagePrice)}
            icon="file-text"
            trend={{
              value: "-2%",
              isPositive: false,
              label: "from last month"
            }}
          />
          <SummaryCard
            title="Highest Rated"
            value={analyticsSummary.highestRatedProduct.title || "N/A"}
            subtitle={`Rating: ${analyticsSummary.highestRatedProduct.rating?.rate.toFixed(1) || 0}`}
            icon="star"
          />
          <SummaryCard
            title="Most Common Category"
            value={analyticsSummary.mostCommonCategory?.category || "N/A"}
            subtitle={`${analyticsSummary.mostCommonCategory?.count || 0} products`}
            icon="grid-2x2"
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Filter Sidebar */}
        <div className="md:border-r pr-0 md:pr-4">
          {isLoadingCategories ? (
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
          {isLoadingProducts ? (
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
