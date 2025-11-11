"use client";

import Router from "@/components/Router";
import AppSidebar, { SidebarTrigger } from "@/components/sidebar/AppSidebar";
import useWorkspace from "@/hooks/workspace";
import { ChevronRight } from "lucide-react";

export default function Workspace() {
  const workspace = useWorkspace();

  return (
    <AppSidebar workspace={workspace}>
      <SidebarTrigger className="w-full px-4">
        <div className="px-4">
          <header className="w-full border-b-2 pb-3 pt-2 hover:bg-accent/20 flex items-center text-foreground/90">
            {workspace.name}
            <ChevronRight className="h-5" />
            {workspace.entities[workspace.route].name}
          </header>
        </div>
      </SidebarTrigger>

      <Router workspace={workspace} />
    </AppSidebar>
  );
}
