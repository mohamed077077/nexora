"use client";

import { Header } from "@/features/orders/components/cart/Header";
import Cart from "@/features/orders/components/cart/Cart";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-6xl space-y-5 px-4 pb-10 pt-2 sm:px-6">
        <Cart />
      </main>
    </div>
  );
}