"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Category, FilterOptions } from "@/types";
import { Star, X, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";

interface ProductFilterProps {
  maxPrice: number;
  categories: Category[];
  filterOptions: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function ProductFilter({
  maxPrice,
  categories,
  filterOptions,
  onFilterChange,
}: ProductFilterProps) {
  const [search, setSearch] = useState(filterOptions.search);
  const [category, setCategory] = useState<Category | null>(
    filterOptions.category
  );
  const [minRating, setMinRating] = useState(filterOptions.minRating);
  const [priceRange, setPriceRange] = useState([
    filterOptions.minPrice,
    filterOptions.maxPrice || maxPrice,
  ]);

  // Update priceRange when maxPrice changes
  useEffect(() => {
    // Only update the max value if it's at or near the old max value
    // This prevents resetting user selection when products change
    if (priceRange[1] >= maxPrice * 0.8 || priceRange[1] > maxPrice) {
      setPriceRange([priceRange[0], maxPrice]);
    }
  }, [maxPrice]);

  // Rate Change Function
  const handleRatingClick = (rating: number) => {
    if (minRating === rating) {
      setMinRating(0); // Clear the rating filter if already selected
    } else {
      setMinRating(rating);
    }
  };

  // Apply all filters
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({
        search,
        category,
        minRating,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, category, minRating, priceRange, onFilterChange]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearch("");
    setCategory(null);
    setMinRating(0);
    setPriceRange([0, maxPrice]);
  };

  return (
    <Card className="h-fit">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <h3 className="font-semibold text-sm">Filters</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="h-7 text-xs hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-3 w-3 mr-1" /> Clear all
          </Button>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Search products</Label>
          <Input
            placeholder="Type to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Categories</Label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-8 text-xs capitalize",
                  category === cat && "shadow-sm"
                )}
                onClick={() => setCategory(category === cat ? null : cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Rating</Label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant={minRating === rating ? "default" : "outline"}
                size="sm"
                className={cn("px-2 h-8", minRating === rating && "shadow-sm")}
                onClick={() => handleRatingClick(rating)}
              >
                <Star
                  className={cn(
                    "h-4 w-4",
                    minRating >= rating ? "fill-primary" : "fill-none"
                  )}
                />
              </Button>
            ))}
            {minRating > 0 && (
              <span className="ml-2 text-xs text-muted-foreground">& Up</span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="text-xs text-muted-foreground font-medium space-x-1">
              <span className="text-primary font-semibold">
                {formatCurrency(priceRange[0])}
              </span>
              <span>-</span>
              <span className="text-primary font-semibold">
                {formatCurrency(priceRange[1])}
              </span>
            </div>
          </div>
          <Slider
            value={priceRange}
            min={0}
            max={priceRange[1] > maxPrice ? priceRange[1] : maxPrice}
            step={5}
            minStepsBetweenThumbs={1}
            onValueChange={(value) => {
              // Ensure we have an array with exactly 2 values
              if (Array.isArray(value) && value.length === 2) {
                setPriceRange([value[0], value[1]]);
              }
            }}
            className="py-4"
          />
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <Label htmlFor="min-price" className="text-xs font-semibold">
                Min Price
              </Label>
              <Input
                id="min-price"
                type="number"
                min={0}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= priceRange[1]) {
                    setPriceRange([value, priceRange[1]]);
                  }
                }}
                className="h-8 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="text-xs font-semibold">
                Max Price
              </Label>
              <Input
                id="max-price"
                type="number"
                min={priceRange[0]}
                max={maxPrice * 2}
                value={priceRange[1]}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= priceRange[0]) {
                    setPriceRange([priceRange[0], value]);
                  }
                }}
                className="h-8 mt-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
