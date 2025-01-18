"use client";

import React, { useState, useEffect, useRef } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Button as BTN } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Menu, ChevronLeft } from "lucide-react";
import data from "@/store/documentation/data.json";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import Link from "next/link";
import RenderMarkdown from "@/components/RenderMakdown";
import { useIsMobile } from "@/hooks/use-mobile";

interface DocContent {
  titleEn: string;
  titleTh: string;
  contentTh: string;
  contentEn: string;
}
type DocsData = Record<string, DocContent>;
type DocPageKey = keyof typeof data;

const docs: DocsData = { ...data };

const DocsPage: React.FC = () => {
  const [activePage, setActivePage] = useState<DocPageKey>(
    Object.keys(docs)[0] as DocPageKey
  );
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const { i18n } = useTranslation();
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null
  );
  const isMobileView = useIsMobile();
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMDX = async (): Promise<void> => {
      const content =
        i18n.language === "th"
          ? docs[activePage].contentTh
          : docs[activePage].contentEn;

      try {
        const mdxSource = await serialize(content, {
          parseFrontmatter: true,
          mdxOptions: {
            development: process.env.NODE_ENV === "development",
          },
        });
        setMdxSource(mdxSource);
      } catch (error) {
        console.error("Error serializing MDX:", error);
      }
    };

    void loadMDX();
  }, [activePage, i18n.language]);

  // Effect to scroll to top when topic changes
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableElement) {
        scrollableElement.scrollTop = 0;
      }
    }
  }, [activePage]);

  const handleTopicSelect = (key: DocPageKey) => {
    setActivePage(key);
    if (isMobileView) {
      setShowMobileSidebar(false);
    }
  };

  const renderSidebarContent = (isMobile: boolean = false) => (
    <div className={`${isMobile ? 'w-full' : 'w-64 min-w-[16rem]'} border-r`}>
      <div className="p-4 font-medium text-xl text-center flex items-center justify-between">
        {isMobile && (
          <BTN
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileSidebar(false)}
            className="mr-2"
          >
            <ChevronLeft className="h-6 w-6" />
          </BTN>
        )}
        <span className="flex-1">Documents</span>
      </div>
      <Separator className="my-2" />
      <ScrollArea className={isMobile ? 'h-[calc(100vh-5rem)]' : 'h-[calc(100vh-5rem)]'}>
        <div>
          {(Object.entries(docs) as [DocPageKey, DocContent][]).map(
            ([key, { titleEn, titleTh }]) => (
              <BTN
                key={key}
                variant={activePage === key ? "secondary" : "ghost"}
                className="w-full rounded-none h-[50px] truncate"
                onClick={() => handleTopicSelect(key)}
              >
                <p className="w-full text-start truncate">
                  {i18n.language === "th" ? titleTh : titleEn}
                </p>
              </BTN>
            )
          )}
        </div>
        <div className="mt-[70%] px-4 md:px-16">
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
      </ScrollArea>
    </div>
  );

  const renderMobileSidebar = () => (
    <div
      className={`fixed inset-0 bg-background z-50 transform transition-transform duration-300 ${
        showMobileSidebar ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {renderSidebarContent(true)}
    </div>
  );

  const renderContent = () => (
    <div className="flex-1 min-w-0 bg-zinc-100 dark:bg-zinc-900">
      {isMobileView && (
        <div className="p-4 flex items-center">
          <BTN
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileSidebar(true)}
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </BTN>
          <span className="ml-2 font-medium">
            {i18n.language === "th" 
              ? docs[activePage].titleTh 
              : docs[activePage].titleEn}
          </span>
        </div>
      )}
      <ScrollArea ref={scrollAreaRef} className="h-full">
        <div ref={contentRef} className="p-4">
          <Card>
            <CardContent className="p-6">
              <RenderMarkdown mdxSource={mdxSource} />
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="h-full w-full flex bg-background">
      {!isMobileView && renderSidebarContent()}
      {isMobileView && renderMobileSidebar()}
      {renderContent()}
    </div>
  );
};

export default DocsPage;