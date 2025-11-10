"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { PlusIcon } from "lucide-react";
import { SetState, Task } from "@/lib/types";
import BoardTask from "./Task";

const columnLabels: Record<string, string> = {
  todo: "To do",
  inprogress: "In progress",
  done: "Done",
};

export default function BoardView({
  tasks,
  setTasks,
  createTask,
}: {
  tasks: Task[];
  setTasks: SetState<Task[]>;
  createTask: (status: string) => void;
}) {
  function onDragEnd(result: any) {
    const { draggableId, source, destination } = result;
    if (!destination) return;

    setTasks((tasks) => {
      const taskIndex = tasks.findIndex((task) => task.id === draggableId);
      const task = tasks[taskIndex];
      tasks.splice(taskIndex, 1);

      const destinationGroupStartIndex = tasks.findIndex(
        (t) => t.status === destination.droppableId
      );

      const insertIndex =
        destinationGroupStartIndex === -1
          ? tasks.length
          : destinationGroupStartIndex + destination.index;

      tasks.splice(insertIndex, 0, {
        ...task,
        status: destination.droppableId,
      });

      return tasks;
    });
  }

  return (
    <div className="p-6 w-full h-full flex flex-col gap-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {Object.keys(columnLabels).map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <Card
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-background"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{columnLabels[status]}</span>
                      <Button
                        size="sm"
                        className="ml-auto"
                        variant="outline"
                        onClick={() => createTask(status)}
                      >
                        <PlusIcon />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      {tasks
                        .filter((task) => task.status === status)
                        .map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided) => (
                              <BoardTask
                                setTask={(t) =>
                                  setTasks((cols) =>
                                    cols.map((c) => (c.id === t.id ? t : c))
                                  )
                                }
                                provided={provided}
                                task={task}
                              />
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                      {tasks.filter((task) => task.status === status).length ===
                        0 && (
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
