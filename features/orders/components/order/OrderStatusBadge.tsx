import type { OrderStatus } from "../../types";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  pending: {
    label: "Pending",
    bg: "bg-primary-500/10",
    text: "text-primary-600 dark:text-primary-400",
    border: "border-primary-500/20",
    dot: "bg-primary-500",
  },
  confirmed: {
    label: "Confirmed",
    bg: "bg-confirmed-500/10",
    text: "text-confirmed-600 dark:text-confirmed-400",
    border: "border-confirmed-500/20",
    dot: "bg-confirmed-500",
  },
  success: {
    label: "Success",
    bg: "bg-success-500/10",
    text: "text-success-600 dark:text-success-400",
    border: "border-success-500/20",
    dot: "bg-success-500",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/20",
    dot: "bg-destructive",
  },
};

type OrderStatusBadgeProps = {
  status: OrderStatus;
  className?: string;
};

export default function OrderStatusBadge({
  status,
  className = "",
}: OrderStatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
