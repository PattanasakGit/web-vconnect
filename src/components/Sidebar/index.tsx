"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

interface MenuItemProps {
  title: string;
  url: string;
  icon: React.FC;
}

const LogoContent = ({ sideBarOpen }: { sideBarOpen: boolean }) => {
  return (
    <div className="flex items-center justify-center p-4 w-full ">
      {sideBarOpen ? (
        <span className="text-lg font-bold">Logo</span>
      ) : (
        <span className="text-lg font-bold">L</span>
      )}
    </div>
  );
};

const UserContent = () => {
  return (
    <div className="flex items-center justify-center p-4 w-full">
      <span className="text-lg font-bold">User</span>
    </div>
  );
};

export function AppSidebar({ items }: { items: MenuItemProps[] }) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <LogoContent sideBarOpen={open} />
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <UserContent />
      </SidebarFooter>
    </Sidebar>
  );
}
