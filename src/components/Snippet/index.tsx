import React, { useState, useEffect, useRef } from "react";
import { Copy, CopyCheck } from "lucide-react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";
import "highlight.js/styles/atom-one-dark.css";

const languages = {
  javascript,
  typescript,
  python,
  java,
  css,
  html,
  bash,
};

Object.entries(languages).forEach(([name, language]) => {
  hljs.registerLanguage(name, language);
});

interface SnippetProps {
  code: string;
  language: string;
}

const Snippet: React.FC<SnippetProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-[#282c34] my-4">
      <div className="flex justify-between items-center px-2 py-1 bg-[#21252b]">
        <span className="text-sm text-slate-300 capitalize font-black px-2">{language}</span>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-[#353a44] rounded transition-colors"
        >
          {copied ? (
            <CopyCheck className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-slate-300" />
          )}
        </button>
      </div>
      <div className="p-3 overflow-x-auto">
        <pre className="m-0">
          <code
            ref={codeRef}
            className={`language-${language} text-sm text-white`}
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Snippet;
