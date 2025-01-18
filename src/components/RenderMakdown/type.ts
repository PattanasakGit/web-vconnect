import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface MDXHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export interface MDXParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export interface MDXListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  children: React.ReactNode;
}

export interface MDXPreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
}

export interface MDXCodeBlockProps {
  className?: string;
  children: string;
}

export interface RenderMarkdownProps {
  mdxSource: MDXRemoteSerializeResult | null;
}
