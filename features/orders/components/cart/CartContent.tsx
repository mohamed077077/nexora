"use client";

import { useCartStore, cartItemKey } from "../../CartStore";
import {
  Card,
  CardContent,
} from "@/shared/ui/card";
import CartItemRow from "./CartItemRow";

export function CartContent() {
  const items = useCartStore((state) => state.items);
  return (
<Card role="region" aria-label="Cart items" className="shadow-none ">
  <CardContent className="p-4 sm:p-6">
    <ul>
      {items.map((item) => (
        <CartItemRow
          key={cartItemKey(item.productId, item.variant)}
          item={item}
        />
      ))}
    </ul>
  </CardContent>
</Card>
  );
}

