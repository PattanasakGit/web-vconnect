"use client";

import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarLists from "@/constants/sidebarLists";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar items={SidebarLists} />
      <main className="w-full">
        <Navbar />
        <div className="w-full h-[calc(100vh-61px)] overflow-hidden">{children}</div>
      </main>
    </SidebarProvider>
  );
}
