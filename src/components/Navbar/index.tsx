"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeSwitcher from "../ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher";
import BreadcrumbComponent from "../Breadcrumb";

export const Navbar = () => {
  return (
    <nav className="p-3 border-b">
      <div className="w-full flex items-center">
        <div className="flex flex-1 justify-start items-center gap-6">
          <SidebarTrigger />
          <BreadcrumbComponent />
        </div>
        <div className="flex-1 justify-center"></div>
        <div className="flex-1 justify-end">
          <div className="flex justify-end gap-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};
