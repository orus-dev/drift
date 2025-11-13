"use client";

import { useEffect, useRef, useState } from "react";

import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
import Delimiter from "@editorjs/delimiter";
import Warning from "@editorjs/warning";
import InlineCode from "@editorjs/inline-code";

export default function DocView() {
  const holderRef = useRef<HTMLDivElement | null>(null);
  const [doc, setDoc] = useState({ blocks: [] });

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
          header: Header,
          delimiter: Delimiter,
          warning: Warning,
          inlineCode: InlineCode,
        },
        data: doc,
        async onChange() {
          const savedData = await editor.save();
          console.log("Document data:", savedData);
          setDoc(savedData);
        },
      });
    })();

    return () => {
      isMounted = false;
      if (editor) editor.destroy();
    };
  }, []);

  return (
    <div className="h-full w-3xl mx-auto bg-accent/20 rounded-2xl p-4">
      <div ref={holderRef} className="docs-view" />
    </div>
  );
}
