import { SidebarEntity } from "@/components/sidebar/Entity";
import { SetState, Task } from "@/lib/types";
import { useEffect, useState } from "react";

export interface Entity {
  id: string;
  name: string;
}

export type Workspace = {
  name: string;
  entities: SidebarEntity[];
  entityData: Record<string, any>;

  route: string;
  setRoute: SetState<string>;
};

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
    entities: [
      {
        id: "alpha",
        name: "Project alpha",
        kind: "group",
        children: [{ id: "alpha_tasks", name: "Tasks", kind: "todo" }],
      },
    ],

    entityData: {
      alpha_tasks: {
        tasks,
        setTasks,
      },
    },

    route,
    setRoute,
  };
}
