"use client";

import AppDialog from "@/shared/components/AppDialog";
import { useProductDialogStore } from "@/features/products/store/useProductDialogStore";
import AddProductForm from "./forms/AddProductForm";
import EditProductForm from "./forms/EditProductForm";
import DeleteProductContent from "./DeleteProductContent";
import VariantDialog from "../VariantDialog/VariantDialog";

export default function ProductDialog() {
  const dialog = useProductDialogStore((state) => state.dialog);
  const close = useProductDialogStore((state) => state.close);

  if (!dialog) return null;

  const renderContent = () => {
    switch (dialog.type) {
      case "add-product":
        return (
          <AppDialog open onOpenChange={(open) => !open && close()} title="Add Product">
            <AddProductForm />
          </AppDialog>
        );
      case "edit-product":
        return (
          <AppDialog open onOpenChange={(open) => !open && close()} title="Edit Product">
            <EditProductForm product={dialog.product} />
          </AppDialog>
        );
      case "delete-product":
        return (
          <AppDialog open onOpenChange={(open) => !open && close()} title="Delete Product">
            <DeleteProductContent product={dialog.product} />
          </AppDialog>
        );
    }
  };

  return (
    <>
      {renderContent()}
      <VariantDialog />
    </>
  );
}
