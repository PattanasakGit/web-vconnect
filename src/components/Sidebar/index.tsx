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
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logout03Icon } from "hugeicons-react";

import appConfig from "@/constants/appConfig";
import ButtonTheme from "../Button";

interface MenuItemProps {
  title: string;
  url: string;
  icon: React.FC;
}

export function AppSidebar({ items }: { items: MenuItemProps[] }) {
  const { open } = useSidebar();
  const userData = {
    name: "Pattanasak Atakul",
    email: "test@example.com",
  };

  const LogoContent = ({ sideBarOpen }: { sideBarOpen: boolean }) => {
    return (
      <div className="flex items-center justify-center p-4 w-full ">
        {sideBarOpen ? (
          <span className="text-lg font-bold">{appConfig.app_name}</span>
        ) : (
          <span className="text-lg font-bold">{appConfig.app_name[0]}</span>
        )}
      </div>
    );
  };

  const UserContent = () => {
    return open ? (
      <Card className="w-full flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle>{userData.name}</CardTitle>
        </CardHeader>
        <CardFooter className="w-full">
          <ButtonTheme
            customStyle="danger"
            className="w-full"
            icon={<Logout03Icon className="h-4 w-4" />}
          >
            Logout
          </ButtonTheme>
        </CardFooter>
      </Card>
    ) : (
      <ButtonTheme
        customStyle="gradientBlue"
        className="w-full"
      >
        {userData.name[0]}
      </ButtonTheme>
    );
  };

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
