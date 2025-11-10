"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { PlusIcon } from "lucide-react";
import { Task } from "@/lib/types";
import BoardTask from "./Task";

const columnLabels: Record<string, string> = {
  todo: "To do",
  inprogress: "In progress",
  done: "Done",
};

const id = (prefix = "t") =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

export default function BoardView() {
  const [columns, setColumns] = useState<Record<string, Task[]>>({
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
      inprogress: [
        {
          id: id(),
          title: "Build header",
          description: "A simple description",
          tags: [
            { name: "Website", color: "pink" },
            { name: "Development", color: "blue" },
            { name: "API", color: "green" },
            { name: "App", color: "purple" },
            { name: "Rust", color: "orange" },
          ],
        },
      ],
      done: [],
    });
  }, []);

  function onDragEnd(result: any) {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

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
          {Object.keys(columnLabels).map((colKey) => (
            <Droppable key={colKey} droppableId={colKey}>
              {(provided) => (
                <Card
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-background"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{columnLabels[colKey]}</span>
                      <Button
                        size="sm"
                        className="ml-auto"
                        variant="outline"
                        onClick={() => {
                          const t: Task = { id: id(), title: "New task" };
                          setColumns((c) => ({
                            ...c,
                            [colKey]: [...c[colKey], t],
                          }));
                        }}
                      >
                        <PlusIcon />
                      </Button>
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
                            <BoardTask
                              setTask={(t) =>
                                setColumns((cols) => {
                                  cols[colKey][index] = t;
                                  return cols;
                                })
                              }
                              provided={provided}
                              task={task}
                            />
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {columns[colKey].length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          No tasks
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
