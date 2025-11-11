import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Task } from "@/lib/types";
import { Color, getColor } from "@/lib/ui/color";
import { DraggableProvided } from "@hello-pangea/dnd";

export default function TaskEdit({
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
  return (
    <Sheet>
      {children}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit task</SheetTitle>
          <SheetDescription>
            Make changes to the task here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label>Title</Label>
            <Input
              defaultValue={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>
          <div className="grid gap-3">
            <Label>Description</Label>
            <Input
              defaultValue={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </div>
          <div className="grid gap-3">
            <Label>Status</Label>
            <MultiSelect
              options={Object.entries(tags).map(([id, tag]) => ({
                label: tag.name,
                value: id,
                style: {
                  iconColor: getColor(tag.color).color,
                  badgeColor: getColor(tag.color).backgroundColor,
                },
              }))}
              onValueChange={(tags) => setTask({ ...task, tags })}
              defaultValue={task.tags}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
