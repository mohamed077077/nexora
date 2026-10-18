"use client";

import { Button } from "@/shared/ui/button";
import {
  useCartStore,
  selectTotalItems,
  selectTotalPrice,
} from "../../store/CartStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useIsMutating } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function CartSummary() {
  const itemCount = useCartStore(selectTotalItems);

  const subtotal = useCartStore(selectTotalPrice);

  const items = useCartStore((state) => state.items);

  const isPlacingOrder = useIsMutating({ mutationKey: ["addOrder"] }) > 0;

  return (
<Card className="lg:sticky lg:top-6 shadow-none">
  <CardHeader>
    <CardTitle
      id="order-summary-title"
      className="text-lg font-semibold"
    >
      Order Summary
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">
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
      type="submit"
      form="checkout-form"
      disabled={items.length === 0 || isPlacingOrder}
      className="h-11 w-full cursor-pointer rounded-lg text-sm font-semibold"
    >
      {isPlacingOrder ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Placing Order...
        </>
      ) : (
        "Place Order"
      )}
    </Button>
  </CardContent>
</Card>
  );
}