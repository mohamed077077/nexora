import { Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";

type AppDeleteBtnProps = {
  title?: string;
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
};

export default function AppDeleteBtn({
  title = "item",
  size = "default",
  onClick,
}: AppDeleteBtnProps) {
  const buttonSizeClass =
    size === "sm"
      ? "size-8"
      : size === "lg"
        ? "size-10"
        : "size-9";

  const iconSizeClass =
    size === "sm" ? "size-4" : "size-5";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onClick}
      className={`${buttonSizeClass} bg-background text-destructive icon-hover hover:text-destructive/70`}
      aria-label={`Delete ${title}`}
    >
      <Trash2 className={iconSizeClass} />
    </Button>
  );
}