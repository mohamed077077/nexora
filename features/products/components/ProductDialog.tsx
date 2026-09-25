"use client";

import {
  Dialog,
  DialogContent,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";


import { Plus, Trash2, X } from "lucide-react";
import DashboardActions from "@/shared/components/dashboard/DashboardActions";
import { useState } from "react";
import VariantDialog from "./VariantDialog";
import { Product , variants} from "./data";

type ProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action?: "add" | "edit";
  value?: Product;
};



export default function ProductDialog({
  open,
  onOpenChange,
  action = "add",
  value,
}: ProductDialogProps) {

  const [isVariantOpen, setIsVariantOpen] = useState(false);
  return (
    <>
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
            <div className="flex flex-col">
              <DialogTitle className="text-xl font-medium">
                {action === "edit" ? "Edit Product" : "Add Product"}
              </DialogTitle>


            </div>

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
              icon-hover transition-all 
              hover:bg-muted
            "
              aria-label="Close"
            >
              <X className="size-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Content */}
          <div className="px-3.5 py-3">
            {/* Basic Information */}
            <section>
              <h2 className="mb-4 text-base font-medium">
                Basic Information
              </h2>

              <div className="grid grid-cols-[1fr_116px] gap-x-6 gap-y-5">
                {/* Product title */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="product-title"
                    className="text-sm font-medium"
                  >
                    Product Title
                  </Label>

                  <Input
                    id="product-title"
                    placeholder="Enter product title"
                    className="h-9 rounded-md text-xs"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="product-category"
                    className="text-sm font-medium"
                  >
                    Category
                  </Label>

                  <Select>
                    <SelectTrigger
                      id="product-category"
                      className="h-9 w-full rounded-md text-sm"
                    >
                      <SelectValue placeholder="Categories" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="electronics">
                        Electronics
                      </SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="shoes">Shoes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div className="w-50 space-y-1.5">
                  <Label
                    htmlFor="base-price"
                    className="text-sm font-medium"
                  >
                    Base Price
                  </Label>

                  <Input
                    id="base-price"
                    defaultValue="$0.00"
                    className="h-9 rounded-md text-sm"
                  />
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="my-4 border-t border-border" />

            {/* Variants */}
            <section>
              <h2 className="mb-4 text-base font-medium">
                Variants
              </h2>

              {/* Variant headings */}
              <Table className=" w-full ">
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
                  {variants.map((variant) => (
                    <TableRow
                      key={variant.id}
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
                bg-background
                px-2
              "
                          >
                            <span
                              className={`size-2.5 rounded-full ${variant.colorClass}`}
                            />

                            <span className="text-xs font-medium">
                              {variant.color}
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
                            title={`${variant.color} variant`}
                            size="sm"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Add Variant */}
              <Button
                type="button"
                onClick={() => setIsVariantOpen(true)}
                className="
                mt-5
                h-9
                rounded-md
                px-3
                text-sm
                font-medium cursor-pointer
              "
              >
                <Plus className="size-4" />
                Add Variant
              </Button>
            </section>

            {/* Footer divider */}
            <div className="my-4 border-t border-border" />

            {/* Footer */}
            <div className="flex items-center justify-between">
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
                variant="outline"
                className="h-9 rounded-md px-3.5 text-sm font-medium cursor-pointer"
              >
                {action === "edit" ? "Save Changes" : "Save Product"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <VariantDialog
        open={isVariantOpen}
        onOpenChange={setIsVariantOpen}
      />
    </>
  );
}