
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, FileText, Home, MapIcon, User, Shield, PlusCircle, Dog } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const menuItems = [
  { href: "/mapa", label: "Mapa Interactivo", icon: MapIcon },
  { href: "/incidencias/crear", label: "Crear Incidencia", icon: PlusCircle },
  { href: "/reportes", label: "Mis Reportes", icon: FileText },
  { href: "/animales", label: "Animales", icon: Dog },
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/admin", label: "Panel Admin", icon: Shield },
];

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="h-20 flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                    <Home className="w-6 h-6"/>
                </div>
                <h1 className="text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">ArecoReporta</h1>
            </div>
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
        </SidebarHeader>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <div>
                    <item.icon />
                    <span>{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 flex-col gap-4">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" />
                <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-semibold">Usuario</p>
                <p className="text-xs text-muted-foreground">ciudadano@email.com</p>
            </div>
        </div>
        <Link href="/login">
            <Button asChild variant="outline" className="w-full justify-center group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:aspect-square">
                <div>
                    <span className="group-data-[collapsible=icon]:hidden">Cerrar Sesión</span>
                    <User className="hidden group-data-[collapsible=icon]:block" />
                </div>
            </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
