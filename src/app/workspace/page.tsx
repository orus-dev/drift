"use client";

import AppSidebar, { SidebarTrigger } from "@/components/sidebar/AppSidebar";
import BoardView from "@/components/view/board/BoardView";
import TaskView from "@/components/view/TaskView";
import { Task } from "@/lib/types";
import { useEffect, useState } from "react";

const id = (prefix = "t") =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

export default function Workspace() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks([
      { id: id(), title: "Buy groceries", status: "todo" },
      { id: id(), title: "Plan sprint", status: "todo" },
      {
        id: id(),
        title: "Build App",
        description: "A simple description",
        tags: ["website", "api", "app"],
        status: "inprogress",
      },
    ]);
  }, []);

  const createTask = (status: string) => {
    const task: Task = {
      id: id(),
      title: "New task",
      status: status,
    };
    setTasks((c) => [...c, task]);
  };

  return (
    <AppSidebar>
      <SidebarTrigger className="w-full px-4">
        <div className="px-4">
          <header className="w-full border-b-2 pb-3 pt-2 hover:bg-accent/20">
            Workspace
          </header>
        </div>
      </SidebarTrigger>
      <TaskView
        tasks={tasks}
        setTasks={setTasks}
        createTask={createTask}
        tags={{
          website: { color: "yellow", name: "Website" },
          api: { color: "purple", name: "API" },
          app: { color: "blue", name: "App" },
        }}
      />
    </AppSidebar>
  );
}
