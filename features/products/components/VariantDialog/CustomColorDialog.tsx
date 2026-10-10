"use client";

import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { useColorStore } from "../../store/useColorStore";

import AppDialog from "@/shared/components/AppDialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

const isHexColor = (value: string) =>
  /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);

export function CustomColorDialog() {
  const isOpen = useColorStore(
    (state) => state.isCustomDialogOpen,
  );

  const color = useColorStore((state) => state.color);
  const colorName = useColorStore((state) => state.colorName);

  const setColorDetails = useColorStore(
    (state) => state.setColorDetails,
  );

  const closeCustomDialog = useColorStore(
    (state) => state.closeCustomDialog,
  );

  const [draftColor, setDraftColor] = useState("#000000");
  const [draftName, setDraftName] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setDraftColor(isHexColor(color) ? color : "#000000");
    setDraftName(colorName);
    setNameError("");
  }, [isOpen, color, colorName]);

  const handleSave = () => {
    const trimmedName = draftName.trim();

    if (!trimmedName) {
      setNameError("Color name is required.");
      return;
    }

    setColorDetails(draftColor, trimmedName);
    closeCustomDialog();
  };

  return (
    <AppDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeCustomDialog();
      }}
      title="Custom Color"
    >
      <div className="space-y-5 p-4">

        {/* Color Picker */}
        <div>
          <HexColorPicker
            color={draftColor}
            onChange={setDraftColor}
            style={{
              width: "100%",
              height: 200,
            }}
          />
        </div>

        {/* Selected Color Preview & Color Name */}
        <div className="flex items-start gap-3">
          {/* Selected Color Preview */}
          <div className="flex shrink-0 items-center gap-3 rounded-md border border-border p-3">
            <span
              className="size-9 shrink-0 rounded-full border border-border"
              style={{ backgroundColor: draftColor }}
            />

            <div className="min-w-0">
              <p className="text-sm font-medium">
                Selected Color
              </p>

              <p className="text-sm uppercase text-muted-foreground">
                {draftColor}
              </p>
            </div>
          </div>

          {/* Color Name */}
          <div className="min-w-0 flex-1 space-y-2">
            <Label htmlFor="custom-color-name">
              Color Name
            </Label>

            <Input
              id="custom-color-name"
              value={draftName}
              onChange={(event) => {
                setDraftName(event.target.value);

                if (event.target.value.trim()) {
                  setNameError("");
                }
              }}
              placeholder="e.g. Midnight Black"
              aria-invalid={!!nameError}
            />

            {nameError && (
              <p className="text-xs text-destructive">
                {nameError}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={closeCustomDialog}
          >
            Cancel
          </Button>

          <Button type="button" onClick={handleSave}>
            Save Color
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}