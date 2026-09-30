"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateColor } from "../../http/UpdateColor";
import { useColorDialogStore } from "../../store/useColorDialogStore";
import type { Color } from "../../types";
import type { ColorFormValues } from "../../validations/colorSchema";
import ColorForm from "./ColorForm";

type EditColorFormProps = { value: Color };

export default function EditColorForm({ value }: EditColorFormProps) {
  const queryClient = useQueryClient();
  const close = useColorDialogStore((state) => state.close);
  const { mutate: update, isPending, error } = useMutation({
    mutationFn: (data: ColorFormValues) => updateColor(value._id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["colors"] });
      toast.success("Color updated successfully!", { duration: 3000 });
      close();
    },
  });

  return (
    <ColorForm
      defaultValues={{ title: value.title, iconUrl: value.iconUrl }}
      onCancel={close}
      onSubmit={update}
      isPending={isPending}
      error={error}
      submitLabel="Save Changes"
    />
  );
}
