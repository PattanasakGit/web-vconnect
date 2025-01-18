import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import EmptyState from "./views/EmptyState";
import NoSearchResults from "./views/NoSearchResults";
import ButtonSwitchViewMode from "./views/ButtonSwitchViewMode";


interface DataItem {
  id: number;
  name: string;
  description: string;
}

interface CardDisplayDatalistProps {
  data: DataItem[];
  isDataLoading: boolean;
  title: string;
  subtitle: string;
  renderCard: (item: DataItem) => React.ReactNode;
  renderList: (item: DataItem) => React.ReactNode;
  ModalCreate: React.ElementType;
  textEmptyData: {
    title: string;
    message: string;
  };
}

const CardDisplayDatalist: React.FC<CardDisplayDatalistProps> = ({
  data,
  isDataLoading,
  title,
  subtitle,
  renderCard,
  renderList,
  ModalCreate,
  textEmptyData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const isMobileView = useIsMobile();
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    (localStorage.getItem("viewMode") as "grid" | "list") ?? "grid"
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
    );
  }, [data, debouncedSearchTerm]);

  return (
    <div className="h-full w-full bg-background p-4">
      <div
        className={`h-full w-full bg-zinc-100 dark:bg-[#FFFFFF05] border rounded-xl overflow-hidden ${
          isMobileView ? "p-4" : "p-8"
        }`}
      >
        <header>
          <div className="flex justify-between items-center mb-4">
            <div
              className={`w-full flex justify-between ${
                isMobileView ? "gap-2" : "gap-8"
              }`}
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
              </div>
              <div className="relative w-[40%] hidden sm:flex">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search..."
                  className="pl-8 bg-[#ffffffdb] dark:bg-[#ffffff10] rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ModalCreate />
            </div>
          </div>
          <div className="flex justify-between items-center px-4">
            <div className="w-[70%]">
              <div className="relative sm:hidden">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search..."
                  className="pl-8 bg-[#ffffffdb] dark:bg-[#ffffff10] rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <ButtonSwitchViewMode
              hide={data.length === 0 ? true : false}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>
        </header>

        <ScrollArea className="h-[85%] p-3">
          <div className="space-y-6">
            {isDataLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : data.length === 0 ? (
              <EmptyState
                ModalCreate={ModalCreate}
                textEmptyData={textEmptyData}
              />
            ) : filteredData.length === 0 ? (
              <NoSearchResults
                searchTerm={debouncedSearchTerm}
                setSearchTerm={setSearchTerm}
              />
            ) : viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((item) => renderCard(item))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredData.map((item) => renderList(item))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CardDisplayDatalist;
