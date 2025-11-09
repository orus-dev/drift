"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type Task = {
  id: string;
  title: string;
  description?: string;
};

type ColumnKey = "todo" | "inprogress" | "done";

const columnLabels: Record<ColumnKey, string> = {
  todo: "To do",
  inprogress: "In progress",
  done: "Done",
};

const id = (prefix = "t") =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

export default function Workspace() {
  const [columns, setColumns] = useState<Record<ColumnKey, Task[]>>({
    todo: [],
    inprogress: [],
    done: [],
  });

  useEffect(() => {
    setColumns({
      todo: [
        { id: id(), title: "Buy groceries" },
        { id: id(), title: "Plan sprint" },
      ],
      inprogress: [{ id: id(), title: "Build header" }],
      done: [{ id: id(), title: "Set up repo" }],
    });
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  function removeTask(col: ColumnKey, taskId: string) {
    setColumns((c) => ({ ...c, [col]: c[col].filter((t) => t.id !== taskId) }));
  }

  function onDragEnd(result: any) {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId as ColumnKey;
    const destCol = destination.droppableId as ColumnKey;

    if (sourceCol === destCol) {
      const items = Array.from(columns[sourceCol]);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setColumns({ ...columns, [sourceCol]: items });
    } else {
      const sourceItems = Array.from(columns[sourceCol]);
      const destItems = Array.from(columns[destCol]);
      const [moved] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [sourceCol]: sourceItems,
        [destCol]: destItems,
      });
    }
  }

  return (
    <div className="p-6 w-full h-full flex flex-col gap-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {(Object.keys(columnLabels) as ColumnKey[]).map((colKey) => (
            <Droppable key={colKey} droppableId={colKey}>
              {(provided) => (
                <Card
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-[220px] bg-muted/30"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{columnLabels[colKey]}</span>
                      <span className="text-sm text-muted-foreground">
                        {columns[colKey].length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      {columns[colKey].map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="border rounded-md p-3 bg-white shadow-sm hover:shadow-md transition flex flex-col gap-2"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <strong className="block">
                                    {task.title}
                                  </strong>
                                  {task.description ? (
                                    <p className="text-sm text-muted-foreground">
                                      {task.description}
                                    </p>
                                  ) : null}
                                </div>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => removeTask(colKey, task.id)}
                                >
                                  <Trash size={14} />
                                </Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {columns[colKey].length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          No tasks — try adding one!
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full items-center">
                      <span className="text-sm text-muted-foreground">
                        Quick actions
                      </span>
                      <Button
                        size="sm"
                        onClick={() => {
                          const t: Task = { id: id(), title: "New quick task" };
                          setColumns((c) => ({
                            ...c,
                            [colKey]: [t, ...c[colKey]],
                          }));
                        }}
                      >
                        Quick add
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
