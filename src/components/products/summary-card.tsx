
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { LucideIcon } from "lucide-react";

interface TrendData {
  value: string;
  isPositive: boolean;
  label: string;
}

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: keyof typeof import("lucide-react");
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
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground font-medium">{subtitle}</p>}
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name={icon} className="h-5 w-5 text-primary" />
          </div>
        </div>
        
        {trend && (
          <div className="mt-4 flex items-center text-xs">
            <div className={cn(
              "flex items-center rounded-full px-2 py-1 font-medium mr-1",
              trend.isPositive 
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            )}>
              {trend.isPositive ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
              {trend.value}
            </div>
            <span className="text-muted-foreground font-medium">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
