
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons/logo";
import { LayoutDashboard, Brain, UsersRound, Lightbulb, Scan, Swords, UserSearch, Settings, User, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/xt-analytics", label: "xT Analytics", icon: Brain },
  { href: "/player-comparison", label: "Player Comparison", icon: UsersRound },
  { href: "/tactical-insights", label: "Tactical Insights", icon: Lightbulb },
  { href: "/positional-analysis", label: "Positional Analysis", icon: Scan },
  { href: "/match-up-analysis", label: "Match-Up Analysis", icon: Swords },
  { href: "/player-analysis", label: "Player Analysis", icon: UserSearch },
];

const utilityNavItems = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/developer", label: "Developer", icon: Terminal },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r">
      <SidebarHeader className="border-b">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg group-data-[collapsible=icon]:justify-center">
          <Logo className="h-7 w-7 text-primary group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 transition-all" />
          <span className="group-data-[collapsible=icon]:hidden">Football Insights Lab</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2 flex flex-col justify-between">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                tooltip={{ children: item.label, className: "ml-1" }}
                className={cn(
                  "justify-start",
                  (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))) && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarMenu className="mt-auto">
          {utilityNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, className: "ml-1" }}
                className={cn(
                  "justify-start",
                  pathname === item.href && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
