"use client";

import AppDialog from "@/shared/components/AppDialog";
import { useColorDialogStore } from "../../store/useColorDialogStore";
import AddColorForm from "./AddColorForm";
import DeleteColorContent from "./DeleteColorContent";
import EditColorForm from "./EditColorForm";

export default function ColorDialog() {
  const dialog = useColorDialogStore((state) => state.dialog);
  const close = useColorDialogStore((state) => state.close);

  if (!dialog) return null;

  switch (dialog.type) {
    case "add":
      return (
        <AppDialog open onOpenChange={(open) => !open && close()} title="Add Color">
          <AddColorForm />
        </AppDialog>
      );
    case "edit":
      return (
        <AppDialog open onOpenChange={(open) => !open && close()} title="Edit Color">
          <EditColorForm value={dialog.color} />
        </AppDialog>
      );
    case "delete":
      return (
        <AppDialog open onOpenChange={(open) => !open && close()} title="Delete Color">
          <DeleteColorContent color={dialog.color} />
        </AppDialog>
      );
  }
}
