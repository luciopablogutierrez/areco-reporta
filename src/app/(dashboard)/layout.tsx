import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SidebarNav } from "@/components/layout/sidebar-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <main className="min-h-screen bg-background text-foreground">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
