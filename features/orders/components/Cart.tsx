"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "cn";
import { useCartStore } from "@/features/orders/CartStore";

type CartButtonProps = {
  ariaLabel?: string;
  className?: string;
  onClick?: () => void;
  showBadge?: boolean;
};

export default function CartButton({
  ariaLabel,
  className,
  onClick,
  showBadge = false,
}: CartButtonProps) {
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <Button
      variant="ghost"
      aria-label={ariaLabel ?? "Open shopping cart"}
      onClick={onClick}
      style={{
        width: 24,
        height: 24,
        padding: 0,
      }}
      className={cn(
        "relative cursor-pointer text-primary duration-300 hover:scale-105 hover:text-primary/70  ",
        className,
      )}
    >
      <ShoppingCart
        strokeWidth={2.2}
        style={{ width: 24, height: 24 }}
      />

      {showBadge && totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Button>
  );
}