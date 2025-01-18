import React, { useEffect, useState } from "react";
import { Search, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard, ProjectList } from "./views/ProjectViews";
import EmptyState from "./views/EmptyState";
import NoSearchResults from "./views/NoSearchResults";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateProjectModal from "./views/ModalCreateProjects";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const [searchTerm, setSearchTerm] = useState("");
  const isMobileView = useIsMobile();
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    (localStorage.getItem("viewMode") as "grid" | "list") ?? "grid"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await new Promise<ProjectListType[]>((resolve) =>
          setTimeout(() => resolve(mockProjectLists), 1000)
        );
        setProjectLists(response);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const filteredProjects = projectLists.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="h-full w-full bg-background p-4">
      <div
        className={`h-full w-full bg-zinc-100 dark:bg-[#FFFFFF05] border rounded-xl overflow-hidden ${
          isMobileView ? "p-4" : "p-8"
        }`}
      >
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className={`flex ${isMobileView ? "gap-2" : "gap-8"}`}>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                PROJECTS
              </h1>
              <CreateProjectModal />
            </div>
            <div className="flex">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "rounded-r-none rounded-l-xl bg-primary text-primary-foreground"
                    : "rounded-r-none rounded-l-xl"
                }
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "rounded-l-none rounded-r-xl bg-primary text-primary-foreground"
                    : "rounded-l-none rounded-r-xl"
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              Manage and organize your projects
            </p>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search projects..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        <ScrollArea className="h-[85%] p-3">
          <div className="space-y-6 ">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : projectLists.length === 0 ? (
              <EmptyState />
            ) : filteredProjects.length === 0 ? (
              <NoSearchResults
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            ) : viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredProjects.map((project) => (
                  <ProjectList key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default ProjectsPage;
