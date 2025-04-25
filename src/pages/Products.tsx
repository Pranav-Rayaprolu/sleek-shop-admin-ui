"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  calculateAnalyticsSummary,
  formatCurrency,
} from "@/lib/api";
import { ProductCard } from "@/components/products/product-card";
import { ProductFilter } from "@/components/products/product-filter";
import { Category, FilterOptions, Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus, FilterX, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Products() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const loaderRef = useRef<HTMLDivElement>(null);

  // State
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
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
    error: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Fetch categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Calculate max price from all products for the price filter
  const maxPrice = Math.max(...products.map((p) => p.price), 1000);

  // Items per page
  const itemsPerPage = 9;

  // Initial products loading
  useEffect(() => {
    if (products.length === 0) return;

    // Apply initial filters
    let result = [...products];

    // Filter by search
    if (filterOptions.search) {
      const searchLower = filterOptions.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (filterOptions.category) {
      result = result.filter((p) => p.category === filterOptions.category);
    }

    // Filter by rating
    if (filterOptions.minRating > 0) {
      result = result.filter(
        (p) => (p.rating?.rate || 0) >= filterOptions.minRating
      );
    }

    // Filter by price range
    result = result.filter(
      (p) =>
        p.price >= filterOptions.minPrice && p.price <= filterOptions.maxPrice
    );

    setFilteredProducts(result);

    // Initialize displayed products
    const initialProducts = result.slice(0, itemsPerPage);
    setDisplayedProducts(initialProducts);
    setPage(1);
  }, [products, filterOptions]);

  // Function to duplicate products with unique IDs
  const getMoreProducts = useCallback(() => {
    const currentCount = displayedProducts.length;
    const productsToAdd = Math.min(itemsPerPage, filteredProducts.length);

    if (productsToAdd === 0) return [];

    // Get products to display, repeating from the start if needed
    return Array.from({ length: productsToAdd }).map((_, index) => {
      const productIndex = (currentCount + index) % filteredProducts.length;
      const product = filteredProducts[productIndex];

      // Create a copy with a unique ID to avoid React key issues
      return {
        ...product,
        id: `${product.id}-${currentCount + index}`,
      };
    });
  }, [displayedProducts.length, filteredProducts, itemsPerPage]);

  // Load more products
  const loadMoreProducts = useCallback(() => {
    if (isLoadingProducts || isLoadingMore) return;

    setIsLoadingMore(true);

    // Simulate API delay
    setTimeout(() => {
      const newProducts = getMoreProducts();
      setDisplayedProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setIsLoadingMore(false);
    }, 800);
  }, [getMoreProducts, isLoadingMore, isLoadingProducts]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoadingMore &&
          filteredProducts.length > 0
        ) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMoreProducts, isLoadingMore, filteredProducts.length]);

  // Handlers
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
  };

  const handleProductClick = (product: Product) => {
    // Extract the original product ID by removing the unique suffix we added
    const originalId = String(product.id).split("-")[0];
    navigate(`/products/${originalId}`);
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
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Products Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* Filter Sidebar */}
        <div>
          {isLoadingCategories ? (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
          {/* Results header */}
          <div className="flex items-center justify-between bg-background">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">{displayedProducts.length}</span> of{" "}
              <span className="font-medium">
                {filteredProducts.length > 0 ? "many" : 0}
              </span>{" "}
              products
            </p>

            {Object.values(filterOptions).some(
              (v) => v !== null && v !== "" && v !== 0 && v !== maxPrice
            ) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-xs"
                onClick={() =>
                  setFilterOptions({
                    search: "",
                    category: null,
                    minRating: 0,
                    minPrice: 0,
                    maxPrice: maxPrice,
                  })
                }
              >
                <FilterX className="h-3 w-3" /> Clear filters
              </Button>
            )}
          </div>

          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: itemsPerPage }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-52 w-full rounded-lg" />
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
              {displayedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={handleProductClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-background">
                  <FilterX className="h-12 w-12 mx-auto text-muted-foreground opacity-30" />
                  <h3 className="text-lg font-medium mt-4">
                    No products found
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}

              {/* Loading indicator */}
              <div ref={loaderRef} className="flex justify-center py-4">
                {isLoadingMore && (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      Loading more products...
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
