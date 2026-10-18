import Image from "next/image";

import OrderStatusBadge from "../OrderStatusBadge";
import type { Order, OrderItem } from "@/features/orders/types";
import { formatOrderId } from "@/lib/utils";
import { useOrderDialogStore } from "../../../store/OrderDialogStore";

type OrderMobileListProps = {
  orders: Order[];
};

function getProductTitle(item: OrderItem): string {
  if (
    typeof item.productId === "object" &&
    item.productId &&
    "title" in item.productId
  ) {
    return item.productId.title;
  }
  return "Product";
}

export default function OrderMobileList({ orders }: OrderMobileListProps) {
    const openDialog = useOrderDialogStore((state) => state.openDialog);
  return (
    <div className="flex flex-col">
      {orders.map((order) => {
        const totalQuantity = order.items.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );

        return (
          <div
            key={order._id}
            onClick={() => openDialog(order)}
            className="flex cursor-pointer flex-col gap-3.5 border-b border-border p-4 transition-colors last:border-b-0 active:bg-muted/40"          >
            {/* Header: Customer info & Status */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-primary">{formatOrderId(order._id)}</p>
                <h3 className="truncate text-base font-semibold text-foreground">
                  {order.customerName}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {order.customerPhone}
                </p>
                {order.createdAt && (
                  <p className="mt-0.5 text-[11px] text-muted-foreground/80">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>

              <div className="shrink-0">
                <OrderStatusBadge status={order.status} />
              </div>
            </div>

            {/* Items Card */}
            <div className="flex flex-col gap-2 rounded-xl  p-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Items</span>
                <span>
                  {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                {order.items.map((item, idx) => {
                  const title = getProductTitle(item);
                  const image = item.variant?.image?.trim();
                  const details = [
                    item.variant?.colorName || item.variant?.color,
                    item.variant?.size ? `Size: ${item.variant.size}` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ");

                  return (
                    <div
                      key={item._id || idx}
                      className="flex items-center gap-3"
                    >
                      <div className="relative size-12 shrink-0 overflow-hidden ">
                        {image ? (
                          <Image
                            src={image}
                            alt={title}
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center bg-muted text-[10px] text-muted-foreground">
                            No Img
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-medium text-foreground">
                            {title}
                          </span>
                          <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                            x{item.quantity}
                          </span>
                        </div>

                        {details && (
                          <p className="truncate text-xs text-muted-foreground">
                            {details}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer: Customer Address & Total Price */}
            <div className="flex items-center justify-between gap-3 pt-0.5">
              <div className="min-w-0 flex-1">
                {order.customerAddress && (
                  <p
                    className="truncate text-xs text-muted-foreground"
                    title={order.customerAddress}
                  >
                    📍 {order.customerAddress}
                  </p>
                )}
              </div>

              <div className="shrink-0 text-right">
                <span className="mr-1 text-xs text-muted-foreground">Total:</span>
                <span className="text-base font-bold text-foreground">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
