"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addCategory } from "../../http/AddCategory";
import { useCategoryDialogStore } from "../../store/useCategoryDialogStore";

import CategoryForm from "./CategoryForm";

export default function AddCategoryForm() {
  const queryClient = useQueryClient();

  const close = useCategoryDialogStore((state) => state.close);

  const {
    mutate: add,
    isPending,
    error,
  } = useMutation({
    mutationFn: addCategory,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      toast.success("Category added successfully!", {
        duration: 3000,
      });

      close();
    },
  });

  return (
    <CategoryForm
      onCancel={close}
      onSubmit={add}
      isPending={isPending}
      error={error}
      submitLabel="Save Category"
    />
  );
}