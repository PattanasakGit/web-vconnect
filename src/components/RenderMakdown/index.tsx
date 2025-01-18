import React from "react";
import { MDXRemote } from "next-mdx-remote";
import Snippet from "@/components/Snippet";
import {
  MDXCodeBlockProps,
  MDXHeadingProps,
  MDXListProps,
  MDXParagraphProps,
  MDXPreProps,
  RenderMarkdownProps,
} from "./type";

const components = {
  h1: ({ children, ...props }: MDXHeadingProps) => (
    <h1 className="text-3xl font-bold mb-4 break-words" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: MDXHeadingProps) => (
    <h2 className="text-2xl font-bold mb-3 break-words" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: MDXHeadingProps) => (
    <h3 className="text-xl font-bold mb-2 break-words" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: MDXParagraphProps) => (
    <p className="m-4 text-gray-700 dark:text-gray-300 break-words" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: MDXListProps) => (
    <ul className="list-disc pl-6 mb-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: MDXListProps) => (
    <ol className="list-decimal pl-6 mb-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-1" {...props}>
      {children}
    </li>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="text-blue-500 bg-gray-200 dark:bg-gray-800 rounded px-1 py-0.5 break-words whitespace-pre-wrap"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: MDXPreProps) => {
    const childElement = children as React.ReactElement<MDXCodeBlockProps>;

    if (
      React.isValidElement(childElement) &&
      typeof childElement.props?.className === "string" &&
      childElement.props.className.includes("language-")
    ) {
      return (
        <div className="mb-6">
          <Snippet className={childElement.props.className}>
            {childElement.props.children}
          </Snippet>
        </div>
      );
    }
    return (
      <div className="overflow-x-auto max-w-full">
        <pre
          className="bg-gray-100 dark:bg-gray-800 rounded p-4 whitespace-pre-wrap"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto max-w-full">
      <table className="min-w-full mb-4" {...props}>
        {children}
      </table>
    </div>
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img className="max-w-full h-auto" alt={props.alt || ""} {...props} />
  ),
};

const RenderMarkdown: React.FC<RenderMarkdownProps> = ({ mdxSource }) => {
  if (!mdxSource) return null;

  return (
    <div className="prose prose-blue max-w-none dark:prose-invert break-words overflow-hidden">
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
};

export default RenderMarkdown;
