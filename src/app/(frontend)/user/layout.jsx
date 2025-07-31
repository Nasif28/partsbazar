import Breadcrumbs from "@/components/Global/Breadcrumbs";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/User/UserSidebar";

export default function UserLayout({ children }) {
  return (
    <main className="myContainer">
      <section className="container mx-auto">
        <SidebarProvider className="min-h-auto">
          <UserSidebar />

          <SidebarInset>
            <header className="flex py-2 border-b bg-sidebar">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger />

                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-6"
                />

                <Breadcrumbs textColor="text-muted-foreground" />
              </div>
            </header>

            <main className="p-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </section>
    </main>
  );
}
