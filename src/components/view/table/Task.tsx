import { Badge } from "@/components/ui/badge";
import { SheetTrigger } from "@/components/ui/sheet";
import { TableCell, TableRow } from "@/components/ui/table";
import { Task } from "@/lib/types";
import { Color, getColor } from "@/lib/ui/color";
import TaskEdit from "../TaskEdit";

export default function TableTask({
  task,
  setTask,
  tags,
}: {
  task: Task;
  setTask: (t: Task) => void;
  tags: Record<string, { color: Color; name: string }>;
}) {
  return (
    <TaskEdit task={task} tags={tags} setTask={setTask}>
      <SheetTrigger asChild>
        <TableRow>
          <TableCell className="font-medium">{task.title}</TableCell>
          <TableCell className="max-w-[250px] truncate">
            {task.description || "-"}
          </TableCell>
          <TableCell>
            <Badge
              variant={
                task.status === "done"
                  ? "default"
                  : task.status === "in-progress"
                  ? "secondary"
                  : "outline"
              }
            >
              {task.status}
            </Badge>
          </TableCell>
          <TableCell className="flex gap-1 items-center">
            {task.tags?.map((tag, i) => (
              <Badge
                key={tag}
                variant="outline"
                style={getColor(tags[tag].color)}
              >
                {tag}
              </Badge>
            ))}
          </TableCell>
        </TableRow>
      </SheetTrigger>
    </TaskEdit>
  );
}
