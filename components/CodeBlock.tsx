import React, { useState } from 'react';

interface CodeBlockProps {
  fileName: string;
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ fileName, code, language = 'typescript' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-lg border border-slate-700 bg-slate-900 overflow-hidden mb-8 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-3 text-sm text-slate-300 font-mono">{fileName}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`text-xs font-medium px-3 py-1.5 rounded transition-all duration-200 ${
            copied
              ? 'bg-green-500/20 text-green-400'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
          }`}
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed text-slate-300 whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;