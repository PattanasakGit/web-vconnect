"use client";

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
export default function Home() {
  useBreadcrumbs({ currentPage: "portal" });
  return (
    <div className="flex h-full flex-col items-center justify-between p-24 bg-blue-400">
      <h1>Portal Page</h1>
    </div>
  );
}
