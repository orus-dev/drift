"use client";

import BoardView from "@/components/view/board/BoardView";
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
        title: "Build header",
        description: "A simple description",
        tags: [
          { name: "Website", color: "pink" },
          { name: "Development", color: "blue" },
          { name: "API", color: "green" },
          { name: "App", color: "purple" },
          { name: "Rust", color: "orange" },
        ],
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
    <BoardView tasks={tasks} setTasks={setTasks} createTask={createTask} />
  );
}
