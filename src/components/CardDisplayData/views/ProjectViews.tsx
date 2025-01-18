import ButtonTheme from "@/components/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface ProjectListType {
  id: number;
  name: string;
  description: string;
}

const ProjectCard = ({ project }: { project: ProjectListType }) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className="p-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {project.name}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
        {project.description}
      </p>
      <div className="flex justify-center mt-4">
        <ButtonTheme
          icon={<Eye className="w-4 h-4" />}
          customStyle="light"
          className="mt-4 w-full bg-zinc-100 dark:bg-zinc-900"
        >
          view
        </ButtonTheme>
      </div>
    </CardContent>
  </Card>
);

const ProjectList = ({ project }: { project: ProjectListType }) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className="p-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {project.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
      </div>
      <ButtonTheme
        icon={<Eye className="w-4 h-4" />}
        customStyle="light"
        className="bg-zinc-100 dark:bg-zinc-900"
      >
        view
      </ButtonTheme>
    </CardContent>
  </Card>
);
export { ProjectCard, ProjectList };
