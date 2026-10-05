"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { colorSchema, type ColorFormValues } from "../../validations/colorSchema";
import AppImagePreview from "@/shared/components/AppImagePreview";

type ColorFormProps = {
  defaultValues?: ColorFormValues;
  error?: Error | null;
  isPending?: boolean;
  submitLabel: string;
  onSubmit: (data: ColorFormValues) => void;
  onCancel: () => void;
};

export default function ColorForm({
  defaultValues,
  error,
  isPending = false,
  submitLabel,
  onSubmit,
  onCancel,
}: ColorFormProps) {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    mode: "onTouched",
    defaultValues: {
      title: defaultValues?.title ?? "",
      iconUrl: defaultValues?.iconUrl ?? "",
    },
  });
  const iconUrl = watch("iconUrl");

  useEffect(() => {
    reset({
      title: defaultValues?.title ?? "",
      iconUrl: defaultValues?.iconUrl ?? "",
    });
  }, [defaultValues?.title, defaultValues?.iconUrl, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-3.5 py-3">
        <section>
          <h2 className="mb-4 text-base font-medium">Color Details</h2>
          {error instanceof Error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-destructive">{error.message}</div>
          )}
          <div className="flex flex-col gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-sm font-medium">Title</Label>
              <Input
                id="title"
                placeholder="Enter color title"
                {...register("title")}
                aria-invalid={!!errors.title}
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>
            <AppImagePreview
              id="iconUrl"
              label="Icon URL"
              imageUrl={iconUrl}
              error={errors.iconUrl?.message}
              alt="Color icon preview"
              {...register("iconUrl")}
            />
          </div>
        </section>
        <div className="my-4 border-t border-border" />
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => { reset(); onCancel(); }}
            className="h-9 rounded-md px-3.5 text-sm font-medium"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} variant="outline" className="h-9 rounded-md px-3.5 text-sm font-medium">
            {isPending ? <><Loader2 className="size-4 animate-spin" />Saving…</> : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
