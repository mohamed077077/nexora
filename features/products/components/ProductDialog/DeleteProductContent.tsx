"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import AppDeleteContent from "@/shared/components/AppDeleteContent";
import { deleteProduct } from "../../http/DeleteProduct";
import { useProductDialogStore } from "../../store/useProductDialogStore";
import type { Product } from "../../types";

type DeleteProductContentProps = {
  product: Product;
};

export default function DeleteProductContent({ product }: DeleteProductContentProps) {
  const queryClient = useQueryClient();
  const close = useProductDialogStore((state) => state.close);

  const { mutate: confirmDelete, isPending } = useMutation({
    mutationFn: () => deleteProduct(product._id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!", { duration: 3000 });
      close();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete product.", { duration: 4000 });
    },
  });

  const firstVariantImage = product.variants?.[0]?.image;

  return (
    <AppDeleteContent
      title="Product"
      image={firstVariantImage}
      itemName={product.title}
      onConfirm={confirmDelete}
      onCancel={close}
      isPending={isPending}
    />
  );
}
