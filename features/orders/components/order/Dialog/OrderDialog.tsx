"use client";

import { MapPin, User, XCircle } from "lucide-react";
import Image from "next/image";

import AppDialog from "@/shared/components/AppDialog";
import { Button } from "@/shared/ui/button";
import { useOrderDialogStore } from "@/features/orders/store/OrderDialogStore";
import { formatOrderId } from "@/lib/utils";
import type { OrderItem } from "@/features/orders/types";
import { ExternalLink } from "lucide-react";
import OrderStatusBadge from "../OrderStatusBadge";
import { CheckCircle2 } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../../../http/UpdateOrder";
import type { OrderStatus } from "../../../types";
import { toast } from "sonner";
import { useState } from "react";


const CANCELLABLE_STATUSES = ["pending", "confirmed"];
const CONFIRMABLE_STATUSES = ["pending", "confirmed"];

const MAP_IMAGE_SRC: string =
  "https://res.cloudinary.com/dsnbjtkts/image/upload/v1792223035/289c7dc3-9d5c-400d-b595-086a0bdbb6a0_p2jlww.png";

type ActionableStatus = "pending" | "confirmed";

const STATUS_ACTIONS: Record<
  ActionableStatus,
  { text: string; className: string; icon: ReactNode }
> = {
  pending: {
    text: "Confirm Order",
    className:
      "bg-confirmed/15 text-confirmed hover:bg-confirmed/5",
    icon: <BadgeCheck className="size-4" aria-hidden="true" />,
  },
  confirmed: {
    text: "Deliver Order",
    className:
      "bg-success/15 text-success hover:bg-success/5",
    icon: <CheckCircle2 className="size-4" aria-hidden="true" />,
  },
};

function getProductTitle(item: OrderItem): string {
  if (typeof item.productId === "object" && item.productId && "title" in item.productId) {
    return item.productId.title;
  }
  return "Product";
}

function getLinePrice(item: OrderItem): number | null {
  if (typeof item.productId === "object" && item.productId && "price" in item.productId) {
    return item.productId.price * (item.quantity || 1);
  }
  return null;
}

