"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/shared/components/Logo";
import Logout from "@/features/auth/components/Logout";
import {
  LayoutGrid,
  Package,
  Palette,
  ShoppingCart,
  X,
  Menu
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
    label: "Categories",
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav
        aria-label="Dashboard navigation"
        className={`
          fixed inset-y-0 left-0 z-50 flex w-52 lg:w-64 flex-col bg-card
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
        {/* Logo */}
        <div className="relative flex h-12 lg:h-16 w-[80%] justify-center items-center pl-3 lg:pl-4 mb-2">
          <Logo />
        </div>

        {/* Navigation */}
        <div className="flex flex-col">
          {navigationItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex h-16 w-full items-center gap-2.5 pl-4 text-xl font-semibold text-black transition-colors hover:bg-primary/10"
            >
              <Icon
                className="size-5.5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <div className="mt-auto pl-3 lg:pl-4 transition-colors hover:bg-destructive/10 ">
          <Logout />
        </div>
      </nav>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-40 lg:hidden icon-hover"
      >
        <Menu size={24} />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden "
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}