
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function CartEmptyState() {
  return (
    <div className="rounded-xl border py-12 text-center bg-card">
      <ShoppingCart className="mx-auto size-10 text-primary" />

      <p className="mt-3 font-medium">
        Your cart is empty
      </p>

      <p className="mt-1 text-sm text-muted-foreground">
        Add a product to place an order.
      </p>

      <Button  className="mt-5 rounded-lg">
        <Link href="/">Browse products</Link>
      </Button>
    </div>
  );
}
