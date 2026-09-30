"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCategory } from "../../http/UpdateCategory";
import { useCategoryDialogStore } from "../../store/useCategoryDialogStore";

import type { Category } from "../../types";
import type { CategoryFormValues } from "../../validations/categorySchema";

import CategoryForm from "./CategoryForm";

type EditCategoryFormProps = {
  value: Category;
};

export default function EditCategoryForm({
  value,
}: EditCategoryFormProps) {
  const queryClient = useQueryClient();

  const close = useCategoryDialogStore(
    (state) => state.close
  );

  const {
    mutate: update,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: CategoryFormValues) =>
      updateCategory(value._id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      toast.success("Category updated successfully!", {
        duration: 3000,
      });

      close();
    },
  });

  return (
    <CategoryForm
      defaultValues={{
        title: value.title,
        iconUrl: value.iconUrl,
      }}
      onCancel={close}
      onSubmit={update}
      isPending={isPending}
      error={error}
      submitLabel="Save Changes"
    />
  );
}