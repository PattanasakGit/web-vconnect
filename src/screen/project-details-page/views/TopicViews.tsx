"use client";

import ButtonTheme from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAdjustedUrl } from "@/utils/getAdjustedUrl";
import { Eye } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface TopicListType {
  id: number;
  name: string;
  description: string;
  status?: boolean;
}

const TopicCard = ({ topic }: { topic: TopicListType }) => {
  const router = useRouter();
  const pathname = usePathname();
  const adjustUrl = getAdjustedUrl(
    pathname,
    `/topic-details?topicID=${topic.id}`
  );

  const handleClick = () => {
    router.push(adjustUrl);
  };
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-8">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {topic.name}
          </h2>
          <Badge
            variant={topic.status === true ? "success" : "destructive"}
            className="h-6"
          >
            {topic.status === true ? "active" : "inactive"}
          </Badge>
        </div>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
          {topic.description}
        </p>
        <div className="flex justify-center mt-4">
          <ButtonTheme
            icon={<Eye className="w-4 h-4" />}
            customStyle="light"
            className="mt-4 w-full bg-zinc-100 dark:bg-zinc-900"
            onClick={handleClick}
          >
            view
          </ButtonTheme>
        </div>
      </CardContent>
    </Card>
  );
};

const TopicList = ({ topic }: { topic: TopicListType }) => {
  const router = useRouter();
  const pathname = usePathname();
  const adjustUrl = getAdjustedUrl(
    pathname,
    `/topic-details?topicID=${topic.id}`
  );

  const handleClick = () => {
    router.push(adjustUrl);
  };
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {topic.name}
          </h2>
          <Badge
            variant={topic.status === true ? "success" : "destructive"}
            className="h-5"
          >
            {topic.status === true ? "active" : "inactive"}
          </Badge>
          <p className="text-gray-600 dark:text-gray-400">
            {topic.description}
          </p>
        </div>
        <ButtonTheme
          icon={<Eye className="w-4 h-4" />}
          customStyle="light"
          className="bg-zinc-100 dark:bg-zinc-900"
          onClick={handleClick}
        >
          view
        </ButtonTheme>
      </CardContent>
    </Card>
  );
};
export { TopicCard, TopicList };
