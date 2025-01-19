import CardDisplayDatalist from "@/components/CardDisplayData";
import React, { useEffect, useState } from "react";
import { TopicCard, TopicList } from "./views/TopicViews";
import HowToCreateTopic from "./views/HowToCreateTopic";

interface TopicType {
  id: number;
  name: string;
  description: string;
  status?: boolean;
}

interface ProjectType {
  projectName: string;
  projectID: number;
  topicList: TopicType[];
}

const responseMock: ProjectType = {
  projectName: "Sample Project",
  projectID: 1,
  topicList: [
    { id: 1, name: "Topic 1", description: "", status: true },
    { id: 2, name: "Topic 2", description: "", status: false },
    { id: 3, name: "Topic 3", description: "", status: true },
    { id: 4, name: "Topic 4", description: "", status: false },
    { id: 5, name: "Topic 5", description: "", status: true },
    { id: 6, name: "Topic 6", description: "", status: false },
    { id: 7, name: "Topic 7", description: "", status: true },
    { id: 8, name: "Topic 8", description: "", status: false },
    { id: 9, name: "Topic 9", description: "", status: true },
    { id: 10, name: "Topic 10", description: "", status: false },
    { id: 11, name: "Topic 11", description: "", status: true },
    { id: 12, name: "Topic 12", description: "", status: false },
    { id: 13, name: "Topic 13", description: "", status: true },
    { id: 14, name: "Topic 14", description: "", status: false },
    { id: 15, name: "Topic 15", description: "", status: true },
    { id: 16, name: "Topic 16", description: "", status: false },
  ],
};

const TopicsPage = ({ projectID }: { projectID: string | null }) => {
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [data, setData] = useState<ProjectType>();
  const [isLoading, setIsLoading] = useState(true);
  const textEmptyData = {
    title: "No Topics Yet",
    message: "Create your first topics to get started",
  };

  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);
      try {
        console.log("==============");
        console.log("==============");
        console.log("projectID => ", projectID);
        console.log("==============");
        console.log("==============");

        const response = await new Promise<ProjectType>((resolve) =>
          setTimeout(() => resolve(responseMock), 1000)
        );
        setTopics(response.topicList);
        setData(response);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const renderTopicCard = (topic: TopicType) => (
    <TopicCard key={topic.id} topic={topic} />
  );

  const renderTopicList = (topic: TopicType) => (
    <TopicList key={topic.id} topic={topic} />
  );

  return (
    <CardDisplayDatalist
      data={topics}
      // title="TOPICS"
      title={data?.projectName || "TOPICS"}
      subtitle={`all topics in "${data?.projectName}"`}
      renderCard={renderTopicCard}
      renderList={renderTopicList}
      isDataLoading={isLoading}
      textEmptyData={textEmptyData}
      ButtomNotCreate={HowToCreateTopic}
      // ModalCreate={CreateTopicModal}
    />
  );
};

export default TopicsPage;
