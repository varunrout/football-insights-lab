
"use client";

import { useState, type FormEvent, useEffect } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Terminal, LogIn, ShieldAlert, LogOut, CheckCircle2, XCircle, Loader2, AlertCircle, Server, KeyRound, Database } from "lucide-react";
import { getTeams } from "@/lib/data-service";

interface TestResult {
  name: string;
  status: "pending" | "success" | "error" | "idle";
  message: string;
  metric?: string;
  icon: JSX.Element;
}

const initialTestState: TestResult[] = [
  { name: "API: /api/teams", status: "idle", message: "Not run yet.", icon: <Server className="h-4 w-4" /> },
  { name: "API: /api/players", status: "idle", message: "Not run yet.", icon: <Server className="h-4 w-4" /> },
  { name: "Environment Variables", status: "idle", message: "Not run yet.", icon: <KeyRound className="h-4 w-4" /> },
  { name: "Data Service (getTeams)", status: "idle", message: "Not run yet.", icon: <Database className="h-4 w-4" /> },
];

export default function DeveloperPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [testResults, setTestResults] = useState<TestResult[]>(initialTestState);
  const [isTesting, setIsTesting] = useState(false);

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
    setTestResults(initialTestState); // Reset test results on logout
  };

  const updateTestResult = (name: string, newResult: Partial<TestResult>) => {
    setTestResults(prevResults =>
      prevResults.map(r => (r.name === name ? { ...r, ...newResult } : r))
    );
  };

  const runIntegrityChecks = async () => {
    setIsTesting(true);
    setTestResults(initialTestState.map(test => ({ ...test, status: 'pending', message: 'Running...', icon: <Loader2 className="h-4 w-4 animate-spin" /> })));

    // Check API: /api/teams
    try {
      const startTime = performance.now();
      const response = await fetch("/api/teams");
      const endTime = performance.now();
      if (response.ok) {
        await response.json(); // ensure body is readable
        updateTestResult("API: /api/teams", { status: "success", message: "OK", metric: `${(endTime - startTime).toFixed(0)}ms`, icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> });
      } else {
        updateTestResult("API: /api/teams", { status: "error", message: `Failed - Status ${response.status}`, icon: <XCircle className="h-4 w-4 text-red-500" /> });
      }
    } catch (e) {
      updateTestResult("API: /api/teams", { status: "error", message: (e as Error).message, icon: <XCircle className="h-4 w-4 text-red-500" /> });
    }

    // Check API: /api/players
    try {
      const startTime = performance.now();
      const response = await fetch("/api/players");
      const endTime = performance.now();
      if (response.ok) {
         await response.json();
        updateTestResult("API: /api/players", { status: "success", message: "OK", metric: `${(endTime - startTime).toFixed(0)}ms`, icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> });
      } else {
        updateTestResult("API: /api/players", { status: "error", message: `Failed - Status ${response.status}`, icon: <XCircle className="h-4 w-4 text-red-500" /> });
      }
    } catch (e) {
      updateTestResult("API: /api/players", { status: "error", message: (e as Error).message, icon: <XCircle className="h-4 w-4 text-red-500" /> });
    }

    // Check Environment Variables
    const requiredEnvVars = ["NEXT_PUBLIC_APP_ENV", "NEXT_PUBLIC_API_BASE_URL"];
    const missingVars = requiredEnvVars.filter(v => !process.env[v]);
    if (missingVars.length === 0) {
      updateTestResult("Environment Variables", { status: "success", message: "All required variables present.", icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> });
    } else {
      updateTestResult("Environment Variables", { status: "error", message: `Missing: ${missingVars.join(", ")}`, icon: <XCircle className="h-4 w-4 text-red-500" /> });
    }
    
    // Check Data Service (getTeams)
    try {
        const data = await getTeams();
        if (data && data.length > 0) {
            updateTestResult("Data Service (getTeams)", { status: "success", message: `OK - Loaded ${data.length} teams.`, icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> });
        } else {
            updateTestResult("Data Service (getTeams)", { status: "success", message: "OK - Service resolved, but no data or empty data.", icon: <AlertCircle className="h-4 w-4 text-yellow-500" /> });
        }
    } catch (e) {
        updateTestResult("Data Service (getTeams)", { status: "error", message: (e as Error).message, icon: <XCircle className="h-4 w-4 text-red-500" /> });
    }

    setIsTesting(false);
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
          </CardContent>
        </Card>

        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldAlert className="h-6 w-6 text-primary" />
              App Integrity Checks
            </CardTitle>
            <CardDescription>
              Run basic health checks on the application components and configurations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={runIntegrityChecks} disabled={isTesting} className="w-full sm:w-auto">
              {isTesting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ShieldAlert className="mr-2 h-4 w-4" />
              )}
              Run Integrity Checks
            </Button>
            <Separator className="my-4" />
            <div className="space-y-3">
              {testResults.map(result => (
                <Alert key={result.name} variant={result.status === 'error' ? 'destructive' : (result.status === 'success' ? 'default' : 'default')} 
                       className={result.status === 'success' ? 'border-green-500/50' : (result.status === 'pending' ? 'border-blue-500/50' : 'border-border')}>
                  {result.icon}
                  <AlertTitle className="flex justify-between items-center">
                    {result.name}
                    {result.metric && <span className="text-xs font-normal text-muted-foreground">{result.metric}</span>}
                  </AlertTitle>
                  <AlertDescription>{result.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
           <CardFooter>
             <p className="text-xs text-muted-foreground">
                These are client-side checks. For comprehensive monitoring, use dedicated backend health checks and logging.
            </p>
           </CardFooter>
        </Card>

        <Card className="shadow-lg border-border">
          <CardHeader>
             <CardTitle className="flex items-center gap-2 text-xl">
                <Server className="h-6 w-6 text-primary"/>
                Other Developer Tools
            </CardTitle>
            <CardDescription>Placeholder for future developer utilities.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground pl-4">
              <li>View application logs and debugging information (To be implemented).</li>
              <li>Manage Genkit model configurations and test prompts (To be implemented).</li>
              <li>Access data import/export utilities (To be implemented).</li>
              <li>Control feature flags and experimental features (To be implemented).</li>
              <li>Monitor API endpoint health and performance (Extended from above checks).</li>
              <li>Clear application cache or reset mock data (To be implemented).</li>
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
