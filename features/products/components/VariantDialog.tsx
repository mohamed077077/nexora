"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { Variant } from "./data";

type VariantDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action?: "add" | "edit";
  value?: Variant;
};

export default function VariantDialog({
  open,
  onOpenChange,
  action = "add",
  value,
}: VariantDialogProps) {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          w-[calc(100%-2rem)]
          max-w-110
          gap-0
          overflow-hidden
          rounded-2xl
          border
          border-border
          bg-card
          p-0
          shadow-xl
        "
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-border px-3.5">
          <DialogTitle className="text-xl font-medium">
            {action === "edit" ? "Edit Variant" : "Add Variant"}
          </DialogTitle>

          <DialogDescription className="sr-only">
            {action === "edit" ? "Edit a product variant" : "Add a product variant"}
          </DialogDescription>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="
              flex
              size-8
              items-center
              justify-center
              rounded-md
              text-foreground
              transition-all
              icon-hover
              hover:bg-muted
            "
            aria-label="Close"
          >
            <X className="size-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 px-3.5 py-4">
          {/* Color */}
          <div className="space-y-1.5">
            <Label
              htmlFor="variant-color"
              className="text-sm font-medium"
            >
              Color
            </Label>

            <Select>
              <SelectTrigger
                id="variant-color"
                className="h-9 w-full rounded-md text-sm"
              >
                <SelectValue placeholder="Select color" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="black">
                  Black
                </SelectItem>

                <SelectItem value="white">
                  White
                </SelectItem>

                <SelectItem value="brown">
                  Brown
                </SelectItem>

                <SelectItem value="red">
                  Red
                </SelectItem>

                <SelectItem value="blue">
                  Blue
                </SelectItem>

                <SelectItem value="green">
                  Green
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Size */}
          <div className="space-y-1.5">
            <Label
              htmlFor="variant-size"
              className="text-sm font-medium"
            >
              Size
            </Label>

            <Input
              id="variant-size"
              placeholder="Enter size"
              className="h-9 rounded-md text-sm"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <Label
              htmlFor="variant-image-url"
              className="text-sm font-medium"
            >
              Image URL
            </Label>

            <Input
              id="variant-image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              className="h-9 rounded-md text-sm"
            />
          </div>

          {/* Preview */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              Preview
            </Label>

            <div
              className="
                flex
                h-44
                w-full
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-muted
              "
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Variant preview"
                  className="h-full w-full object-contain p-4"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImageIcon className="size-8" />

                  <span className="text-sm">
                    Image preview
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              className="h-9 rounded-md px-3.5 text-sm font-medium cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              className="h-9 rounded-md px-3.5 text-sm font-medium cursor-pointer"
            >
              {action === "edit" ? "Save Changes" : "Add Variant"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}