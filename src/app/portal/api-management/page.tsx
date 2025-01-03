"use client";

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import ApiKeyPage from "@/screen/api-key-page";
export default function APIManagement() {
  useBreadcrumbs({ currentPage: "api_management" });
  return (
    <div className="flex h-full flex-col items-center">
      <ApiKeyPage />
    </div>
  );
}
