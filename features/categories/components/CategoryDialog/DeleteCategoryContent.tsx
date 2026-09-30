"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import AppDeleteContent from "@/shared/components/AppDeleteContent";

import { deleteCategory } from "../../http/DeleteCategory";
import { useCategoryDialogStore } from "../../store/useCategoryDialogStore";

import type { Category } from "../../types";

type DeleteCategoryContentProps = {
    category: Category;
};

export default function DeleteCategoryContent({
    category,
}: DeleteCategoryContentProps) {
    const queryClient = useQueryClient();

    const close = useCategoryDialogStore(
        (state) => state.close
    );

    const {
        mutate: confirmDelete,
        isPending,
    } = useMutation({
        mutationFn: () => deleteCategory(category._id),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["categories"],
            });

            toast.success("Category deleted successfully!", {
                duration: 3000,
            });

            close();
        },

        onError: (error: Error) => {
            toast.error(
                error.message || "Failed to delete category.",
                {
                    duration: 4000,
                }
            );
        },
    });

    return (
        <AppDeleteContent
            title="Category"
            image={category.iconUrl}
            itemName={category.title}
            onConfirm={confirmDelete}
            onCancel={close}
            isPending={isPending}
        />
    );
}