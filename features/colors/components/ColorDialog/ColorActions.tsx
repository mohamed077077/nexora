"use client";

import AppDeleteBtn from "@/shared/components/AppDeleteBtn";
import AppEditBtn from "@/shared/components/AppEditBtn";
import type { Color } from "../../types";
import { useColorDialogStore } from "../../store/useColorDialogStore";

type ColorActionsProps = {
  color: Color;
  size?: "default" | "sm" | "lg";
};

export default function ColorActions({ color, size = "default" }: ColorActionsProps) {
  const openEdit = useColorDialogStore((state) => state.openEdit);
  const openDelete = useColorDialogStore((state) => state.openDelete);

  return (
    <div className="flex items-center justify-center gap-2">
      <AppEditBtn title="color" size={size} onClick={() => openEdit(color)} />
      <AppDeleteBtn title="color" size={size} onClick={() => openDelete(color)} />
    </div>
  );
}
