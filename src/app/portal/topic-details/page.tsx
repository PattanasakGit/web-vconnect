"use client";

import TopicDetailPage from "@/screen/topic-details-page";
import { useSearchParams } from "next/navigation";

export default function Post() {
  const searchParams = useSearchParams();
  const topicID = searchParams.get("topicID");

  return (
    <div className="h-full w-full">
      <TopicDetailPage topicID={topicID} />
    </div>
  );
}
