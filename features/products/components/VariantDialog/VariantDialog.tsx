"use client";

import AppDialog from "@/shared/components/AppDialog";
import { useVariantDialogStore } from "@/features/products/store/useVariantDialogStore";
import AddVariantForm from "./forms/AddVariantForm";
import EditVariantForm from "./forms/EditVariantForm";
import DeleteVariantContent from "./DeleteVariantContent";
import { CustomColorDialog } from "./CustomColorDialog";

export default function VariantDialog() {
  const dialog = useVariantDialogStore((state) => state.dialog);
  const close = useVariantDialogStore((state) => state.close);

  const renderVariantDialog = () => {
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
  };

  // CustomColorDialog is rendered here — outside the parent AppDialog's DOM
  // tree — so @base-ui/react does NOT treat it as a nested dialog and its
  // backdrop works correctly.
  return (
    <>
      {renderVariantDialog()}
      <CustomColorDialog />
    </>
  );
}