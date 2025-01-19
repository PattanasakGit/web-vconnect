"use client";

import ProjectDetails from "@/screen/project-details-page";
import { useSearchParams } from "next/navigation";

export default function Post() {
  const searchParams = useSearchParams();
  const projectID = searchParams.get("projectID");

  return (
    <div className="h-full w-full">
      <ProjectDetails projectID={projectID} />
    </div>
  );
}
