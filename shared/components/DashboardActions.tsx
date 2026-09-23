import { Button } from "@/shared/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type DashboardActionsProps = {
  title?: string;
  compact?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function DashboardActions({
  title = "product",
  compact = false,
  onEdit,
  onDelete,
}: DashboardActionsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onEdit}
        className={`
          ${compact ? "size-8" : "size-11"}
          bg-background
          icon-hover
          hover:text-foreground/70
        `}
        aria-label={`Edit ${title}`}
      >
        <Pencil className={compact ? "size-4" : "size-5"} />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onDelete}
        className={`
          ${compact ? "size-8" : "size-11"}
          bg-background
          text-destructive
          icon-hover
          hover:text-destructive/70
        `}
        aria-label={`Delete ${title}`}
      >
        <Trash2 className={compact ? "size-4" : "size-5"} />
      </Button>
    </div>
  );
}