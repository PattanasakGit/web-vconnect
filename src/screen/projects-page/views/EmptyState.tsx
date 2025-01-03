import { FolderPlus } from "lucide-react";
import CreateProjectModal from "./ModalCreateProjects";
import { Card } from "@/components/ui/card";

const EmptyState = () => (
  <Card className="text-center p-12 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto">
    <div className="space-y-6">
      <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
        <FolderPlus className="w-8 h-8 text-gray-600 dark:text-gray-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          No Projects Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Create your first project to get started
        </p>
      </div>
      <CreateProjectModal />
    </div>
  </Card>
);
export default EmptyState;
