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
import { Workspace } from "@/hooks/workspace";

export type SidebarEntity =
  | {
      kind: "group";
      name: string;
      children: SidebarEntity[];
    }
  | {
      kind?: "item";
      id: string;
    };

export default function EntitySwitch({
  entity,
  workspace,
}: {
  entity: SidebarEntity;
  workspace: Workspace;
}) {
  if (entity.kind === "group") {
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
                  <EntitySwitch entity={entity} workspace={workspace} key={i} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    );
  } else {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => {
            workspace.setRoute(entity.id);
          }}
        >
          {workspace.entities[entity.id].name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }
}
