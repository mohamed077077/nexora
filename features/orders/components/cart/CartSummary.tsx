"use client";

import { Button } from "@/shared/ui/button";
import {
  useCartStore,
  selectTotalItems,
  selectTotalPrice,
} from "../../CartStore";


const card = "rounded-2xl border border-primary/15 bg-card p-4 sm:p-6";

export default function CartSummary() {
  const itemCount = useCartStore(selectTotalItems);

  const subtotal = useCartStore(selectTotalPrice);

  const items = useCartStore((state) => state.items);


  return (
    <section
      aria-labelledby="order-summary-title"
      className={`${card} space-y-4 lg:sticky lg:top-6`}
    >
      <h2
        id="order-summary-title"
        className="text-lg font-semibold"
      >
        Order Summary
      </h2>

      <dl className="space-y-3 text-sm">
        {/* Total quantity */}
        <div className="flex items-center justify-between text-muted-foreground">
          <dt>Items</dt>
          <dd className="font-medium text-foreground">
            {itemCount}
          </dd>
        </div>

        {/* Subtotal */}
        <div className="flex items-center justify-between text-muted-foreground">
          <dt>Subtotal</dt>
          <dd className="font-medium text-foreground">
            ${subtotal.toFixed(2)}
          </dd>
        </div>
      </dl>

      <Button
        type="button"
        disabled={items.length === 0}
        className="h-11 w-full cursor-pointer rounded-lg text-sm font-semibold"
      >
        Place Order
      </Button>
    </section>
  );
}