
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Ensure Textarea is imported

export default function ProfilePage() {
  return (
    <>
      <AppHeader title="User Profile" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="items-center text-center">
            <Avatar className="w-24 h-24 mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar" />
              <AvatarFallback>UA</AvatarFallback>
            </Avatar>
            <CardTitle>Alex Raymond</CardTitle>
            <CardDescription>alex.raymond@example.com</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Alex" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Raymond" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="alex.raymond@example.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us a little about yourself"
                defaultValue="Football analytics enthusiast, data scientist, and lifelong fan of the beautiful game. Always looking for new insights in data."
                className="min-h-[100px]"
              />
            </div>
             <div className="space-y-1">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full sm:w-auto ml-auto">Save Changes</Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
