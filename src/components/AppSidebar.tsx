import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  useSidebar,
} from "./ui/sidebar";

export default function AppSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent></SidebarContent>
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
