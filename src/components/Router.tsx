"use client";

import { Workspace } from "@/hooks/workspace";
import { Task } from "@/lib/types";
import TaskView from "./view/TaskView";

const id = (prefix = "t") =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

export default function Router({ workspace }: { workspace: Workspace }) {
  const entity = workspace.entities[workspace.route];
  switch (entity.kind) {
    case "todo":
      const createTask = (status: string) => {
        const task: Task = {
          id: id(),
          title: "New task",
          status: status,
        };
        entity.setTasks((c: Task[]) => [...c, task]);
      };

      return (
        <TaskView
          tasks={entity.tasks}
          setTasks={entity.setTasks}
          createTask={createTask}
          tags={{
            website: { color: "yellow", name: "Website" },
            api: { color: "purple", name: "API" },
            app: { color: "blue", name: "App" },
          }}
        />
      );
    case "doc":
      return entity.doc;
  }
}
