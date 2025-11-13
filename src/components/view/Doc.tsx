import { SetState } from "@/lib/types";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useEffect } from "react";

export default function DocView({
  doc,
  setDoc,
}: {
  doc: string;
  setDoc: SetState<string>;
}) {
  const editor = useCreateBlockNote();

  useEffect(() => {
    if (editor && doc) {
      editor.tryParseMarkdownToBlocks(doc);
    }
  }, [editor]);

  return (
    <div className="h-full w-3xl mx-auto bg-accent/20 rounded-2xl px-4 py-2 docs-view" onClick={() => editor.focus()}>
      <BlockNoteView
        defaultValue={doc}
        editor={editor}
        shadCNComponents={{}}
        className="w-full focus:outline-none focus:ring-0 appearance-none"
        onChange={async () => {
          if (editor) {
            console.log(editor.blocksToMarkdownLossy(editor.document));
            setDoc(editor.blocksToMarkdownLossy(editor.document));
          }
        }}
      />
    </div>
  );
}
