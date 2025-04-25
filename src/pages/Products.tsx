"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { ProductCard } from "@/components/products/product-card";
import { ProductFilter } from "@/components/products/product-filter";
import { Category, FilterOptions, Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus, FilterX, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ProductFormDialog } from "@/components/products/product-form-dialog";
import { DeleteProductDialog } from "@/components/products/delete-product-dialog";

export default function Products() {
  const { toast } = useToast();
  const navigate = useNavigate();

  // State variables for product display and filtering
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: "",
    category: null,
    minRating: 0,
    minPrice: 0,
    maxPrice: 10000,
  });
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 6;

  // State for product management
  const [managedProducts, setManagedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");

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

  // Calculate max price dynamically from all products
  const maxPrice = React.useMemo(() => {
    if (!products.length) return 1000;

    // Get the highest price from all products and add 20% for buffer
    const highest = Math.max(...products.map((p) => p.price));
    return Math.ceil(highest * 1.2); // Rounded up with 20% extra room
  }, [products]);

  // Apply filters and initialize product display
  useEffect(() => {
    if (isLoadingProducts) return;

    // Store products for local management
    if (managedProducts.length === 0 && products.length > 0) {
      setManagedProducts(products);
    }

    // Use managed products instead of the original products array
    const sourceProducts =
      managedProducts.length > 0 ? managedProducts : products;

    // Apply filters
    let filtered = [...sourceProducts];

    // Filter by search
    if (filterOptions.search) {
      const searchLower = filterOptions.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (filterOptions.category) {
      filtered = filtered.filter((p) => p.category === filterOptions.category);
    }

    // Filter by rating
    if (filterOptions.minRating > 0) {
      filtered = filtered.filter(
        (p) => (p.rating?.rate || 0) >= filterOptions.minRating
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) =>
        p.price >= filterOptions.minPrice && p.price <= filterOptions.maxPrice
    );

    // Reset to page 1 when filters change
    setPage(1);

    // Create first batch of products with unique IDs
    const initial = filtered
      .slice(0, PRODUCTS_PER_PAGE)
      .map((product, index) => ({
        ...product,
        id: `${product.id}-1-${index}`,
      }));

    setVisibleProducts(initial);

    // Reset scroll position
    window.scrollTo(0, 0);
  }, [filterOptions, products, isLoadingProducts, managedProducts]);

  // Handle the "Load More" button click
  const handleLoadMore = () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    // Simulate delay
    setTimeout(() => {
      const nextPage = page + 1;
      setPage(nextPage);

      // Use managed products instead of the original products array
      const sourceProducts =
        managedProducts.length > 0 ? managedProducts : products;

      // Filter products again to ensure consistency
      let filtered = [...sourceProducts];

      if (filterOptions.search) {
        const searchLower = filterOptions.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );
      }

      if (filterOptions.category) {
        filtered = filtered.filter(
          (p) => p.category === filterOptions.category
        );
      }

      if (filterOptions.minRating > 0) {
        filtered = filtered.filter(
          (p) => (p.rating?.rate || 0) >= filterOptions.minRating
        );
      }

      filtered = filtered.filter(
        (p) =>
          p.price >= filterOptions.minPrice && p.price <= filterOptions.maxPrice
      );

      // Get new batch of products (repeating the original list if needed)
      const startIdx = ((nextPage - 1) * PRODUCTS_PER_PAGE) % filtered.length;
      const newBatch = [];

      for (let i = 0; i < PRODUCTS_PER_PAGE; i++) {
        const idx = (startIdx + i) % filtered.length;
        if (idx < filtered.length) {
          // Create a new object with a truly unique ID
          newBatch.push({
            ...filtered[idx],
            id: `${filtered[idx].id}-${nextPage}-${i}-${Date.now()}`,
          });
        }
      }

      // Add new products to the visible list
      setVisibleProducts((prev) => [...prev, ...newBatch]);
      setIsLoadingMore(false);
    }, 800);
  };

  // Handle product click to navigate to detail page
  const handleProductClick = (product: Product) => {
    const originalId = String(product.id).split("-")[0];
    navigate(`/products/${originalId}`);
  };

  // Open the add product dialog
  const handleAddProduct = () => {
    setFormMode("add");
    setSelectedProduct(null);
    setFormDialogOpen(true);
  };

  // Open the edit product dialog
  const handleEditProduct = (product: Product) => {
    // Get the original product from managedProducts
    const originalId = String(product.id).split("-")[0];
    const originalProduct = managedProducts.find(
      (p) => String(p.id) === originalId
    );

    setFormMode("edit");
    setSelectedProduct(originalProduct || null);
    setFormDialogOpen(true);
  };

  // Open the delete product confirmation
  const handleDeleteClick = (product: Product) => {
    // Get the original product from managedProducts
    const originalId = String(product.id).split("-")[0];
    const originalProduct = managedProducts.find(
      (p) => String(p.id) === originalId
    );

    setSelectedProduct(originalProduct || null);
    setDeleteDialogOpen(true);
  };

  // Save product (add or edit)
  const handleSaveProduct = (product: Product) => {
    if (formMode === "add") {
      // Add new product
      setManagedProducts((prev) => [...prev, product]);
      toast({
        title: "Product Added",
        description: `${product.title} has been added to your catalog.`,
      });
    } else {
      // Edit existing product
      setManagedProducts((prev) =>
        prev.map((p) => (String(p.id) === String(product.id) ? product : p))
      );
      toast({
        title: "Product Updated",
        description: `${product.title} has been updated.`,
      });
    }
  };

  // Delete product
  const handleDeleteProduct = () => {
    if (!selectedProduct) return;

    setManagedProducts((prev) =>
      prev.filter((p) => String(p.id) !== String(selectedProduct.id))
    );

    toast({
      title: "Product Deleted",
      description: `${selectedProduct.title} has been removed from your catalog.`,
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
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0 md:gap-6">
        {/* Filter Sidebar - properly fixed position */}
        <div
          className="md:sticky md:top-4 self-start h-fit"
          style={{ maxHeight: "calc(100vh - 2rem)", overflowY: "auto" }}
        >
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
              onFilterChange={setFilterOptions}
            />
          )}
        </div>

        {/* Products Grid */}
        <div className="space-y-6">
          {/* Results header */}
          <div className="flex items-center justify-between bg-background">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">{visibleProducts.length}</span> of{" "}
              <span className="font-medium">many</span> products
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

          {/* Products display */}
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
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
              {visibleProducts.length > 0 ? (
                <>
                  {/* Product grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={handleProductClick}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteClick}
                      />
                    ))}
                  </div>

                  {/* Load more button instead of infinite scroll */}
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="w-full max-w-xs"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Load More Products"
                      )}
                    </Button>
                  </div>
                </>
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
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Product Dialog */}
      <ProductFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        onSave={handleSaveProduct}
        product={selectedProduct}
        categories={categories}
        mode={formMode}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteProduct}
        product={selectedProduct}
      />
    </div>
  );
}
