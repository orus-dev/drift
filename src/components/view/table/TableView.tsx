"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TaskViewProps } from "../TaskView";

export function TableView({ tasks, setTasks }: TaskViewProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[200px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Tags</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-muted-foreground"
            >
              No tasks yet
            </TableCell>
          </TableRow>
        ) : (
          tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
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
              <TableCell className="max-w-[250px] truncate">
                {task.description || "-"}
              </TableCell>
              <TableCell>
                {task.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
