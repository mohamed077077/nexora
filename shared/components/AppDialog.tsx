"use client";

import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/ui/dialog";
import { cn } from "cn";

type AppDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  confirmOpen?: boolean;
};

export default function AppDialog({
  open,
  onOpenChange,
  title,
  children,
  confirmOpen,
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "w-[calc(100%-2rem)] max-w-110 gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-xl",
            confirmOpen && "hidden"
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-border px-3.5">
          <DialogTitle className="text-xl font-medium">
            {title}
          </DialogTitle>

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
              hover:bg-muted
            "
            aria-label="Close dialog"
          >
            <X className="size-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Content */}
        {children}
      </DialogContent>
    </Dialog>
  );
}