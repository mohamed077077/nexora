"use client";

import Image from "next/image";
import { AlertTriangle, Loader2 } from "lucide-react";

import { Button } from "@/shared/ui/button";

type AppDeleteContentProps = {
  title: string;
  description?: string;
  image?: string;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending?: boolean;
};

export default function AppDeleteContent({
  title,
  description,
  image,
  itemName,
  onConfirm,
  onCancel,
  isPending = false,
}: AppDeleteContentProps) {
  return (
    <>
      {/* Body */}
      <div className="flex flex-col items-center gap-5 px-6 py-8 text-center">
        {/* Warning icon */}
        <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle
            className="size-7 text-destructive"
            strokeWidth={1.75}
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground">
            {description ??
              `Are you sure you want to delete this ${title.toLowerCase()}? This action cannot be undone.`}
          </p>
        </div>

        {/* Item preview */}
        {(image || itemName) && (
          <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
            {image && (
              <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-border bg-background">
                <Image
                  src={image}
                  alt={itemName ?? title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {itemName && (
              <span className="truncate text-sm font-medium text-foreground">
                {itemName}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          className="min-w-20"
        >
          Cancel
        </Button>

        <Button
          type="button"
          variant="destructive"
          onClick={onConfirm}
          disabled={isPending}
          className="min-w-24 gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Deleting…
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </div>
    </>
  );
}