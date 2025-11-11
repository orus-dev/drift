import { Entity } from "@/components/sidebar/Entity";
import { SetState } from "@/lib/types";
import { useState } from "react";

export type Workspace = {
  name: string;
  entities: Entity[];

  route: string;
  setRoute: SetState<string>;
};

export default function useWorkspace(): Workspace {
  const [route, setRoute] = useState("");

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

    route,
    setRoute,
  };
}
