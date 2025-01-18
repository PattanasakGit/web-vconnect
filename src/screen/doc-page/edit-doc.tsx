"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ButtonWarnning from "@/components/ButtonWarnning";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import {
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "./action";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import RenderMarkdown from "@/components/RenderMakdown";

interface Document {
  titleEn: string;
  titleTh: string;
  contentEn: string;
  contentTh: string;
}

interface Documents {
  [key: string]: Document;
}

const EditDocsPage: React.FC = () => {
  const [docs, setDocs] = useState<Documents>({});
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"en" | "th">("en");
  const [editingTitleMode, setEditingTitleMode] = useState(false);
  const [tempTitle, setTempTitle] = useState({ en: "", th: "" });
  const [tempContentEn, setTempContentEn] = useState<string>("");
  const [tempContentTh, setTempContentTh] = useState<string>("");
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null
  );

  const disable = isEditingContent;

  useEffect(() => {
    const fetchDocuments = async (): Promise<void> => {
      const data = await getDocuments();
      setDocs(data);
    };
    void fetchDocuments();
  }, []);

  useEffect(() => {
    const updateMDXSource = async (): Promise<void> => {
      if (!selectedDoc) {
        setMdxSource(null);
        return;
      }

      const content =
        activeTab === "en"
          ? isEditingContent
            ? tempContentEn
            : docs[selectedDoc]?.contentEn
          : isEditingContent
          ? tempContentTh
          : docs[selectedDoc]?.contentTh;

      try {
        const serializedContent = await serialize(content || "", {
          parseFrontmatter: true,
          mdxOptions: {
            development: process.env.NODE_ENV === "development",
          },
        });
        setMdxSource(serializedContent);
      } catch (error) {
        console.error("Error serializing MDX:", error);
      }
    };

    void updateMDXSource();
  }, [
    selectedDoc,
    activeTab,
    isEditingContent,
    tempContentEn,
    tempContentTh,
    docs,
  ]);

  const getContent = (id: string, lang: "en" | "th"): string => {
    if (!docs[id]) return "";
    return lang === "en" ? docs[id].contentEn : docs[id].contentTh;
  };

  const handleContentChange = (content: string, lang: "en" | "th"): void => {
    if (lang === "en") {
      setTempContentEn(content);
    } else {
      setTempContentTh(content);
    }
  };

  const handleSaveContent = async (id: string): Promise<void> => {
    if (!id || (!tempContentEn && !tempContentTh)) return;
    const updatedDoc = {
      ...docs[id],
      contentEn: tempContentEn,
      contentTh: tempContentTh,
    };
    const success = await updateDocument(id, updatedDoc);
    if (success) {
      setDocs((prev) => ({
        ...prev,
        [id]: updatedDoc,
      }));
      setIsEditingContent(false);
      setTempContentEn("");
      setTempContentTh("");
    }
  };

  const handleAddNewDoc = async (): Promise<void> => {
    const newDoc = {
      titleEn: "New Document",
      titleTh: "เอกสารใหม่",
      contentEn: "",
      contentTh: "",
    };
    const newId = await addDocument(newDoc);
    setDocs((prev) => ({
      ...prev,
      [newId]: newDoc,
    }));
    setSelectedDoc(newId);
  };

  const handleTitleEdit = (id: string): void => {
    setEditingTitleMode(true);
    setTempTitle({
      en: docs[id].titleEn,
      th: docs[id].titleTh,
    });
  };

  const handleTitleSave = async (id: string): Promise<void> => {
    if (!id || !tempTitle.en || !tempTitle.th) return;
    const updatedDoc = {
      ...docs[id],
      titleEn: tempTitle.en,
      titleTh: tempTitle.th,
    };
    const success = await updateDocument(id, updatedDoc);
    if (success) {
      setDocs((prev) => ({
        ...prev,
        [id]: updatedDoc,
      }));
      setEditingTitleMode(false);
      setTempTitle({ en: "", th: "" });
    }
  };

  const handleDeleteDoc = async (id: string): Promise<void> => {
    const success = await deleteDocument(id);
    if (success) {
      const newDocs = { ...docs };
      delete newDocs[id];
      setDocs(newDocs);
      setSelectedDoc(null);
    }
  };

  const handleEditContent = (): void => {
    if (selectedDoc) {
      setTempContentEn(docs[selectedDoc].contentEn);
      setTempContentTh(docs[selectedDoc].contentTh);
      setIsEditingContent(true);
    }
  };

  const handleCancelEdit = (): void => {
    setIsEditingContent(false);
    setTempContentEn("");
    setTempContentTh("");
  };

  return (
    <div className="h-full p-2 w-full bg-zinc-100 dark:bg-[#292a2c]">
      <ResizablePanelGroup direction="horizontal">
        {/* Sidebar */}
        <ResizablePanel defaultSize={20} minSize={20} maxSize={80}>
          <div className="h-full border rounded-lg p-4 mr-2 bg-background">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Documents</h2>
              <Button
                size="sm"
                className="bg-blue-500 hover:bg-blue-900 hover:text-white text-white"
                onClick={handleAddNewDoc}
                disabled={isEditingContent}
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
                          <span className="w-full truncate">
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
                  {isEditingContent ? (
                    <>
                      <ButtonWarnning
                        text="Cancel"
                        title="Are you sure?"
                        detail="If you cancel, all changes will be lost."
                        callback={handleCancelEdit}
                      />
                      <ButtonWarnning
                        className="bg-green-700 hover:bg-green-900 hover:text-white text-white"
                        text="Save"
                        title="Are you sure?"
                        detail="Please Check your content before save."
                        yesStyle="default"
                        callback={() => handleSaveContent(selectedDoc)}
                      />
                    </>
                  ) : (
                    <Button
                      className="bg-orange-600 hover:bg-orange-800 text-white"
                      size="sm"
                      onClick={handleEditContent}
                    >
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
                      disabled={!isEditingContent}
                      value={
                        isEditingContent
                          ? activeTab === "en"
                            ? tempContentEn
                            : tempContentTh
                          : getContent(selectedDoc, activeTab)
                      }
                      onChange={(e) =>
                        handleContentChange(e.target.value, activeTab)
                      }
                      placeholder="Write documentation(markDown) here... "
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                {/* Preview */}
                <ResizablePanel defaultSize={50}>
                  <div className="border rounded-r-sm p-4 overflow-auto h-full mt-2 pb-[80px]">
                    <RenderMarkdown mdxSource={mdxSource} />
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
