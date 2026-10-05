"use client";

import { Image as ImageIcon } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { type InputHTMLAttributes } from "react";

interface AppImagePreviewProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Current image URL value (watched from react-hook-form) */
  imageUrl?: string;
  /** Field label, defaults to "Image URL" */
  label?: string;
  /** Input id */
  id?: string;
  /** Alt text for the preview image */
  alt?: string;
  /** Validation error message */
  error?: string;
  /** Whether the image failed to load (controlled externally) */
  imageError?: boolean;
  /** Called when the preview image fails to load */
  onImageError?: () => void;
  /** object-fit style for the preview: "cover" | "contain", defaults to "contain" */
  fit?: "cover" | "contain";
}

export default function AppImagePreview({
  imageUrl,
  label = "Image URL",
  id = "image-url",
  alt = "Preview",
  error,
  imageError,
  onImageError,
  fit = "contain",
  ...inputProps
}: AppImagePreviewProps) {
  return (
    <div className="space-y-3">
      {/* Input */}
      <div className="space-y-1.5">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>

        <Input
          id={id}
          type="url"
          placeholder="https://example.com/image.jpg"
          aria-invalid={!!error}
          {...inputProps}
        />

        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>

      {/* Preview box */}
      <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/50">
        {imageUrl && !error && !imageError ? (
          <img
            src={imageUrl}
            alt={alt}
            className={`h-full w-full p-2 ${fit === "cover" ? "object-cover" : "object-contain"}`}
            onError={onImageError}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <ImageIcon className="mb-2 size-8 opacity-50" />
            <span className="text-xs">No image provided</span>
          </div>
        )}
      </div>
    </div>
  );
}
