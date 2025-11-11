import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Entity } from "@/hooks/workspace";

export interface SidebarEntity extends Entity {
  kind: "group" | "todo";
  children?: SidebarEntity[];
}

export default function EntitySwitch({ entity }: { entity: SidebarEntity }) {
  switch (entity.kind) {
    case "group":
      return (
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <SidebarMenuButton asChild>
                <CollapsibleTrigger>
                  {entity.name}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarMenuButton>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {entity.children?.map((entity, i) => (
                    <EntitySwitch entity={entity} key={i} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      );
    case "todo":
      return (
        <SidebarMenuItem>
          <SidebarMenuButton>{entity.name}</SidebarMenuButton>
        </SidebarMenuItem>
      );
  }
}
