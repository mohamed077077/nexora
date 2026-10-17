"use client";

import { useCartStore, cartItemKey } from "../../CartStore";
import { CartEmptyState } from "./CartEmptyState";
import CartItemRow from "./CartItemRow";

export function CartContent() {
  const items = useCartStore((state) => state.items);
  return (
    <section
      aria-label="Cart items"
      className="rounded-2xl border  bg-card p-4 sm:p-6"
    >
      <ul>
        {items.map((item) => (
          <CartItemRow
            key={cartItemKey(item.productId, item.variant)}
            item={item}
          />
        ))}
      </ul>
    </section>
  );
}

