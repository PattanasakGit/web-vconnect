"use client";

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
export default function APIManagement() {
  useBreadcrumbs({ currentPage: "projects" });
  return (
    <div className="flex flex-col items-center justify-center h-full">
        <h1> This is Project </h1>
    </div>
  );
}
