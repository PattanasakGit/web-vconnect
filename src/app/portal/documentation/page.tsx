"use client";

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import DocsPage from "@/screen/doc-page";
export default function DocumentTation() {
  useBreadcrumbs({ currentPage: "documentation" });
  return (
    <div className="flex h-full flex-col items-center">
      <DocsPage />
    </div>
  );
}
