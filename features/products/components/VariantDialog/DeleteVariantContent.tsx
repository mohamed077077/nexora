"use client";

import { toast } from "sonner";
import { useVariantStore } from "@/features/products/store/useDraftVariantStore";
import { useVariantDialogStore } from "@/features/products/store/useVariantDialogStore";
import AppDeleteContent from "@/shared/components/AppDeleteContent";
import type { Variant } from "@/features/products/types";

type DeleteVariantContentProps = {
  variant: Variant;
  index: number;
};

export default function DeleteVariantContent({
  variant,
  index,
}: DeleteVariantContentProps) {
  const close = useVariantDialogStore((state) => state.close);
  const deleteVariant = useVariantStore((state) => state.deleteVariant);

  const handleConfirm = () => {
    deleteVariant(index);
    toast.success("Variant deleted!");
    close();
  };

  return (
    <AppDeleteContent
      title="Variant"
      image={variant.image}
      itemName={`${variant.size} — Stock: ${variant.stock}`}
      onConfirm={handleConfirm}
      onCancel={close}
    />
  );
}
