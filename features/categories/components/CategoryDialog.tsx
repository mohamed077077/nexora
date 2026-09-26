"use client";

import AppDialog from "@/shared/components/AppDialog";

import type { Category } from "../types";
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
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={action === "edit" ? "Edit Category" : "Add Category"}
    >
      <CategoryForm
        action={action}
        value={value}
        onOpenChange={onOpenChange}
      />
    </AppDialog>
  );
}