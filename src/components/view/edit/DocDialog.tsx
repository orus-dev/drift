import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import DocView from "../DocView";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/lib/types";
import { Color, getColor } from "@/lib/ui/color";
import { useState } from "react";
import { OutputData } from "@editorjs/editorjs";

export default function DocDialog({
  task,
  setTask,
  tags,
  children,
}: {
  task: Task;
  setTask: (t: Task) => void;
  tags: Record<string, { color: Color; name: string }>;
  children: React.ReactNode;
}) {
  const [doc, setDoc] = useState<OutputData>({ blocks: [] });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] md:max-w-3xl! lg:max-w-4xl!">
        <DialogTitle>{task.title} - Notes</DialogTitle>
        <DialogDescription>{task.description}</DialogDescription>
        <DialogHeader>
          <div className="flex flex-wrap gap-1.5 overflow-hidden">
            {task.tags?.map((tag, i) => (
              <Badge
                key={tag}
                variant="outline"
                style={getColor(tags[tag].color)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <ScrollArea className="h-[60vh]">
          <DocView key={0} doc={doc} setDoc={setDoc} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
