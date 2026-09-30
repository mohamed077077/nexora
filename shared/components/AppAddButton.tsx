import { Plus } from "lucide-react";

import { Button } from "@/shared/ui/button";

type AddButtonProps = {
  label?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

export default function AddButton({
  label = "Add",
  ariaLabel,
  onClick,
}: AddButtonProps) {
  return (
    <Button
      type="button"
      aria-label={ariaLabel ?? label}
      onClick={onClick}
      className="
        fixed bottom-6 right-6 z-50
        size-14 rounded-full p-0 shadow-lg
        lg:static
        lg:h-10
        lg:w-auto
        lg:rounded-md
        lg:px-4
        lg:shadow-none
      "
    >
      <Plus className="size-6 lg:size-4" />

      <span className="hidden lg:inline">
        {label}
      </span>
    </Button>
  );
}