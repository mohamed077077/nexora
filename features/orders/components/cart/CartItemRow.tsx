"use client";

/* eslint-disable @next/next/no-img-element */
import AppDeleteBtn from "@/shared/components/AppDeleteBtn";

import { useCartStore } from "../../CartStore";
import type { CartItem } from "../../types";
import QuantityStepper from "./Quantitystepper";
import DashboardImage from "@/shared/components/dashboard/DashboardImage";

type CartItemRowProps = {
  item: CartItem;
};

export default function CartItemRow({ item }: CartItemRowProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const { product, variant, quantity, productId } = item;
  const image = variant.image?.trim();
  const details = [variant.color, variant.size].filter(Boolean).join(" · ");

  return (
    <li className="flex gap-4 border-b border-border py-4 first:pt-0 last:border-b-0 last:pb-0 sm:gap-6">
      <div className="shrink-0">
        {image ? (
          <DashboardImage src={image} alt={product.title} />
        ) : (
          <div className="flex size-20 items-center justify-center rounded-xl bg-muted/50 text-xs text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
              {product.title}
            </h3>
            {details && (
              <p className="mt-1 text-xs text-muted-foreground">{details}</p>
            )}
          </div>

          <p className="shrink-0 text-sm font-bold text-foreground sm:text-base">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <QuantityStepper
            value={quantity}
            max={variant.stock}
            title={product.title}
            onChange={(next) => updateQuantity(productId, variant, next)}
          />
          <AppDeleteBtn
            title={product.title}
            size="default"
            onClick={() => removeItem(productId, variant)}
          />
        </div>
      </div>
    </li>
  );
}