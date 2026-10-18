import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import OrderStatusBadge from "../OrderStatusBadge";
import type { Order, OrderItem } from "@/features/orders/types";
import { formatOrderId } from "@/lib/utils";
import { useOrderDialogStore } from "../../../store/OrderDialogStore";
type OrderDesktopTableProps = {
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

export default function OrderDesktopTable({
  orders,
}: OrderDesktopTableProps) {
    const openDialog = useOrderDialogStore((state) => state.openDialog);
  return (
    <Table>
      <TableHeader className="bg-card">
        <TableRow className="h-16 border-0 border-b border-border hover:bg-transparent">
          <TableHead className="table-head-cell">Order ID</TableHead>
          <TableHead className="table-head-cell">Customer</TableHead>
          <TableHead className="table-head-cell">Items</TableHead>
          <TableHead className="table-head-cell">Total Price</TableHead>
          <TableHead className="table-head-cell">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order) => {
          const totalQuantity = order.items.reduce(
            (sum, item) => sum + (item.quantity || 1),
            0
          );

          return (
            <TableRow
              key={order._id}
              onClick={() => openDialog(order)}
              className="border-0 border-b border-border last:border-b-0 hover:bg-transparent cursor-pointer"
            >
              <TableCell className="px-5 py-4 align-top">
                  <button
                    type="button"
                    onClick={() => {
                     openDialog(order);
                    }}
                    className="table-text cursor-pointer font-medium text-primary hover:underline"
                  >
                    {formatOrderId(order._id)}
                  </button>
              </TableCell>
              {/* Customer */}
              <TableCell className="px-5 py-4 align-top">
                <div className="flex flex-col gap-1">
                  <span className="table-text font-semibold">
                    {order.customerName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {order.customerPhone}
                  </span>
                  {order.customerAddress && (
                    <span
                      className="max-w-[200px] truncate text-xs text-muted-foreground"
                      title={order.customerAddress}
                    >
                      {order.customerAddress}
                    </span>
                  )}
                  {order.createdAt && (
                    <span className="text-[11px] text-muted-foreground/80">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </TableCell>

              {/* Items */}
              <TableCell className="px-5 py-4 align-top">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 max-w-sm">
                    {order.items.slice(0, 2).map((item, idx) => {
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
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-lg ">
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
                            <div className="flex items-center gap-2">
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

                    {order.items.length > 2 && (
                      <span className="text-xs font-medium text-muted-foreground">
                        +{order.items.length - 2} more item
                        {order.items.length - 2 > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
              </TableCell>

              {/* Total Price */}
              <TableCell className="px-5 py-4 align-top">
                <span className="table-text font-bold text-base text-foreground">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </TableCell>

              {/* Status */}
              <TableCell className="px-5 py-4 align-top">
                <OrderStatusBadge status={order.status} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
