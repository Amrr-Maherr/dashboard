"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// import avatarImg from "@/public/Assets/Images/avatar.png";

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar className="flex flex-col">
        {/* Header */}
        <SidebarHeader>
          <h1 className="text-2xl font-bold text-[#6768fa]">StoreHub</h1>
        </SidebarHeader>

        {/* Main Content */}
        <SidebarContent>
          <SidebarGroup>
            <Link
              href="/dashboard/products"
              className="block px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              Products
            </Link>
            <Link
              href="/dashboard/orders"
              className="block px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              Orders
            </Link>
            <Link
              href="/dashboard/customers"
              className="block px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              Customers
            </Link>
            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              Settings
            </Link>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="mt-auto p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">John Doe</span>
              <span className="text-gray-500 text-sm">john@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
