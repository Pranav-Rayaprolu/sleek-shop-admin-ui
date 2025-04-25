
"use client";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
              Appearance
            </CardTitle>
            <CardDescription>
              Customize how the admin dashboard looks and feels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base">Theme</Label>
              <RadioGroup 
                defaultValue={theme} 
                onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                className="grid grid-cols-3 gap-4"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`relative rounded-md border-2 p-1 ${theme === "light" ? "border-primary" : "border-muted"}`}>
                    <div className="h-20 w-24 rounded bg-background">
                      <div className="h-3 w-full rounded-t bg-primary/10"></div>
                      <div className="mx-1 mt-1 h-2 w-10 rounded bg-muted"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="font-normal cursor-pointer">Light</Label>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className={`relative rounded-md border-2 p-1 ${theme === "dark" ? "border-primary" : "border-muted"}`}>
                    <div className="h-20 w-24 rounded bg-slate-950">
                      <div className="h-3 w-full rounded-t bg-primary/30"></div>
                      <div className="mx-1 mt-1 h-2 w-10 rounded bg-slate-800"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="font-normal cursor-pointer">Dark</Label>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className={`relative rounded-md border-2 p-1 ${theme === "system" ? "border-primary" : "border-muted"}`}>
                    <div className="h-20 w-24 rounded bg-gradient-to-b from-background to-slate-900">
                      <div className="h-3 w-full rounded-t bg-primary/20"></div>
                      <div className="mx-1 mt-1 h-2 w-10 rounded bg-slate-400"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system" className="font-normal cursor-pointer">System</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications" className="text-base">Notifications</Label>
                  <p className="text-muted-foreground text-sm">
                    Receive notifications about product updates
                  </p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics" className="text-base">Analytics Sharing</Label>
                  <p className="text-muted-foreground text-sm">
                    Share anonymous usage data to improve our product
                  </p>
                </div>
                <Switch id="analytics" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
              Account Preferences
            </CardTitle>
            <CardDescription>
              Manage your account settings and email preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing" className="text-base">Marketing emails</Label>
                  <p className="text-muted-foreground text-sm">
                    Receive emails about new products and features
                  </p>
                </div>
                <Switch id="marketing" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="updates" className="text-base">Product updates</Label>
                  <p className="text-muted-foreground text-sm">
                    Get notified when we release new features
                  </p>
                </div>
                <Switch id="updates" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="security" className="text-base">Security alerts</Label>
                  <p className="text-muted-foreground text-sm">
                    Get important security notifications
                  </p>
                </div>
                <Switch id="security" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-2 flex justify-end">
          <Button onClick={handleSave} size="lg" className="px-8">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
