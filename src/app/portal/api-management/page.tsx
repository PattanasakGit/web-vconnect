"use client";

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
export default function APIManagement() {
  useBreadcrumbs({ currentPage: "api_management" });
  return (
    <div className="flex flex-col items-center justify-center h-full">
        <h1> This is API Management </h1>
    </div>
  );
}
