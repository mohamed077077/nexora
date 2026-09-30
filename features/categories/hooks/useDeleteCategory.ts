import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCategory } from "../http/DeleteCategory";

export function useDeleteCategory(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully!", { duration: 3000 });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to delete category.", {
        duration: 4000,
      });
    },
  });
}
