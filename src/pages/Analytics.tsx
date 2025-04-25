
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Track your store performance and gather insights
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              This page is a placeholder for analytics functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <p className="text-muted-foreground">Analytics charts would appear here</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>
              This is a demo version with placeholder content
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <p className="text-muted-foreground">Traffic source pie chart would appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
