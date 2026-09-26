"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/ui/dialog";
import { X } from "lucide-react";
import { Category } from "./data";
import CategoryForm from "./CategoryForm";

type CategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action?: "add" | "edit";
  value?: Category;
};

export default function CategoryDialog({
  open,
  onOpenChange,
  action = "add",
  value,
}: CategoryDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          w-[calc(100%-2rem)]
          max-w-110
          gap-0
          overflow-hidden
          rounded-2xl
          border
          border-border
          bg-card
          p-0
          shadow-xl
        "
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-border px-3.5">
          <DialogTitle className="text-xl font-medium">
            {action === "edit" ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="
              flex
              size-8
              items-center
              justify-center
              rounded-md
              text-foreground
              icon-hover transition-all 
              hover:bg-muted
            "
            aria-label="Close"
          >
            <X className="size-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Content */}
        <CategoryForm
          action={action}
          value={value}
          onOpenChange={onOpenChange}

        />
      </DialogContent>
    </Dialog>
  );
}
