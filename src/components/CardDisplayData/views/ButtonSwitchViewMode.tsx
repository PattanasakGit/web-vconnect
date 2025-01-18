import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

const ButtonSwitchViewMode = ({
  hide,
  viewMode,
  setViewMode,
}: {
  hide: boolean;
  viewMode: "grid" | "list";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>;
}) => {
  return (
    <div className="flex" style={{ display: hide ? "none" : "block" }}>
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
  );
};

export default ButtonSwitchViewMode;
