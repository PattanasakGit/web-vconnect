/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Snippet from "@/components/Snippet";
import ReactMarkdown from "react-markdown";

export const markdownComponents: React.ComponentPropsWithoutRef<
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
    return hasBlockChild ? <>{children}</> : <p>{children}</p>;
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
  img: ({ src, alt, ...props }) => (
    <Image
      src={src || "/api/placeholder/700/475"}
      alt={alt || ""}
      className="my-4 mx-auto max-w-full rounded shadow"
      width={700}
      height={475}
      {...props}
    />
  ),
  code: ({ node, inline, className, children, ...props }) => {
    const isInline = !className;
    if (isInline) {
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
