"use client";

import { useEffect, useRef } from "react";

import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
import Delimiter from "@editorjs/delimiter";
import Warning from "@editorjs/warning";
import InlineCode from "@editorjs/inline-code";
import { OutputData } from "@editorjs/editorjs";

function toMarkdown(data: OutputData): string {
  return data.blocks
    .map((block) => {
      switch (block.type) {
        case "header":
          return `${"#".repeat(block.data.level)} ${block.data.text}`;

        case "paragraph":
          return `${block.data.text}\n`;

        case "list":
          if (block.data.style === "ordered") {
            return (block.data.items as Array<{ content: string }>)
              .map((item, i) => `${i + 1}. ${item.content}`)
              .join("\n");
          } else {
            return (block.data.items as Array<{ content: string }>)
              .map((item) => `- ${item.content}`)
              .join("\n");
          }

        case "code":
          return `\`\`\`\n${block.data.code}\n\`\`\``;

        case "quote":
          return `> ${block.data.text}`;

        case "delimiter":
          return `---`;

        case "image":
          return `![${block.data.caption || ""}](${block.data.file.url})`;

        default:
          return "";
      }
    })
    .join("\n\n");
}

export default function DocView({
  doc,
  setDoc,
}: {
  doc: OutputData;
  setDoc: (data: OutputData) => void;
}) {
  const holderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let editor: any;
    let isMounted = true;

    (async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;

      if (!isMounted || !holderRef.current) return;

      editor = new EditorJS({
        holder: holderRef.current,
        placeholder: "Start writing here...",
        autofocus: true,
        tools: {
          list: { class: List, inlineToolbar: true },
          quote: { class: Quote, inlineToolbar: true },
          code: Code,
          table: Table,
          delimiter: Delimiter,
          warning: Warning,
          inlineCode: InlineCode,
          h1: {
            class: Header as unknown as EditorJS.ToolConstructable,
            config: {
              placeholder: "Header 1",
              levels: [1],
              defaultLevel: 1,
            },
            toolbox: {
              title: "H1",
            },
          },
          h2: {
            class: Header as unknown as EditorJS.ToolConstructable,
            config: {
              placeholder: "Header 2",
              levels: [2],
              defaultLevel: 1,
            },
            toolbox: {
              title: "H2",
            },
          },
          h3: {
            class: Header as unknown as EditorJS.ToolConstructable,
            config: {
              placeholder: "Header 3",
              levels: [3],
              defaultLevel: 3,
            },
            toolbox: {
              title: "H3",
            },
          },
        },
        data: doc,
        async onChange() {
          const savedData = await editor.save();
          console.log("Document data:", toMarkdown(savedData));
          setDoc(savedData);
        },
      });
    })();

    return () => {
      isMounted = false;
      if (editor) editor.destroy();
    };
  }, []);

  return <div ref={holderRef} className="docs-view h-max w-full" />;
}
