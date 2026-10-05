"use client";

import DeleteButton from "@/shared/components/AppDeleteBtn";
import EditButton from "@/shared/components/AppEditBtn";
import { useProductDialogStore } from "@/features/products/store/useProductDialogStore";
import type { Product } from "@/features/products/types";

type ProductActionsProps = {
  product?: Product;
  title?: string;
  size?: "default" | "sm" | "lg";
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ProductActions({
  product,
  title = "product",
  size = "default",
  onEdit,
  onDelete,
}: ProductActionsProps) {
  const openEditProduct = useProductDialogStore((state) => state.openEditProduct);
  const openDeleteProduct = useProductDialogStore((state) => state.openDeleteProduct);

  const handleEdit = onEdit ?? (product ? () => openEditProduct(product) : undefined);
  const handleDelete = onDelete ?? (product ? () => openDeleteProduct(product) : undefined);

  return (
    <div className="flex items-center justify-center gap-2">
      <EditButton title={product?.title ?? title} size={size} onClick={handleEdit} />
      <DeleteButton title={product?.title ?? title} size={size} onClick={handleDelete} />
    </div>
  );
}
