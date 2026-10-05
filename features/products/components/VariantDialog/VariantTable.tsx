"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import DashboardActions from "@/shared/components/dashboard/DashboardActions";
import { useVariantStore } from "@/features/products/store/useProductStore";
import { useVariantDialogStore } from "@/features/products/store/useVariantDialogStore";
import { useColors } from "@/features/colors/hooks/useColors";
import type { Variant } from "@/features/products/types";

type VariantTableProps = {
  variants?: Variant[];
};

export default function VariantTable({ variants: propsVariants }: VariantTableProps) {
  const storeDraft = useVariantStore((state) => state.draft);
  const variants = propsVariants ?? storeDraft ?? [];

  const openEditVariant = useVariantDialogStore((state) => state.openEditVariant);
  const openDeleteVariant = useVariantDialogStore((state) => state.openDeleteVariant);

  const { data: colorsData } = useColors();
  const colors = colorsData ?? [];

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-0 hover:bg-transparent">
          <TableHead className="h-8 p-0 text-center text-sm font-medium">
            Colors
          </TableHead>

          <TableHead className="h-8 p-0 text-center text-sm font-medium">
            Size
          </TableHead>

          <TableHead className="h-8 p-0 text-center text-sm font-medium">
            Stock
          </TableHead>

          <TableHead className="h-8 p-0 text-center text-sm font-medium">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {variants.length === 0 ? (
          <TableRow className="border-0 hover:bg-transparent">
            <TableCell
              colSpan={4}
              className="h-16 text-center text-sm text-muted-foreground"
            >
              No variants added yet.
            </TableCell>
          </TableRow>
        ) : (
          variants.map((variant, index) => {
            const color = colors?.find((c) => c._id === variant.colorId);

            return (
              <TableRow
                key={`${variant.colorId}-${variant.size}-${index}`}
                className="border-0 hover:bg-transparent"
              >
                {/* Color */}
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <div
                      className="
                        flex
                        h-6
                        min-w-16
                        w-fit
                        items-center
                        justify-center
                        gap-1.5
                        rounded-md
                        border
                        border-border
                        bg-muted
                        px-2
                      "
                    >
                      {color?.iconUrl ? (
                        <img
                          src={color.iconUrl}
                          alt={color.title}
                          className="size-5 rounded-full object-cover "
                        />
                      ) : (
                        <span className="size-5 rounded-full bg-muted-foreground" />
                      )}

                      <span className="text-xs font-medium">
                        {color?.title ?? "Unknown"}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Size */}
                <TableCell className="text-center text-sm">
                  {variant.size}
                </TableCell>

                {/* Stock */}
                <TableCell className="text-center text-sm">
                  {variant.stock}
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex justify-center">
                    <DashboardActions
                      title={`${color?.title ?? "variant"} variant`}
                      size="sm"
                      onEdit={() => openEditVariant(variant, index)}
                      onDelete={() => openDeleteVariant(variant, index)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
