import React, { useState } from "react";
import { Plus, Trash2, Save, Edit, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import mockData from "./mockData.json";
import { markdownComponents } from "@/utils/makdowComponent";
import ButtonWarnning from "@/components/ButtonWarnning";

interface Document {
  titleEn: string;
  titleTh: string;
  contentEn: string;
  contentTh: string;
}

interface Documents {
  [key: string]: Document;
}

const EditDocsPage = () => {
  const [docs, setDocs] = useState<Documents>(mockData);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"en" | "th">("en");
  const [editingTitleMode, setEditingTitleMode] = useState(false);
  const [tempTitle, setTempTitle] = useState({ en: "", th: "" });
  const [tempContent, setTempContent] = useState<string>("");
  const [isEditingCotent, setIsEditingContent] = useState(false);
  const disable = isEditingCotent;

  const getContent = (id: string, lang: "en" | "th") => {
    if (!docs[id]) return "";
    return lang === "en" ? docs[id].contentEn : docs[id].contentTh;
  };

  const handleContentChange = (content: string) => {
    setTempContent(content);
  };

  const handleSaveContent = (id: string) => {
    if (!id || !tempContent) return;
    setDocs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [activeTab === "en" ? "contentEn" : "contentTh"]: tempContent,
      },
    }));
    setIsEditingContent(false);
    setSelectedDoc(id);
    setTempContent("");
  };

  const handleAddNewDoc = () => {
    const newId = `doc-${Object.keys(docs).length + 1}`;
    setDocs((prev) => ({
      ...prev,
      [newId]: {
        titleEn: `New Document ${Object.keys(docs).length + 1}`,
        titleTh: `คู่มือใหม่ ${Object.keys(docs).length + 1}`,
        contentEn: "",
        contentTh: "",
      },
    }));
    setSelectedDoc(newId);
  };

  const handleDeleteDoc = (id: string) => {
    if (!id) return;
    setDocs((prev) => {
      const newDocs = { ...prev };
      delete newDocs[id];
      return newDocs;
    });
    setSelectedDoc(null);
  };

  const handleTitleEdit = (id: string) => {
    if (!id) return;
    const doc = docs[id];
    setTempTitle({ en: doc.titleEn, th: doc.titleTh });
    setEditingTitleMode(true);
  };

  const handleTitleSave = (id: string) => {
    if (!id) return;
    setDocs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        titleEn: tempTitle.en,
        titleTh: tempTitle.th,
      },
    }));
    setEditingTitleMode(false);
  };

  return (
    <div className="h-full p-2 w-full bg-zinc-100 dark:bg-[#292a2c]">
      <ResizablePanelGroup direction="horizontal">
        {/* Sidebar */}
        <ResizablePanel defaultSize={20} minSize={20} maxSize={40}>
          <div className="h-full border rounded-lg p-4 mr-2 bg-background">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Documents</h2>
              <Button
                size="sm"
                onClick={handleAddNewDoc}
                disabled={isEditingCotent}
              >
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              {Object.entries(docs).map(([id, doc]) => (
                <Card
                  key={id}
                  className={`mb-2 cursor-pointer ${
                    selectedDoc === id ? "border-primary" : ""
                  } ${disable ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !disable && setSelectedDoc(id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      {editingTitleMode && selectedDoc === id ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <Input
                              value={tempTitle.en}
                              onChange={(e) =>
                                setTempTitle((prev) => ({
                                  ...prev,
                                  en: e.target.value,
                                }))
                              }
                              placeholder="English Title"
                            />
                            <Input
                              value={tempTitle.th}
                              onChange={(e) =>
                                setTempTitle((prev) => ({
                                  ...prev,
                                  th: e.target.value,
                                }))
                              }
                              placeholder="Thai Title"
                            />
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleTitleSave(id)}
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingTitleMode(false)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <span>
                            {activeTab === "en" ? doc.titleEn : doc.titleTh}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleTitleEdit(id)}
                              disabled={disable}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteDoc(id)}
                              disabled={disable}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Main Content */}
        <ResizablePanel defaultSize={80}>
          {selectedDoc ? (
            <div className="h-full border rounded-lg p-4 bg-background">
              <div className="flex justify-between items-center">
                <Tabs
                  value={activeTab}
                  onValueChange={(v) => setActiveTab(v as "en" | "th")}
                >
                  <TabsList>
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="th">ภาษาไทย</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex gap-2">
                  {isEditingCotent ? (
                    <>
                      <ButtonWarnning
                        text="Cancel"
                        title="Are you sure?"
                        detail="If you cancel, all changes will be lost."
                        callback={() => setIsEditingContent(false)}
                      />
                      <ButtonWarnning
                        className=" bg-green-700 hover:bg-green-900 hover:text-white text-white"
                        text="Save"
                        title="Are you sure?"
                        detail="Please Check your content before save."
                        yesStyle="default"
                        callback={() => handleSaveContent(selectedDoc)}
                      />
                    </>
                  ) : (
                    <Button size="sm" onClick={() => setIsEditingContent(true)}>
                      Edit
                    </Button>
                  )}
                </div>
              </div>

              <ResizablePanelGroup direction="horizontal">
                {/* Editor */}
                <ResizablePanel defaultSize={50}>
                  <div className="border rounded-l-sm p-2 h-full mt-2">
                    <Textarea
                      className="h-full resize-none border-0 pb-[80px]"
                      disabled={!isEditingCotent}
                      value={tempContent || getContent(selectedDoc, activeTab)}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder="Write documentation(markDown) here... "
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                {/* Preview */}
                <ResizablePanel defaultSize={50}>
                  <div className="border rounded-r-sm p-4 overflow-auto h-full mt-2 pb-[80px]">
                    <ReactMarkdown components={markdownComponents}>
                      {tempContent || getContent(selectedDoc, activeTab)}
                    </ReactMarkdown>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          ) : (
            <div className="h-full border rounded-lg p-4 flex items-center justify-center text-gray-500 bg-background">
              Select a document to edit
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default EditDocsPage;
