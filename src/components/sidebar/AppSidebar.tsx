import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import EntitySwitch, { Entity } from "./Entity";

const workspaceEntities: Entity[] = [
  {
    name: "Project alpha",
    kind: "group",
    children: [{ name: "Tasks", kind: "todo" }],
  },
];

export default function AppSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarMenu>
            {workspaceEntities.map((entity, i) => (
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
