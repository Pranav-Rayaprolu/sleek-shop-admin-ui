# Sleek Shop Admin UI

A professional-grade e-commerce admin dashboard built with modern frontend technologies.

![Sleek Shop Admin UI](./public/preview.png)

<!-- Note: Replace preview.png with an actual screenshot of your application before deployment -->

## Features

- **Modern, Responsive UI**: Clean and professional interface that works across all device sizes
- **Product Management**: Browse, filter, search, and view product details
- **Data Visualization**: Analytics dashboard with interactive charts
- **Theme Toggle**: Switch between light and dark modes
- **User Settings**: Profile, notification, and security management

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **TanStack Query (React Query)** for server state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Shadcn UI** (based on Radix UI primitives) for UI components
- **Recharts** for data visualization
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sleek-shop-admin-ui.git

# Navigate to the project directory
cd sleek-shop-admin-ui

# Install dependencies
npm install
# or
pnpm install
# or
bun install
```

### Development

```bash
# Start the development server
npm run dev
# or
pnpm dev
# or
bun dev
```

Visit `http://localhost:5173` to view the application.

### Build

```bash
# Build for production
npm run build
# or
pnpm build
# or
bun build
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── dashboard/    # Dashboard-specific components
│   ├── layout/       # Layout components (header, sidebar)
│   ├── products/     # Product-related components
│   ├── ui/           # Shadcn UI components
│   └── theme-provider.tsx
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and API calls
├── pages/            # Page components
│   ├── Dashboard.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Analytics.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## Features

### Dashboard

- Overview of store performance
- Summary cards with key metrics
- Recent products list

### Products

- Grid view of all products
- Filter by category, price range, and rating
- Search functionality
- Pagination
- Detailed product view

### Analytics

- Interactive charts for sales and revenue
- Product category distribution
- Price range distribution
- Top-rated products

### Settings

- User profile management
- Notification preferences
- Appearance settings
- Security settings

## API

This project uses the [Fake Store API](https://fakestoreapi.com/) for product data:

- GET `/products` - Fetch all products
- GET `/products/:id` - Fetch a single product
- GET `/products/categories` - Fetch all categories
- GET `/products/category/:category` - Filter products by category

## License

MIT

## Acknowledgements

- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TanStack Query](https://tanstack.com/query)
- [React Router](https://reactrouter.com)
- [Fake Store API](https://fakestoreapi.com)
