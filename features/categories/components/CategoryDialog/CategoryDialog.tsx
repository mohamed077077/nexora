"use client";

import AppDialog from "@/shared/components/AppDialog";

import { useCategoryDialogStore } from "../../store/useCategoryDialogStore";

import AddCategoryForm from "./AddCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import DeleteCategoryContent from "./DeleteCategoryContent";

export default function CategoryDialog() {
  const dialog = useCategoryDialogStore(
    (state) => state.dialog
  );

  const close = useCategoryDialogStore(
    (state) => state.close
  );

  if (!dialog) {
    return null;
  }

  switch (dialog.type) {
    case "add":
      return (
        <AppDialog
          open
          onOpenChange={(open) => {
            if (!open) {
              close();
            }
          }}
          title="Add Category"
        >
          <AddCategoryForm />
        </AppDialog>
      );

    case "edit":
      return (
        <AppDialog
          open
          onOpenChange={(open) => {
            if (!open) {
              close();
            }
          }}
          title="Edit Category"
        >
          <EditCategoryForm
            value={dialog.category}
          />
        </AppDialog>
      );

    case "delete":
      return (
        <AppDialog
          open
          onOpenChange={(open) => {
            if (!open) {
              close();
            }
          }}
          title="Delete Category"
        >
          <DeleteCategoryContent
            category={dialog.category}
          />
        </AppDialog>
      );
  }
}