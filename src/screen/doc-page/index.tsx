/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button as BTN } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import mockData from "./mockData.json";
import Snippet from "@/components/Snippet";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import Link from "next/link";
import { markdownComponents } from "@/utils/makdowComponent";

interface DocContent {
  titleEn: string;
  titleTh: string;
  contentTh: string;
  contentEn: string;
}

interface DocsData {
  [key: string]: DocContent;
}

type DocPageKey = keyof typeof mockData;
const docs: DocsData = {
  ...mockData,
};

const DocsPage: React.FC = () => {
  const [activePage, setActivePage] = useState<DocPageKey>(
    Object.keys(docs)[0] as DocPageKey
  );
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="h-full w-full flex bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r">
        <div className="p-4 font-medium text-xl text-center">Documents</div>
        <div className="px-16">
          <Link href="/portal/edit-documentation">
            <Button
              type="submit"
              customSize="sm"
              customStyle="light"
              className="w-full font-bold"
            >
              Test Edit
            </Button>
          </Link>
        </div>
        <Separator className="my-2" />
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-4 space-y-2">
            {(Object.entries(docs) as [DocPageKey, DocContent][]).map(
              ([key, { titleEn, titleTh }]) => (
                <BTN
                  key={key}
                  variant={activePage === key ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActivePage(key)}
                >
                  {currentLang === "th" ? titleTh : titleEn}
                </BTN>
              )
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-zinc-100 dark:bg-zinc-900">
        <ScrollArea className="h-full">
          <div className="p-8">
            <Card>
              <CardContent className="p-6">
                <ReactMarkdown
                  className="prose prose-blue max-w-none dark:prose-invert"
                  components={markdownComponents}
                >
                  {currentLang === "th"
                    ? docs[activePage].contentTh
                    : docs[activePage].contentEn}
                </ReactMarkdown>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DocsPage;
