import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-yaml";
import { Copy, CopyCheck } from "lucide-react";

interface CodeBlockProps {
  children: string;
  className?: string;
}

const Snippet: React.FC<CodeBlockProps> = ({ children, className }) => {
  const language = className?.replace(/language-/, "") || "text";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-[80dvw] lg:w-[50dvw] overflow-hidden">
      <pre className={`${className} rounded-lg !m-0 overflow-x-auto`}>
        <code className={`language-${language}`}>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-[#00000020] hover:bg-[#353a44] transition-colors rounded-sm"
      >
        {copied ? (
          <CopyCheck className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-slate-300" />
        )}
      </button>
    </div>
  );
};

export default Snippet;
