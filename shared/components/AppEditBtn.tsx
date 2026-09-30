import { Button } from "@/shared/ui/button";
import { Pencil } from "lucide-react";

type EditButtonProps = {
  title?: string;
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
};

export default function EditButton({
  title = "item",
  size = "default",
  onClick,
}: EditButtonProps) {
  const buttonSizeClass =
    size === "sm" ? "size-8" : size === "lg" ? "size-10" : "size-9";

  const iconSizeClass = size === "sm" ? "size-4" : "size-5";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onClick}
      className={`${buttonSizeClass} bg-background icon-hover hover:text-foreground/70`}
      aria-label={`Edit ${title}`}
    >
      <Pencil className={iconSizeClass} />
    </Button>
  );
}