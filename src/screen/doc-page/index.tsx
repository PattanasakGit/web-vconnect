/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import mockData from "./mockData.json";
import Snippet from "@/components/Snippet";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface DocContent {
  title: string;
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

  // Type-safe component mappings for ReactMarkdown
  const markdownComponents: React.ComponentPropsWithoutRef<
    typeof ReactMarkdown
  >["components"] = {
    h1: ({ node, ...props }) => (
      <h1
        className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl mb-4"
        {...props}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2
        className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3"
        {...props}
      />
    ),
    p({ node, children }) {
      const hasBlockChild = node.children.some(
        (child: { type: string; tagName: string }) =>
          (child.type === "element" &&
            ["div", "pre", "ul", "ol"].includes(child.tagName)) ||
          child.type === "text"
      );

      if (hasBlockChild) {
        return <>{children}</>;
      }

      return <p>{children}</p>;
    },
    ul: ({ node, ...props }) => (
      <ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props} />
    ),
    li: ({ node, ...props }) => <li className="mt-2" {...props} />,
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 pl-4 italic text-gray-600 dark:text-gray-300"
        {...props}
      />
    ),
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline dark:text-blue-400 underline"
        {...props}
      >
        {children}
      </a>
    ),
    img: ({ src, alt, ...props }) => {
      return (
        <Image
          src={src}
          alt={alt}
          className="my-4 mx-auto max-w-full rounded shadow"
          {...props}
          layout="responsive"
          width={700}
          height={475}
        />
      );
    },
    code: ({ node, inline, className, children, ...props }) => {
      inline = !className;
      if (inline) {
        return (
          <code
            className="bg-gray-200 dark:bg-gray-800 text-sm px-2 py-1 rounded"
            {...props}
          >
            {children}
          </code>
        );
      }

      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "plaintext";

      return <Snippet code={String(children).trim()} language={language} />;
    },
  };

  return (
    <div className="h-full w-full flex bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r">
        <div className="p-4 font-medium text-xl text-center">Documents</div>
        <Separator className="my-2" />
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-4 space-y-2">
            {(Object.entries(docs) as [DocPageKey, DocContent][]).map(
              ([key, { title }]) => (
                <Button
                  key={key}
                  variant={activePage === key ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActivePage(key)}
                >
                  {title}
                </Button>
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
