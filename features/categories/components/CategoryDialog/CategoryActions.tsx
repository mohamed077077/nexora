"use client";

import EditButton from "@/shared/components/AppEditBtn";
import DeleteButton from "@/shared/components/AppDeleteBtn";

import { useCategoryDialogStore } from "../../store/useCategoryDialogStore";

import type { Category } from "../../types";

type CategoryActionsProps = {
  category: Category;
  size?: "default" | "sm" | "lg";
};

export default function CategoryActions({
  category,
  size = "default",
}: CategoryActionsProps) {
  const openEdit = useCategoryDialogStore(
    (state) => state.openEdit
  );

  const openDelete = useCategoryDialogStore(
    (state) => state.openDelete
  );

  return (
    <div className="flex items-center justify-center gap-2">
      <EditButton
        title="category"
        size={size}
        onClick={() => openEdit(category)}
      />

      <DeleteButton
        title="category"
        size={size}
        onClick={() => openDelete(category)}
      />
    </div>
  );
}