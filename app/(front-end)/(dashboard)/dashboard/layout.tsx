"use client";

import React from "react";
import Logout from "@/features/auth/components/Logout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <Logout />
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
