"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import AppDeleteContent from "@/shared/components/AppDeleteContent";
import { deleteColor } from "../../http/DeleteColor";
import { useColorDialogStore } from "../../store/useColorDialogStore";
import type { Color } from "../../types";

type DeleteColorContentProps = { color: Color };

export default function DeleteColorContent({ color }: DeleteColorContentProps) {
  const queryClient = useQueryClient();
  const close = useColorDialogStore((state) => state.close);
  const { mutate: confirmDelete, isPending } = useMutation({
    mutationFn: () => deleteColor(color._id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["colors"] });
      toast.success("Color deleted successfully!", { duration: 3000 });
      close();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete color.", { duration: 4000 });
    },
  });

  return (
    <AppDeleteContent
      title="Color"
      image={color.iconUrl}
      itemName={color.title}
      onConfirm={confirmDelete}
      onCancel={close}
      isPending={isPending}
    />
  );
}
