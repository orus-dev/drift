import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SheetTrigger } from "@/components/ui/sheet";
import { Task } from "@/lib/types";
import { Color, getColor } from "@/lib/ui/color";
import { DraggableProvided } from "@hello-pangea/dnd";
import TaskEdit from "../TaskEdit";

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
    <TaskEdit task={task} tags={tags} setTask={setTask}>
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
    </TaskEdit>
  );
}
