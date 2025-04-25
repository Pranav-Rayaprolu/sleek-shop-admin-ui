import { AnalyticsSummary, Category, Product, User } from "@/types";

// Mock product data
export const products: Product[] = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    description: "High-quality noise cancelling wireless headphones with superior sound quality and comfort for extended use.",
    price: 15999,
    rating: {
      rate: 4.8,
      count: 120
    },
    stock: 25,
    category: "electronics",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?q=80&w=800&auto=format&fit=crop",
    ],
    createdAt: "2023-09-15T08:00:00Z",
    updatedAt: "2023-10-20T10:30:00Z",
  },
  {
    id: "2",
    title: "Designer Cotton T-Shirt",
    description: "Premium cotton t-shirt with modern cut and unique design patterns. Available in multiple sizes.",
    price: 1999,
    discountPercentage: 10,
    rating: {
      rate: 4.2,
      count: 85
    },
    stock: 150,
    category: "clothing",
    thumbnail: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=300&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
    ],
    createdAt: "2023-08-20T14:30:00Z",
    updatedAt: "2023-11-05T09:15:00Z",
  },
  {
    id: "3",
    title: "Smart Home Assistant",
    description: "Voice-controlled smart home assistant with advanced AI capabilities. Controls your lights, music, and more.",
    price: 3999,
    rating: {
      rate: 4.5,
      count: 95
    },
    stock: 42,
    category: "electronics",
    thumbnail: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=300&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=800&auto=format&fit=crop",
    ],
    createdAt: "2023-07-10T11:45:00Z",
    updatedAt: "2023-10-18T16:20:00Z",
  },
  {
    id: "4",
    title: "Ergonomic Office Chair",
    description: "Adjustable ergonomic chair designed for comfort during long work hours. Includes lumbar support and adjustable arms.",
    price: 8499,
    rating: {
      rate: 4.7,
      count: 110
    },
    stock: 18,
    category: "home",
    thumbnail: "https://images.unsplash.com/photo-1589384376663-01036195e194?q=80&w=300&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1589384376663-01036195e194?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1589384376663-01036195e194?q=80&w=800&auto=format&fit=crop",
    ],
    createdAt: "2023-09-05T13:15:00Z",
    updatedAt: "2023-11-12T08:45:00Z",
  },
  {
    id: "5",
    title: "Natural Face Serum",
    description: "Hydrating face serum with natural ingredients to rejuvenate and brighten skin. Suitable for all skin types.",
    price: 1299,
    discountPercentage: 15,
    rating: {
      rate: 4.3,
      count: 68
    },
    stock: 75,
    category: "beauty",
    thumbnail: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=300&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop",
    ],
    createdAt: "2023-10-08T10:00:00Z",
    updatedAt: "2023-11-20T14:30:00Z",
  },
  {
    id: "6",
    title: "Bestselling Fantasy Novel",
    description: "Award-winning fantasy novel that has topped charts worldwide. First in a planned trilogy with rich world-building.",
    price: 599,
    rating: {
      rate: 4.9,
      count: 145
    },
    stock: 120,
    category: "books",
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    ],
    createdAt: "2023-08-15T09:30:00Z",
    updatedAt: "2023-10-25T11:20:00Z",
  },
  {
    id: "7",
    title: "Professional Running Shoes",
    description: "Lightweight, durable running shoes with superior cushioning and support. Ideal for professional runners and enthusiasts.",
    price: 6999,
    rating: {
      rate: 4.6,
      count: 78
    },
    stock: 35,
    category: "sports",
    thumbnail: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
    ],
    createdAt: "2023-09-25T15:45:00Z",
    updatedAt: "2023-11-15T12:10:00Z",
  },
  {
    id: "8",
    title: "Organic Gourmet Coffee",
    description: "Premium organic coffee beans sourced from sustainable farms. Rich flavor with notes of chocolate and berries.",
    price: 799,
    rating: {
      rate: 4.4,
      count: 160
    },
    stock: 200,
    category: "food",
    thumbnail: "https://images.unsplash.com/photo-1518057111178-44a106bad149?q=80&w=300&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1518057111178-44a106bad149?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518057111178-44a106bad149?q=80&w=800&auto=format&fit=crop",
    ],
    createdAt: "2023-10-18T12:30:00Z",
    updatedAt: "2023-11-22T09:40:00Z",
  },
  {
    id: "9",
    title: "Stylish Sunglasses",
    description: "Designer sunglasses with UV protection and lightweight frame. Perfect for any outdoor activity.",
    price: 2499,
    discountPercentage: 5,
    rating: {
      rate: 4.1,
      count: 55
    },
    stock: 60,
    category: "clothing",
    thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=300&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    ],
    createdAt: "2023-09-10T14:20:00Z",
    updatedAt: "2023-11-08T10:55:00Z",
  },
  {
    id: "10",
    title: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicators.",
    price: 1799,
    rating: {
      rate: 4.0,
      count: 70
    },
    stock: 85,
    category: "electronics",
    thumbnail: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=300&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=800&auto=format&fit=crop",
    ],
    createdAt: "2023-10-05T16:50:00Z",
    updatedAt: "2023-11-18T13:25:00Z",
  },
  {
    id: "11",
    title: "Modern Wall Art",
    description: "Contemporary abstract wall art printed on high-quality canvas. Perfect for living rooms and offices.",
    price: 3299,
    rating: {
      rate: 4.3,
      count: 48
    },
    stock: 30,
    category: "home",
    thumbnail: "https://images.unsplash.com/photo-1547333590-47fae5f58d21?q=80&w=300&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1547333590-47fae5f58d21?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1547333590-47fae5f58d21?q=80&w=800&auto=format&fit=crop",
    ],
    createdAt: "2023-08-28T10:15:00Z",
    updatedAt: "2023-10-30T17:40:00Z",
  },
  {
    id: "12",
    title: "Luxury Skincare Set",
    description: "Complete skincare routine with cleanser, toner, serum, and moisturizer. Made with premium natural ingredients.",
    price: 5999,
    discountPercentage: 20,
    rating: {
      rate: 4.7,
      count: 32
    },
    stock: 25,
    category: "beauty",
    thumbnail: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=300&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop",
    ],
    createdAt: "2023-09-20T09:05:00Z",
    updatedAt: "2023-11-25T15:30:00Z",
  }
];

// Generate analytics summary
export const getAnalyticsSummary = (): AnalyticsSummary => {
  // Calculate total products
  const totalProducts = products.length;
  
  // Calculate average price
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = Math.round(totalPrice / totalProducts);
  
  // Find highest rated product
  const highestRatedProduct = [...products].sort((a, b) => b.rating.rate - a.rating.rate)[0];
  
  // Find most common category
  const categoryCounts: Record<string, number> = {};
  products.forEach(product => {
    if (categoryCounts[product.category]) {
      categoryCounts[product.category]++;
    } else {
      categoryCounts[product.category] = 1;
    }
  });
  
  let mostCommonCategory: { category: Category; count: number } = {
    category: "electronics",
    count: 0
  };
  
  Object.entries(categoryCounts).forEach(([category, count]) => {
    if (count > mostCommonCategory.count) {
      mostCommonCategory = {
        category: category as Category,
        count: count
      };
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
};

// Mock user data
export const currentUser: User = {
  id: "u1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3",
  role: "Admin"
};

// Helper functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
