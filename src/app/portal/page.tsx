"use client";

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import PortalPage from "@/screen/portal-page";
export default function Home() {
  useBreadcrumbs({ currentPage: "portal" });
  return (
    <div className="flex h-full">
      <PortalPage />
    </div>
  );
}
