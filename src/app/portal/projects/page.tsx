"use client";

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import ProjectsPage from "@/screen/projects-page";
export default function APIManagement() {
  useBreadcrumbs({ currentPage: "projects" });
  return (
    <div className="h-full w-full">
      <ProjectsPage />
    </div>
  );
}
