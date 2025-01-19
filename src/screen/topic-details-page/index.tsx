import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { QrCode, Trash2, Copy, Check, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import ButtonWarnning from "@/components/ButtonWarnning";
import { QRCodeSVG } from "qrcode.react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TopicDetailType {
  id: string;
  name: string;
  password: string;
  status: boolean;
  textQrCode: string;
  description: string;
  createAt: string;
  updateAt: string;
}

const mockTopicLists: TopicDetailType = {
  id: "1",
  name: "Sample Topic",
  password: "n?oh@1ouhX=oiohoh",
  status: true,
  textQrCode: "Sample Topic<and>n?oh@1ouhX=oiohoh",
  description: "This is a sample topic description",
  createAt: "2024-01-19T10:00:00Z",
  updateAt: "2024-01-19T10:00:00Z",
};

const TopicDetailPage = ({ topicID }: { topicID: string | null }) => {
  const [itemDetail, setItemDetail] = useState<TopicDetailType>();
  const [isLoading, setIsLoading] = useState(false);
  const [copyNameStatus, setCopyNameStatus] = useState(false);
  const [copyPasswordStatus, setCopyPasswordStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isMobileView = useIsMobile();

  const handleCopy = async (text: string, type: "name" | "password") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "name") {
        setCopyNameStatus(true);
        setTimeout(() => setCopyNameStatus(false), 2000);
      } else {
        setCopyPasswordStatus(true);
        setTimeout(() => setCopyPasswordStatus(false), 2000);
      }
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleDeleteTopic = async (topicID: string) => {
    try {
      // Implement delete logic here
      console.log('topicID =>', topicID);
      toast.success("Topic deleted successfully");
    } catch {
      toast.error("Failed to delete topic");
    }
  };

  const handleToggleStatus = async (topicID: string) => {
    try {
      console.log('topicID =>', topicID);
      setItemDetail((prev) =>
        prev ? { ...prev, status: !prev.status } : prev
      );
      toast.success("Status updated successfully");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const renderStatus = () => {
    return (
      <Badge
        variant={itemDetail?.status ? "success" : "destructive"}
        className="h-6"
      >
        {itemDetail?.status ? "Active" : "Inactive"}
      </Badge>
    );
  };

  const renderSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-8 w-1/2" />
    </div>
  );

  const renderCopyButton = (
    text: string,
    type: "name" | "password",
    copied: boolean
  ) => (
    <button
      onClick={() => handleCopy(text, type)}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4 text-gray-500" />
      )}
    </button>
  );

  useEffect(() => {
    const fetchTopicDetails = async () => {
      setIsLoading(true);
      try {
        const response = await new Promise<TopicDetailType>((resolve) =>
          setTimeout(() => resolve(mockTopicLists), 1000)
        );
        setItemDetail(response);
      } catch {
        toast.error("Failed to load topic details");
      } finally {
        setIsLoading(false);
      }
    };

    if (topicID) {
      fetchTopicDetails();
    }
  }, [topicID]);

  if (isLoading) {
    return (
      <div className="h-full w-full bg-background p-4">
        <div
          className={`h-full w-full bg-zinc-100 dark:bg-[#FFFFFF05] border rounded-xl overflow-hidden ${
            isMobileView ? "p-4" : "p-8"
          }`}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {`TopicDetails`}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {"control your topic"}
            </p>
          </div>
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Topic Details</CardTitle>
            </CardHeader>
            <CardContent>{renderSkeleton()}</CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-background p-4">
      <div
        className={`h-full w-full bg-zinc-100 dark:bg-[#FFFFFF05] border rounded-xl overflow-hidden ${
          isMobileView ? "p-2" : "p-8"
        }`}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {`Topic: ${itemDetail?.name}`}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {"control your topic"}
          </p>
        </div>
        <ScrollArea className="h-[100%] p-3 pb-16">
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              {/* <CardTitle className="text-2xl font-bold flex">
              <p className="mr-4"></p>
            </CardTitle> */}
              <div className="w-full flex justify-between items-center gap-4">
                <div className="flex items-center gap-2 border p-2 rounded-lg">
                  <Switch
                    checked={itemDetail?.status}
                    onCheckedChange={() =>
                      itemDetail && handleToggleStatus(itemDetail.id)
                    }
                  />
                  {renderStatus()}
                </div>
                <ButtonWarnning
                  className="bg-red-500 hover:bg-red-700 hover:text-white text-white"
                  text="DELETE"
                  buttonIcon={<Trash2 />}
                  title="Delete Topic"
                  detail="Are you sure you want to delete this topic? This action cannot be undone."
                  yesStyle="destructive"
                  callback={() =>
                    itemDetail && handleDeleteTopic(itemDetail.id)
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 col-span-full border rounded-lg p-6 bg-gray-50 dark:bg-stone-900 transition-colors">
                  <h3 className="text-sm font-black text-muted-foreground">
                    Topic Name
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-semibold text-primary">
                      {itemDetail?.name}
                    </p>
                    {itemDetail?.name &&
                      renderCopyButton(itemDetail.name, "name", copyNameStatus)}
                  </div>
                </div>
                <div className="space-y-2 col-span-full border rounded-lg p-6 bg-gray-50 dark:bg-stone-900 transition-colors">
                  <h3 className="text-sm font-black text-muted-foreground">
                    Password
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-semibold text-primary">
                      {showPassword ? itemDetail?.password : "••••••"}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                      {itemDetail?.password &&
                        renderCopyButton(
                          itemDetail.password,
                          "password",
                          copyPasswordStatus
                        )}
                    </div>
                  </div>
                </div>

                {/* Rest of the content remains the same */}
                <div className="space-y-2 col-span-full">
                  <div className="pt-4 border-t mb-2">
                    <div className="flex items-center gap-2">
                      <QrCode className="h-5 w-5" />
                      <span className="text-sm font-black">QR Code</span>
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                      <div className="bg-white p-2">
                        <QRCodeSVG
                          value={itemDetail?.textQrCode || ""}
                          size={200}
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-muted-foreground border-t pt-4">
                    Description
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {itemDetail?.description}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-black text-muted-foreground">
                    Created At
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(itemDetail?.createAt || "").toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-black text-muted-foreground">
                    Updated At
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(itemDetail?.updateAt || "").toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TopicDetailPage;
