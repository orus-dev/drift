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
import { getColor } from "@/lib/ui/color";
import TableTask from "./Task";

export function TableView({ tasks, setTasks, tags }: TaskViewProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
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
            <TableTask
              key={task.id}
              task={task}
              setTask={(t) =>
                setTasks((tasks) => tasks.map((c) => (c.id === t.id ? t : c)))
              }
              tags={tags}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}
