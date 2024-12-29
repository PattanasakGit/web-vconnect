"use client";

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import EditDocsPage from "@/screen/doc-page/edit-doc";
export default function DocumentTation() {
  useBreadcrumbs({ currentPage: "documentation" });
  return (
    <div className="flex h-full flex-col items-center">
      <EditDocsPage />
    </div>
  );
}
