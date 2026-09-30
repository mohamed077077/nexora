"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addColor } from "../../http/AddColor";
import { useColorDialogStore } from "../../store/useColorDialogStore";
import ColorForm from "./ColorForm";

export default function AddColorForm() {
  const queryClient = useQueryClient();
  const close = useColorDialogStore((state) => state.close);
  const { mutate: add, isPending, error } = useMutation({
    mutationFn: addColor,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["colors"] });
      toast.success("Color added successfully!", { duration: 3000 });
      close();
    },
  });

  return <ColorForm onCancel={close} onSubmit={add} isPending={isPending} error={error} submitLabel="Save Color" />;
}
