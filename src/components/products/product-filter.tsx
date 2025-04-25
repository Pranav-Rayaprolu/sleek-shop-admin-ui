
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Category, FilterOptions } from "@/types";
import { Star, X } from "lucide-react";
import { useEffect, useState } from "react";

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
  onFilterChange
}: ProductFilterProps) {
  const [search, setSearch] = useState(filterOptions.search);
  const [category, setCategory] = useState<Category | null>(filterOptions.category);
  const [minRating, setMinRating] = useState(filterOptions.minRating);
  const [priceRange, setPriceRange] = useState([filterOptions.minPrice, filterOptions.maxPrice]);
  
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
        maxPrice: priceRange[1]
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
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">Filters</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResetFilters}
            className="h-7 text-xs"
          >
            <X className="h-3 w-3 mr-1" /> Clear
          </Button>
        </div>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-sm">Category</Label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs capitalize"
              onClick={() => setCategory(category === cat ? null : cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-sm">Rating</Label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              variant={minRating === rating ? "default" : "outline"}
              size="sm"
              className="px-2 h-8"
              onClick={() => handleRatingClick(rating)}
            >
              <Star className={cn("h-4 w-4", minRating >= rating ? "fill-primary" : "")} />
            </Button>
          ))}
          {minRating > 0 && (
            <span className="ml-2 text-xs">& Up</span>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm">Price Range</Label>
          <span className="text-xs text-muted-foreground">
            {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
          </span>
        </div>
        <Slider
          value={priceRange}
          min={0}
          max={maxPrice}
          step={100}
          onValueChange={setPriceRange}
          className="py-4"
        />
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/data";
