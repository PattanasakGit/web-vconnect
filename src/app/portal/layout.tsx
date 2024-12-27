"use client";

import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Home, Inbox, Waypoints, NotebookText } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Projects",
      url: "portal/projects",
      icon: Inbox,
    },
    {
      title: "API Management",
      url: "portal/api-management",
      icon: Waypoints,
    },
    {
      title: "Documentation",
      url: "portal/documentation",
      icon: NotebookText,
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <main className="w-full">
        <Navbar />
        <div className="w-full h-[calc(100vh-61px)] overflow-hidden">{children}</div>
      </main>
    </SidebarProvider>
  );
}
