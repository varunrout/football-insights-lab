
"use client";

import { useState, type FormEvent } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, LogIn, ShieldAlert, LogOut } from "lucide-react";

export default function DeveloperPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError(""); 
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setError("");
  };

  if (!isAuthenticated) {
    return (
      <>
        <AppHeader title="Developer Access" />
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center bg-muted/40">
          <Card className="w-full max-w-md shadow-xl border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <ShieldAlert className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Developer Section Login</CardTitle>
              <CardDescription>
                This area is restricted. Please enter your credentials.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Authentication Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="admin"
                    autoComplete="username"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button type="submit" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" /> Secure Login
                </Button>
              </CardFooter>
            </form>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader title="Developer Section" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <Terminal className="h-7 w-7 text-primary" />
                        Developer Tools & Information
                    </CardTitle>
                    <CardDescription>
                    This section provides tools and information for development and administrative purposes.
                    </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Admin Access Granted</AlertTitle>
              <AlertDescription>
                You have successfully authenticated to the developer section.
                {process.env.NEXT_PUBLIC_APP_ENV && (
                  <span className="block mt-1 text-xs">
                    Current Environment: <strong className="text-accent">{process.env.NEXT_PUBLIC_APP_ENV.toUpperCase()}</strong>
                  </span>
                )}
              </AlertDescription>
            </Alert>
            
            <h3 className="text-lg font-semibold pt-2">Available Tools:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground pl-4">
              <li>View application logs and debugging information.</li>
              <li>Manage Genkit model configurations and test prompts.</li>
              <li>Access data import/export utilities.</li>
              <li>Control feature flags and experimental features.</li>
              <li>Monitor API endpoint health and performance.</li>
              <li>Clear application cache or reset mock data.</li>
            </ul>
             <p className="text-xs text-muted-foreground pt-4 border-t mt-6">
                Session is client-side and will be lost on page refresh. For persistent admin sessions, a proper backend authentication system is required.
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
