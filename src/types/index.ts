
export type Category = 
  | "electronics" 
  | "clothing" 
  | "home" 
  | "beauty" 
  | "books" 
  | "sports" 
  | "food";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  category: Category;
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsSummary {
  totalProducts: number;
  averagePrice: number;
  highestRatedProduct: Partial<Product>;
  mostCommonCategory: {
    category: Category;
    count: number;
  };
}

export interface FilterOptions {
  search: string;
  category: Category | null;
  minRating: number;
  minPrice: number;
  maxPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}
