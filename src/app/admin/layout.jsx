import AdminNavbar from "@/components/Admin/AdminNavbar";
import { AdminSidebar } from "@/components/Admin/AdminSidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function AdminLayout({ children }) {
  return (
    <main>
      <SidebarProvider className="min-h-auto">
        <AdminSidebar />

        <SidebarInset>
          <AdminNavbar />
          <main className="p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
