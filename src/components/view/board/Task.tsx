import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/lib/types";
import { getColor } from "@/lib/ui/color";
import { DraggableProvided } from "@hello-pangea/dnd";

export default function BoardTask({
  task,
  provided,
}: {
  task: Task;
  provided: DraggableProvided;
}) {
  return (
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
  );
}
