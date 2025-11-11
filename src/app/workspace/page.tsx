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
  const [route, setRoute] = useState("");
  const workspace = useWorkspace();

  const createTask = (status: string) => {
    const task: Task = {
      id: id(),
      title: "New task",
      status: status,
    };
    workspace.entityData[workspace.route].setTasks((c: Task[]) => [...c, task]);
  };

  return (
    <AppSidebar workspace={workspace}>
      <Router route={route} setRoute={setRoute}>
        {(route) => (
          <>
            <SidebarTrigger className="w-full px-4">
              <div className="px-4">
                <header className="w-full border-b-2 pb-3 pt-2 hover:bg-accent/20">
                  Workspace
                </header>
              </div>
            </SidebarTrigger>
            <TaskView
              tasks={workspace.entityData[workspace.route].setTasks}
              setTasks={workspace.entityData[workspace.route].tasks}
              createTask={createTask}
              tags={{
                website: { color: "yellow", name: "Website" },
                api: { color: "purple", name: "API" },
                app: { color: "blue", name: "App" },
              }}
            />
          </>
        )}
      </Router>
    </AppSidebar>
  );
}
