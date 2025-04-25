
export type Category = string;

export interface Product {
  id: string | number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
  category: Category;
  thumbnail: string;
  image: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
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
