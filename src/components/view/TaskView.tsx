"use client";

import { SetState, Task } from "@/lib/types";
import { Color } from "@/lib/ui/color";
import BoardView from "./board/BoardView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function TaskView({
  tags,
  tasks,
  setTasks,
  createTask,
}: {
  tags: Record<string, { color: Color; name: string }>;
  tasks: Task[];
  setTasks: SetState<Task[]>;
  createTask: (status: string) => void;
}) {
  return (
    <div className="px-6 pt-3">
      <Tabs defaultValue="board">
        <TabsList>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>
        <TabsContent value="board">
          <BoardView
            tasks={tasks}
            setTasks={setTasks}
            createTask={createTask}
            tags={tags}
          />
        </TabsContent>
        <TabsContent value="list">
          <BoardView
            tasks={tasks}
            setTasks={setTasks}
            createTask={createTask}
            tags={tags}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
