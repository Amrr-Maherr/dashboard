// app/dashboard/layout.tsx
import { AppSidebar } from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
