"use client";

import AppDialog from "@/shared/components/AppDialog";
import { useVariantDialogStore } from "@/features/products/store/useVariantDialogStore";
import AddVariantForm from "./forms/AddVariantForm";
import EditVariantForm from "./forms/EditVariantForm";
import DeleteVariantContent from "./DeleteVariantContent";

export default function VariantDialog() {
  const dialog = useVariantDialogStore((state) => state.dialog);
  const close = useVariantDialogStore((state) => state.close);

  if (!dialog) return null;

  switch (dialog.type) {
    case "add-variant":
      return (
        <AppDialog open onOpenChange={(open) => !open && close()} title="Add Variant">
          <AddVariantForm />
        </AppDialog>
      );
    case "edit-variant":
      return (
        <AppDialog open onOpenChange={(open) => !open && close()} title="Edit Variant">
          <EditVariantForm
            variant={dialog.variant}
            index={dialog.index ?? 0}
          />
        </AppDialog>
      );
    case "delete-variant":
      return (
        <AppDialog open onOpenChange={(open) => !open && close()} title="Delete Variant">
          <DeleteVariantContent
            variant={dialog.variant}
            index={dialog.index}
          />
        </AppDialog>
      );
  }
}