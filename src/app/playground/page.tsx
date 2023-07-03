"use client";

import { Editor, Monaco } from "@monaco-editor/react";
import { useRef, useState, useTransition } from "react";
import { editor } from "monaco-editor";
import { KEYWORDS } from "@/interpreter/Scanner";
import { Shell } from "@/interpreter/Shell";

const defaultCode = `fun hello(name) {
  print "Hello " + name;
}

hello("world");`;

const Page = () => {
  const [output, setOutput] = useState<string[]>([]);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [isPending, startTransition] = useTransition();

  const clearOutput = () => {
    setOutput([]);
  };

  const insertToList = ({ value }: { value: string }) => {
    setOutput((prev) => [...prev, value]);
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.languages.register({ id: "myLanguage" });
    monaco.languages.setLanguageConfiguration("myLanguage", {
      comments: {
        lineComment: "//",
        blockComment: ["/*", "*/"],
      },
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"', notIn: ["string"] },
        { open: "'", close: "'", notIn: ["string", "comment"] },
      ],
      surroundingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      folding: {
        markers: {
          start: new RegExp("^\\s*//\\s*#?region\\b"),
          end: new RegExp("^\\s*//\\s*#?endregion\\b"),
        },
      },
    });

    monaco.languages.setMonarchTokensProvider("myLanguage", {
      keywords: Object.keys(KEYWORDS),
      tokenizer: {
        root: [
          [
            /[a-zA-Z_][a-zA-Z0-9_]*/,
            {
              cases: {
                "@keywords": "keyword",
                "@default": "identifier",
              },
            },
          ],
          [/\d+/, "number"],
          [/"/, "string", "@string"],
          [/[{}()\[\]]/, "@brackets"],
          [/[;,.]/, "delimiter"],
          [/[+\-*/]/, "operator"],
        ],
        string: [
          [/[^\\"]+/, "string"],
          [/"/, "string", "@pop"],
        ],
      },
    });

    monaco.editor.defineTheme("myTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "identifier", foreground: "dcdcaa" },
        { token: "number", foreground: "b5cea8" },
        { token: "string", foreground: "ce9178" },
        { token: "operator", foreground: "d4d4d4" },
        { token: "delimiter", foreground: "d4d4d4" },
        { token: "brackets", foreground: "d4d4d4" },
      ],
      colors: {
        "editor.background": "#18181b",
      },
    });
  };

  const runCode = () => {
    const source = editorRef.current?.getValue();

    if (!source) {
      return;
    }

    clearOutput();

    startTransition(() => {
      const shell = new Shell({ output: insertToList });
      shell.run({ source });
    });
  };

  return (
    <main className="flex h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] flex-col gap-px overflow-hidden bg-neutral-700 pt-px lg:flex-row ">
      <div className="flex flex-1 flex-col gap-px">
        <div className="flex min-h-[75px] items-center gap-5 bg-zinc-900 px-5">
          <h2 className="mr-auto font-bold capitalize">code</h2>

          <button
            disabled={isPending}
            className="flex items-center gap-1 rounded-md bg-green-700 px-3 py-2 transition-colors hover:bg-green-800 disabled:opacity-50"
            onClick={runCode}
          >
            <span className="text-sm font-bold uppercase">run</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        </div>
        <div className="flex-1  bg-zinc-900 p-5">
          <Editor
            defaultLanguage="myLanguage"
            defaultValue={defaultCode}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            theme="myTheme"
            options={{
              minimap: { enabled: false },
              lineNumbers: "off",
              overviewRulerLanes: 0,
              scrollbar: {
                vertical: "hidden",
                horizontal: "hidden",
                handleMouseWheel: false,
              },
            }}
          />
        </div>
      </div>

      <div className="flex max-h-full flex-1 flex-col gap-px">
        <div className="flex min-h-[75px] items-center justify-between gap-5 bg-zinc-900 px-5">
          <h2 className="font-bold capitalize">output</h2>
          <button
            onClick={clearOutput}
            className="text-neutral-400 transition-colors hover:text-current"
          >
            clear
          </button>
        </div>
        <ol className="max-h-full flex-1 overflow-auto bg-zinc-900 p-5">
          {output.map((value, index) => (
            <li key={index}>
              <span className="text-neutral-400">ts-interpreter{">"} </span>
              <span>{value}</span>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
};

export default Page;
