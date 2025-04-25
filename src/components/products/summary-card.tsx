
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

interface TrendData {
  value: string;
  isPositive: boolean;
  label: string;
}

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: string;
  trend?: TrendData;
}

export function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  trend
}: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name={icon} className="h-5 w-5" />
          </div>
        </div>
        
        {trend && (
          <div className="mt-4 flex items-center text-xs">
            <div className={cn(
              "flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium mr-1",
              trend.isPositive 
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            )}>
              {trend.isPositive ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
              {trend.value}
            </div>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
