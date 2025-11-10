import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Task } from "@/lib/types";
import { getColor } from "@/lib/ui/color";
import { DraggableProvided } from "@hello-pangea/dnd";

export default function BoardTask({
  task,
  provided,
  setTask,
}: {
  task: Task;
  setTask: (t: Task) => void;
  provided: DraggableProvided;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-background"
        >
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 overflow-hidden">
            {task.tags?.map((tag, i) => (
              <span
                key={tag.name}
                style={getColor(tag.color)}
                className="inline-flex items-center py-0.5 px-1.5 rounded-sm max-w-full truncate"
              >
                {tag.name}
              </span>
            ))}
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
