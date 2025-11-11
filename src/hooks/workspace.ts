import { SidebarEntity } from "@/components/sidebar/Entity";
import { SetState, Task } from "@/lib/types";
import { useEffect, useState } from "react";

export type Entity =
  | {
      name: string;
      kind: "todo";
      tasks: Task[];
      setTasks: SetState<Task[]>;
    }
  | {
      name: string;
      kind: "doc";
      doc: string;
      setDoc: SetState<string>;
    };

export interface Workspace {
  name: string;
  entityLayout: SidebarEntity[];
  entities: Record<string, Entity>;

  route: string;
  setRoute: SetState<string>;
}

export default function useWorkspace(): Workspace {
  const [route, setRoute] = useState("alpha_tasks");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [doc, setDoc] = useState("# Hello World!");

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

      alpha_doc: {
        name: "Alpha docs",
        kind: "doc",
        doc,
        setDoc,
      },
      beta_doc: {
        name: "Beta docs",
        kind: "doc",
        doc,
        setDoc,
      },
    },
    entityLayout: [
      {
        kind: "group",
        name: "Project alpha",
        children: [{ id: "alpha_tasks" }, { id: "alpha_doc" }],
      },
      {
        kind: "group",
        name: "Project beta",
        children: [{ id: "beta_tasks" }, { id: "alpha_doc" }],
      },
    ],

    route,
    setRoute,
  };
}
