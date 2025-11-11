import { SidebarEntity } from "@/components/sidebar/Entity";
import { SetState, Task } from "@/lib/types";
import { useEffect, useState } from "react";

export type Entity = {
  name: string;
  kind: "todo";
  setTasks: SetState<Task[]>;
  tasks: Task[];
};

export interface Workspace {
  name: string;
  entityLayout: SidebarEntity[];
  entities: Record<string, Entity>;

  route: string;
  setRoute: SetState<string>;
}

function useTasks() {
  return useState<Task[]>([]);
}

export default function useWorkspace(): Workspace {
  const [route, setRoute] = useState("alpha_tasks");
  const [tasks, setTasks] = useTasks();

  useEffect(() => {
    setTasks([
      { id: "1", title: "Buy groceries", status: "todo" },
      { id: "2", title: "Plan sprint", status: "todo" },
      {
        id: "3",
        title: "Build App",
        description: "A simple description",
        tags: ["website", "api", "app"],
        status: "inprogress",
      },
    ]);
  }, []);

  return {
    name: "Personal Workspace",
    entities: {
      alpha_tasks: {
        name: "Alpha tasks",
        kind: "todo",
        tasks,
        setTasks,
      },
      beta_tasks: {
        name: "Beta tasks",
        kind: "todo",
        tasks,
        setTasks,
      },
    },
    entityLayout: [
      {
        kind: "group",
        name: "Project alpha",
        children: [{ id: "alpha_tasks" }],
      },
      {
        kind: "group",
        name: "Project beta",
        children: [{ id: "beta_tasks" }],
      },
    ],

    route,
    setRoute,
  };
}
