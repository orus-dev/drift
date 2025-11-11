"use client";

import Router from "@/components/Router";
import AppSidebar, { SidebarTrigger } from "@/components/sidebar/AppSidebar";
import TaskView from "@/components/view/TaskView";
import useWorkspace from "@/hooks/workspace";
import { Task } from "@/lib/types";
import { useEffect, useState } from "react";

const id = (prefix = "t") =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

export default function Workspace() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const workspace = useWorkspace();

  const createTask = (status: string) => {
    const task: Task = {
      id: id(),
      title: "New task",
      status: status,
    };
    setTasks((c) => [...c, task]);
  };

  return (
    <AppSidebar workspace={workspace}>
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