function formatCreatedAt(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${date} at ${time}`;
}


export default function OrderDialog() {

  const isOpen = useOrderDialogStore((state) => state.isOpen);
  const order = useOrderDialogStore((state) => state.order);
  const closeDialog = useOrderDialogStore((state) => state.closeDialog);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      updateOrderStatus(id, status),
    onSuccess: () => {
      toast.success("Order status updated successfully")
      queryClient.invalidateQueries();
      closeDialog();
      setConfirmOpen(false);
    },
    onError: () => {
      toast.error("Failed to update order status")
      setConfirmOpen(false);
    }
  })
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!order) return null;

  const canCancel = CANCELLABLE_STATUSES.includes(order.status);
  const canConfirm = CONFIRMABLE_STATUSES.includes(order.status);

  const action = STATUS_ACTIONS[order.status as ActionableStatus];



  return (
    <AppDialog
      open={isOpen}
      onOpenChange={(open) => !open && closeDialog()}
      title="Order Details"
      confirmOpen={confirmOpen}
    >
      {/* Scrollable body (orders can have many items) */}
      <div className="max-h-[60dvh] overflow-y-auto">
        {/* Order summary */}
        <div className="flex items-start justify-between gap-3 border-b border-border px-3.5 py-3">
          <div className="min-w-0">
            <p className="text-base font-medium">{formatOrderId(order._id)}</p>
            <p className="text-xs font-light text-muted-foreground">
              {formatCreatedAt(order.createdAt)}
            </p>
          </div>

          <OrderStatusBadge status={order.status} />
        </div>

        <section
          aria-label="Customer information"
          className="space-y-3 border-b border-border px-3.5 py-3"
        >
          <h3 className="text-base font-medium">Customer Information</h3>

          <div className="flex gap-3">
            {/* Column 1: customer info */}
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex items-start gap-2">
                <User className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="truncate text-sm">{order.customerName}</p>
                  <p className="text-xs font-light text-muted-foreground">
                    {order.customerPhone}
                  </p>
                </div>
              </div>

              {order.customerAddress && (
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <p className="text-sm">{order.customerAddress}</p>
                </div>
              )}
            </div>

            {/* Column 2: map preview */}
            {order.customerLocationUrl && (
              <div className="relative min-h-24 w-7/5 max-w-50 shrink-0 self-stretch overflow-hidden rounded-lg border border-border">
                <a
                  href={order.customerLocationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open selected location in Google Maps"
                  className="group block size-full"
                >
                  {MAP_IMAGE_SRC ? (
                    <img
                      src={MAP_IMAGE_SRC}
                      alt="Selected location map preview"
                      className="absolute inset-0 size-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex size-full flex-col items-center justify-center gap-1 bg-muted/50 p-2 text-center transition-colors hover:bg-muted">
                      <MapPin className="size-6 text-primary" aria-hidden="true" />
                      <span className="text-xs font-medium text-foreground">
                        Open in Maps
                      </span>
                    </div>
                  )}
                  <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-background/95 px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    <ExternalLink
                      className="size-3"
                      aria-hidden="true"
                    />
                    Open map
                  </span>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Items */}
        <ul aria-label="Order items" className="divide-y divide-border px-3.5">
          {order.items.map((item, idx) => {
            const title = getProductTitle(item);
            const image = item.variant?.image?.trim();
            const linePrice = getLinePrice(item);
            const details = [
              item.variant?.colorName || item.variant?.color
                ? `Color: ${item.variant?.colorName || item.variant?.color}`
                : null,
              item.variant?.size ? `Size: ${item.variant.size}` : null,
            ]
              .filter(Boolean)
              .join(" · ");

            return (
              <li key={item._id || idx} className="flex gap-3 py-3">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {image ? (
                    <Image src={image} alt={title} fill sizes="80px" className="object-contain" />
                  ) : (
                    <div className="flex size-full items-center justify-center text-[10px] text-muted-foreground">
                      No Img
                    </div>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{title}</p>
                    {details && (
                      <p className="mt-0.5 text-xs font-light text-muted-foreground">{details}</p>
                    )}
                    <p className="text-xs font-light text-muted-foreground">Qty: {item.quantity}</p>
                  </div>

                  {linePrice !== null && (
                    <p className="shrink-0 text-sm font-medium">${linePrice.toFixed(2)}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Total */}
      <div className="mx-3.5 flex items-center justify-between border-y border-border py-3">
        <span className="text-xl font-medium">Total</span>
        <span className="text-2xl font-semibold">${order.totalPrice.toFixed(2)}</span>
      </div>

      {(canCancel || canConfirm) && (
        <div className="flex justify-between p-3.5">
          {canCancel && (
            <AlertDialog onOpenChange={setConfirmOpen}>
              <AlertDialogTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-11 cursor-pointer gap-2 rounded-lg bg-destructive/15 text-destructive hover:bg-destructive/5 hover:text-destructive dark:bg-destructive/15 dark:hover:bg-destructive/5"
                  />
                }
              >
                <XCircle className="size-4" aria-hidden="true" />
                Cancel Order
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The order will be marked as cancelled.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Go back</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isPending}
                    onClick={() => mutate({ id: order._id, status: "cancelled" })}
                    className="bg-destructive/15 text-destructive hover:bg-destructive/25"
                  >
                    Yes, cancel order
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {canConfirm && (
            <AlertDialog onOpenChange={setConfirmOpen}>
              <AlertDialogTrigger
                render={
                  <Button
                    type="button"
                    className={`h-11 cursor-pointer gap-2 rounded-lg border-0 font-medium ${action.className}`}
                  />
                }
              >
                {action.icon}
                {action.text}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{action.text}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Please confirm you want to proceed with this action.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Go back</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {mutate({ id: order._id, status: order.status=="confirmed"?"success":"confirmed" })}}
                    disabled={isPending}
                    className={action.className}
                  >
                    {action.icon}
                    {action.text}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      )}
    </AppDialog>
  );
}