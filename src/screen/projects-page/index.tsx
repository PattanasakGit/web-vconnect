import React, { useEffect, useState } from "react";
import { ProjectCard, ProjectList } from "./views/ProjectViews";
import CreateProjectModal from "./views/ModalCreateProjects";
import CardDisplayDatalist from "@/components/CardDisplayData";
import { toast } from "sonner";

interface ProjectListType {
  id: number;
  name: string;
  description: string;
}

// const mockProjectLists: ProjectListType[] = [];
const mockProjectLists: ProjectListType[] = [
  {
    id: 1,
    name: "Project 1",
    description: "Project 1 description",
  },
  {
    id: 2,
    name: "Project 2",
    description: "Project 2 description",
  },
  {
    id: 3,
    name: "Project 3",
    description: "Project 3 description",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Project 4 description",
  },
  {
    id: 5,
    name: "Project 5",
    description: "Project 5 description",
  },
  {
    id: 6,
    name: "Project 6",
    description: "Project 6 description",
  },
  {
    id: 7,
    name: "Project 7",
    description: "Project 7 description",
  },
  {
    id: 8,
    name: "Project 8",
    description: "Project 8 description",
  },
  {
    id: 9,
    name: "Project 9",
    description: "Project 9 description",
  },
  {
    id: 10,
    name: "Project 10",
    description: "Project 10 description",
  },
  {
    id: 11,
    name: "Project 11",
    description: "Project 11 description",
  },
  {
    id: 12,
    name: "Project 12",
    description: "Project 12 description",
  },
  {
    id: 13,
    name: "Project 13",
    description: "Project 13 description",
  },
  {
    id: 14,
    name: "Project 14",
    description: "Project 14 description",
  },
  {
    id: 15,
    name: "Project 15",
    description: "Project 15 description",
  },
  {
    id: 16,
    name: "Project 16",
    description: "Project 16 description",
  },
  {
    id: 17,
    name: "Project 17",
    description: "Project 17 description",
  },
  {
    id: 18,
    name: "Project 18",
    description: "Project 18 description",
  },
  {
    id: 19,
    name: "Project 19",
    description: "Project 19 description",
  },
  {
    id: 20,
    name: "Project 20",
    description: "Project 20 description",
  },
  {
    id: 21,
    name: "Project 21",
    description: "Project 21 description",
  },
  {
    id: 22,
    name: "Project 22",
    description: "Project 22 description",
  },
  {
    id: 23,
    name: "Project 23",
    description: "Project 23 description",
  },
  {
    id: 24,
    name: "Project 24",
    description: "Project 24 description",
  },
  {
    id: 25,
    name: "Project 25",
    description: "Project 25 description",
  },
  {
    id: 26,
    name: "Project 26",
    description: "Project 26 description",
  },
];

const ProjectsPage = () => {
  const [projectLists, setProjectLists] = useState<ProjectListType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const textEmptyData = {
    title: "No Projects Yet",
    message: "Create your first project to get started",
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await new Promise<ProjectListType[]>((resolve) =>
          setTimeout(() => resolve(mockProjectLists), 1000)
        );
        setProjectLists(response);
      } catch {
        toast.error("เกิดข้อผิดพลาดในการดาวน์โหลดข้อมูลโปรเจค");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const renderProjectCard = (project: ProjectListType) => (
    <ProjectCard key={project.id} project={project} />
  );

  const renderProjectList = (project: ProjectListType) => (
    <ProjectList key={project.id} project={project} />
  );

  return (
    <CardDisplayDatalist
      data={projectLists}
      title="PROJECTS"
      subtitle="Manage your projects"
      renderCard={renderProjectCard}
      renderList={renderProjectList}
      ModalCreate={CreateProjectModal}
      isDataLoading={isLoading}
      textEmptyData={textEmptyData}
    />
  );
};

export default ProjectsPage;
