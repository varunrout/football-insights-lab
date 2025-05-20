
"use client";

import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider"; // Added useTheme import
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  // Ensure the switch reflects the current theme state after client-side hydration
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleThemeChange = () => {
    toggleTheme();
  };

  if (!isMounted) {
    // You can return a loading state or null here
    // to prevent hydration mismatch for the switch's checked state.
    return null; 
  }

  return (
    <>
      <AppHeader title="Settings" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
            <CardDescription>
              Manage your application preferences and general settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Appearance</h3>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">Toggle between light and dark themes.</p>
                </div>
                <Switch 
                  id="dark-mode" 
                  aria-label="Toggle dark mode"
                  checked={theme === "dark"}
                  onCheckedChange={handleThemeChange}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Notifications</h3>
              <div className="flex items-center justify-between p-3 border rounded-md">
                 <div>
                  <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive updates via email.</p>
                </div>
                <Switch id="email-notifications" defaultChecked aria-label="Toggle email notifications"/>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                  <p className="text-xs text-muted-foreground">Get real-time alerts in the app.</p>
                </div>
                <Switch id="push-notifications" aria-label="Toggle push notifications"/>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Data Preferences</h3>
               <div className="flex items-center justify-between p-3 border rounded-md">
                 <div>
                  <Label htmlFor="data-sync" className="font-medium">Auto-Sync Data</Label>
                  <p className="text-xs text-muted-foreground">Automatically sync data from sources.</p>
                </div>
                <Switch id="data-sync" defaultChecked aria-label="Toggle data sync"/>
              </div>
            </div>
            <Button className="w-full sm:w-auto">Save Preferences</Button>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
