import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import EntitySwitch, { Entity } from "./Entity";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface Workspace {
  name: string;
  entities: Entity[];
}

const workspace: Workspace = {
  name: "Personal Workspace",
  entities: [
    {
      name: "Project alpha",
      kind: "group",
      children: [{ name: "Tasks", kind: "todo" }],
    },
  ],
};

export default function AppSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex w-full items-center justify-between px-2 py-1 text-sm">
                    {workspace.name}
                    <ChevronDown className="ml-auto" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-(--radix-popper-anchor-width)"
                >
                  <DropdownMenuItem>Acme Inc</DropdownMenuItem>
                  <DropdownMenuItem>Acme Corp.</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {workspace.entities.map((entity, i) => (
              <EntitySwitch entity={entity} key={i} />
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <main className="w-svw">{children}</main>
    </SidebarProvider>
  );
}

export function SidebarTrigger({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { toggleSidebar } = useSidebar();

  return (
    <div
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      onClick={(event) => {
        toggleSidebar();
      }}
      {...props}
    />
  );
}
