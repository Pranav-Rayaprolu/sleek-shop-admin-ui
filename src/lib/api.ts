import { AnalyticsSummary, Category, Product } from "@/types";

const BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform the data to match our Product interface
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      rating: item.rating || { rate: 0, count: 0 },
      stock: Math.floor(Math.random() * 100), // Simulate stock as it's not in the API
      category: item.category,
      thumbnail: item.image,
      image: item.image,
      images: [item.image],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function fetchProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }
    
    const item = await response.json();
    
    // Transform to match our Product interface
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      rating: item.rating || { rate: 0, count: 0 },
      stock: Math.floor(Math.random() * 100), // Simulate stock
      category: item.category,
      thumbnail: item.image,
      image: item.image,
      images: [item.image],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    throw error;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    
    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching products by category: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform the data to match our Product interface
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      rating: item.rating || { rate: 0, count: 0 },
      stock: Math.floor(Math.random() * 100), // Simulate stock
      category: item.category,
      thumbnail: item.image,
      image: item.image,
      images: [item.image],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  } catch (error) {
    console.error(`Failed to fetch products for category ${category}:`, error);
    throw error;
  }
}

export function calculateAnalyticsSummary(products: Product[]): AnalyticsSummary {
  // Return empty summary if no products
  if (products.length === 0) {
    return {
      totalProducts: 0,
      averagePrice: 0,
      highestRatedProduct: {},
      mostCommonCategory: { category: '', count: 0 }
    };
  }

  // Calculate total products
  const totalProducts = products.length;
  
  // Calculate average price
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = totalPrice / totalProducts;
  
  // Find highest rated product
  const highestRatedProduct = [...products].sort((a, b) => 
    (b.rating?.rate || 0) - (a.rating?.rate || 0)
  )[0];
  
  // Find most common category
  const categoryCount: Record<string, number> = {};
  products.forEach(product => {
    categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
  });
  
  let mostCommonCategory: { category: Category; count: number } = { category: '', count: 0 };
  
  Object.entries(categoryCount).forEach(([category, count]) => {
    if (count > mostCommonCategory.count) {
      mostCommonCategory = { category: category as Category, count };
    }
  });
  
  return {
    totalProducts,
    averagePrice,
    highestRatedProduct: {
      id: highestRatedProduct.id,
      title: highestRatedProduct.title,
      rating: highestRatedProduct.rating,
      thumbnail: highestRatedProduct.thumbnail
    },
    mostCommonCategory
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
