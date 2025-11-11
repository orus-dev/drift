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
    <BlockNoteView
      defaultValue={doc}
      editor={editor}
      shadCNComponents={{}}
      className="w-full h-svh px-6 mt-4"
      onChange={async () => {
        if (editor) {
          console.log(editor.blocksToMarkdownLossy(editor.document));
          setDoc(editor.blocksToMarkdownLossy(editor.document));
        }
      }}
    />
  );
}
