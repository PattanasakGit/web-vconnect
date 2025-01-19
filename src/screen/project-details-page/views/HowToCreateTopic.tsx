import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ButtonTheme from "@/components/Button";
import { PlusCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HowToCreateTopic = () => {
  const isMobileView = useIsMobile();

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
          How To Create New Topic
        </ButtonTheme>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>How To Create New Topic</DialogTitle>
        </DialogHeader>
        <div>
          Test Test Text
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default HowToCreateTopic;
