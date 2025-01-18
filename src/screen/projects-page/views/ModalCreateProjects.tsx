import React from "react";
import { useForm } from "react-hook-form";
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ButtonTheme from "@/components/Button";
import { PlusCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type FormData = {
  porject_name: string;
  description: string;
};

const CreateProjectModal = () => {
  const isMobileView = useIsMobile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("New Project Data:", data);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonTheme
          icon={<PlusCircle className="w-5 h-5" />}
          isIconOnly={isMobileView}
          customStyle="gradientBlue"
          className={`gap-2 bg-zinc-100 dark:bg-zinc-900 ${
            isMobileView ? "rounded-2xl" : "rounded-xl"
          } `}
        >
          Create New
        </ButtonTheme>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Project Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="project-name"
              {...register("porject_name", {
                required: "Project name is required",
              })}
              className={`${
                errors.porject_name
                  ? "border-red-500 border-2"
                  : "border-2 border-zinc-200 dark:border-zinc-800"
              }`}
              placeholder="Enter project name"
            />
            {errors.porject_name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.porject_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", {
                // required: "Project description is required",
              })}
              className={`min-h-[100px] resize-none ${
                errors.description
                  ? "border-red-500 border-2"
                  : "border-2 border-zinc-200 dark:border-zinc-800"
              }`}
              placeholder="Enter project description"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <ButtonTheme
                type="button"
                customStyle="transparent"
                onClick={() => reset()}
              >
                Cancel
              </ButtonTheme>
            </DialogClose>
            <ButtonTheme type="submit" customStyle="gradientBlue">
              Create Project
            </ButtonTheme>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateProjectModal;
