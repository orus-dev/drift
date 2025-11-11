import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Task } from "@/lib/types";
import { Color, getColor } from "@/lib/ui/color";
import { DraggableProvided } from "@hello-pangea/dnd";

export default function BoardTask({
  task,
  provided,
  setTask,
  tags,
}: {
  task: Task;
  setTask: (t: Task) => void;
  provided: DraggableProvided;
  tags: Record<string, { color: Color; name: string }>;
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
          <CardContent className="flex flex-wrap gap-1.5 overflow-hidden">
            {task.tags?.map((tag, i) => (
              <Badge
                key={tag}
                variant="outline"
                style={getColor(tags[tag].color)}
              >
                {tag}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </SheetTrigger>
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
            {/* <Input
              defaultValue={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            /> */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
