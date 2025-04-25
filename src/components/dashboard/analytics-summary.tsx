
import { SummaryCard } from "@/components/dashboard/summary-card";
import { formatCurrency, getAnalyticsSummary } from "@/lib/data";
import { LayoutGrid, Star, TrendingUp, BarChart3 } from "lucide-react";

export function AnalyticsSummary() {
  const analytics = getAnalyticsSummary();
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Total Products"
        value={analytics.totalProducts}
        icon={<LayoutGrid className="h-5 w-5" />}
        trend={{ value: 12, isPositive: true }}
      />
      <SummaryCard
        title="Average Price"
        value={formatCurrency(analytics.averagePrice)}
        icon={<TrendingUp className="h-5 w-5" />}
        trend={{ value: 5.3, isPositive: true }}
      />
      <SummaryCard
        title="Highest Rated Product"
        value={analytics.highestRatedProduct.rating?.rate || 0}
        description={analytics.highestRatedProduct.title}
        icon={<Star className="h-5 w-5" />}
      />
      <SummaryCard
        title="Most Common Category"
        value={analytics.mostCommonCategory.category}
        description={`${analytics.mostCommonCategory.count} products`}
        icon={<BarChart3 className="h-5 w-5" />}
      />
    </div>
  );
}
