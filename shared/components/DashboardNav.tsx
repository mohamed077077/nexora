"use client";

import Link from "next/link";

import Logo from "@/shared/components/Logo";
import Logout from "@/features/auth/components/Logout";
import {
  LayoutGrid,
  Package,
  Palette,
  ShoppingCart,
} from "lucide-react";

export const navigationItems = [
  {
    label: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    label: "Colors",
    href: "/dashboard/colors",
    icon: Palette,
  },
  {
    label: "Category",
    href: "/dashboard/categories",
    icon: LayoutGrid,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
];
export default function DashboardNav() {
  return (
    <nav
      aria-label="Dashboard navigation"
      className="flex min-h-screen w-64 flex-col bg-card"
    >
      {/* Logo */}
      <div className="relative flex h-16 w-[80%] justify-center items-center pl-4 mb-2.5">
        <Logo />
      </div>

      {/* Navigation */}
      <div className="flex flex-col">
        {navigationItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex h-16 w-full items-center gap-2.5 pl-4 text-xl font-semibold  text-black transition-colors hover:bg-primary/10"
          >
            <Icon
              size={22}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-auto pl-4 transition-colors hover:bg-destructive/10 ">
        <Logout />
      </div>
    </nav>
  );
}