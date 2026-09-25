import { Button } from "@/shared/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type DashboardActionsProps = {
  title?: string;
  size?: "default" | "sm" | "lg";
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function DashboardActions({
  title,
  size = "default",
  onEdit,
  onDelete,
}: DashboardActionsProps) {
  const buttonSizeClass = size === "sm" ? "size-8" : size === "lg" ? "size-10" : "size-9";
  const iconSizeClass = size === "sm" ? "size-4" : size === "lg" ? "size-5" : "size-5";

  return (
    <div className="flex items-center justify-center gap-2 ml-10 mb-5 md:m-0">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onEdit}
        className={`
          ${buttonSizeClass}
          bg-background
          icon-hover
          hover:text-foreground/70
        `}
        aria-label={`Edit ${title}`}
      >
        <Pencil className={iconSizeClass} />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onDelete}
        className={`
          ${buttonSizeClass}
          bg-background
          text-destructive
          icon-hover
          hover:text-destructive/70
        `}
        aria-label={`Delete ${title}`}
      >
        <Trash2 className={iconSizeClass} />
      </Button>
    </div>
  );
}