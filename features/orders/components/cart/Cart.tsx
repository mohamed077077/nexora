"use client";

import { useCartStore } from "../../CartStore";
import { CartContent } from "./CartContent";
import { CartEmptyState } from "./CartEmptyState";
import { CartForm } from "./CartForm";
import CartSummary from "./CartSummary";

export default function Cart() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-5">
        <CartContent />
        <CartForm />
      </div>
      <CartSummary />
    </div>
  );
}

export { Cart };
