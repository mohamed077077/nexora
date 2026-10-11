"use client";

import type { ComponentProps, ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";

export interface AppSelectItem {
  _id: string;
  title: string;
  iconUrl?: string;
}

export interface AppSelectProps
  extends ComponentProps<typeof Select> {
  data: AppSelectItem[];
  title: string;
  placeholder: string;
  error?: string;
  allOptionLabel?: string;
  allOptionIcon?: ReactNode;
  id?: string;
}

export default function AppSelect({
  data = [],
  title,
  placeholder,
  error,
  allOptionLabel,
  allOptionIcon,
  id,
  value,
  onValueChange,
  ...props
}: AppSelectProps) {
  const selectedItem =
    typeof value === "string"
      ? data.find((item) => item._id === value)
      : undefined;

  return (
    <div className="w-full space-y-1.5">
      <Label
        htmlFor={id}
        className="text-sm font-medium"
      >
        {title}
      </Label>

      <Select
        {...props}
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger
          id={id}
          className="w-full"
          aria-invalid={!!error}
        >
          <SelectValue placeholder={placeholder}>
            {value === "all" && allOptionLabel ? (
              <span className="flex items-center gap-2">
                {allOptionIcon ?? <span className="size-3.5 shrink-0 rounded-full border border-border bg-muted" />}
                <span>{allOptionLabel}</span>
              </span>
            ) : selectedItem ? (
              <span className="flex min-w-0 items-center gap-2">
                {selectedItem.iconUrl ? (
                  <img
                    src={selectedItem.iconUrl}
                    alt=""
                    className="size-4 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="size-3.5 shrink-0 rounded-full border border-border bg-muted" />
                )}

                <span className="truncate">
                  {selectedItem.title}
                </span>
              </span>
            ) : null}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {allOptionLabel && (
            <SelectItem value="all">
              <span className="flex items-center gap-2">
                {allOptionIcon ?? <span className="size-3.5 shrink-0 rounded-full border border-border bg-muted" />}
                <span>{allOptionLabel}</span>
              </span>
            </SelectItem>
          )}

          {data.map((item) => (
            <SelectItem
              key={item._id}
              value={item._id}
            >
              <span className="flex items-center gap-2">
                {item.iconUrl ? (
                  <img
                    src={item.iconUrl}
                    alt=""
                    className="size-4 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="size-3.5 shrink-0 rounded-full border border-border bg-muted" />
                )}

                <span>{item.title}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <p className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}