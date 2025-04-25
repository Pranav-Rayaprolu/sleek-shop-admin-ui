"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Settings as ISettings } from "@/types";

export default function Settings() {
  const { toast } = useToast();

  const [user, setUser] = useState<User>({
    id: "user-1",
    name: "Admin User",
    email: "admin@primestore.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    role: "Administrator",
  });

  const [settings, setSettings] = useState<ISettings>({
    notifications: {
      email: true,
      push: false,
      orderUpdates: true,
      inventoryAlerts: true,
      marketingEmails: false,
    },
    appearance: {
      theme: "light",
      compactMode: false,
      animatedTransitions: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
    },
  });

  const handleUserUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your preference settings have been saved.",
    });
  };

  const handleToggleNotification = (key: keyof ISettings["notifications"]) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleToggleAppearance = (key: keyof ISettings["appearance"]) => {
    if (key === "theme") {
      setSettings((prev) => ({
        ...prev,
        appearance: {
          ...prev.appearance,
          theme: prev.appearance.theme === "light" ? "dark" : "light",
        },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        appearance: {
          ...prev.appearance,
          [key]: !prev.appearance[key as keyof typeof prev.appearance],
        },
      }));
    }
  };

  const handleToggleSecurity = (key: keyof ISettings["security"]) => {
    if (key === "sessionTimeout") return;
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: !prev.security[key as keyof typeof prev.security],
      },
    }));
  };

  const handleSessionTimeoutChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const timeout = parseInt(e.target.value);
    if (isNaN(timeout)) return;

    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        sessionTimeout: timeout,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Settings Tab */}
        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleUserUpdate}>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <Button variant="outline" size="sm" type="button">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" value={user.role} disabled />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <Button>Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <form onSubmit={handleSettingsUpdate}>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Manage your notification and appearance settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.notifications.email}
                      onCheckedChange={() => handleToggleNotification("email")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={settings.notifications.push}
                      onCheckedChange={() => handleToggleNotification("push")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="order-updates">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about order status changes
                      </p>
                    </div>
                    <Switch
                      id="order-updates"
                      checked={settings.notifications.orderUpdates}
                      onCheckedChange={() =>
                        handleToggleNotification("orderUpdates")
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inventory-alerts">Inventory Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when products are running low on stock
                      </p>
                    </div>
                    <Switch
                      id="inventory-alerts"
                      checked={settings.notifications.inventoryAlerts}
                      onCheckedChange={() =>
                        handleToggleNotification("inventoryAlerts")
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Appearance</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="theme">Theme</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark mode
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Light</span>
                      <Switch
                        id="theme"
                        checked={settings.appearance.theme === "dark"}
                        onCheckedChange={() => handleToggleAppearance("theme")}
                      />
                      <span className="text-sm">Dark</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-mode">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Display content in a more condensed format
                      </p>
                    </div>
                    <Switch
                      id="compact-mode"
                      checked={settings.appearance.compactMode}
                      onCheckedChange={() =>
                        handleToggleAppearance("compactMode")
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <Button>Save Preferences</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <form onSubmit={handleSettingsUpdate}>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="2fa">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      id="2fa"
                      checked={settings.security.twoFactorAuth}
                      onCheckedChange={() =>
                        handleToggleSecurity("twoFactorAuth")
                      }
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">
                      Session Timeout (minutes)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after a period of inactivity
                    </p>
                    <Input
                      id="session-timeout"
                      type="number"
                      min="5"
                      max="120"
                      value={settings.security.sessionTimeout}
                      onChange={handleSessionTimeoutChange}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter your current password"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4 flex justify-between">
                <Button variant="destructive" type="button">
                  Delete Account
                </Button>
                <Button>Save Security Settings</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
