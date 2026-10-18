"use client";

import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  ShoppingCart,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import { useOrders } from "@/features/orders/hooks/useOrders";
import {
  useOrderSearchStore,
  type OrderStatusFilter,
} from "@/features/orders/store/OrderSearchStore";

const STATUS_OPTIONS: {
  label: string;
  value: OrderStatusFilter;
  icon: LucideIcon;
  chip: string;
  active: string;
}[] = [
  {
    label: "Total Orders",
    value: "all",
    icon: ShoppingCart,
    chip: "bg-amber-700/15 text-amber-800",
    active: "border-amber-700 bg-amber-700/5 ring-1 ring-amber-700/20",
  },
  {
    label: "Pending",
    value: "pending",
    icon: Clock,
    chip: "bg-primary/15 text-primary",
    active: "border-primary bg-primary/5 ring-1 ring-primary/20",
  },
  {
    label: "Confirmed",
    value: "confirmed",
    icon: BadgeCheck,
    chip: "bg-comfirmed/15 text-comfirmed",
    active: "border-comfirmed bg-comfirmed/5 ring-1 ring-comfirmed/20",
  },
  {
    label: "Success",
    value: "success",
    icon: CheckCircle2,
    chip: "bg-success/15 text-success",
    active: "border-success bg-success/5 ring-1 ring-success/20",
  },
  {
    label: "Canceled",
    value: "cancelled",
    icon: XCircle,
    chip: "bg-destructive/15 text-destructive",
    active: "border-destructive bg-destructive/5 ring-1 ring-destructive/20",
  },
];

export default function StatusFilter() {
  const status = useOrderSearchStore((state) => state.status);
  const setStatus = useOrderSearchStore((state) => state.setStatus);

  const { data } = useOrders();
  const orders = data ?? [];

  const counts: Record<OrderStatusFilter, number> = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    success: orders.filter((o) => o.status === "success").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {STATUS_OPTIONS.map(({ label, value, icon: Icon, chip, active }, index) => {
        const isActive = status === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => setStatus(value)}
            aria-pressed={isActive}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isActive
                ? active
                : "border-border bg-card hover:border-foreground/20 hover:shadow-xs"
            } ${index === 0 ? "col-span-2 sm:col-span-1" : ""}`}
          >
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${chip}`}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-xs font-medium text-muted-foreground">
                {label}
              </span>
              <span className="block text-xl font-semibold leading-tight text-foreground">
                {counts[value]}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}