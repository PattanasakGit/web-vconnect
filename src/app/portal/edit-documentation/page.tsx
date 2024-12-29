"use client";

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import dynamic from "next/dynamic";

const EditDocsPage = dynamic(() => import("@/screen/doc-page/edit-doc"), {
  ssr: false,
});

export default function DocumentTation() {
  useBreadcrumbs({ currentPage: "document_managemrnt" });
  return (
    <div className="flex h-full flex-col items-center">
      <EditDocsPage />
    </div>
  );
}
