
"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import { Button } from "@/shared/ui/button";

const products = [
  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },


];

export default function ProductTable() {
  return (
    <div className="w-full overflow-auto rounded-2xl border border-border">
      <Table>
        <TableHeader className="bg-card">
          <TableRow className="border-0 border-b border-border last:border-b-0 hover:bg-transparent">
            <TableHead className="h-16 px-5 font-normal text-base text-foreground border-0">
              Image
            </TableHead>

            <TableHead className="h-16 px-5 font-normal text-base text-foreground border-0">
              Product
            </TableHead>

            <TableHead className="h-16 px-5 font-normal text-base text-foreground border-0">
              Category
            </TableHead>

            <TableHead className="h-16 px-5 font-normal text-base text-foreground border-0">
              Price
            </TableHead>

            <TableHead className="h-16 px-5 font-normal text-base text-foreground border-0">
              Stock
            </TableHead>

            <TableHead className="h-16 px-5 font-normal text-base text-foreground border-0">
              Orders
            </TableHead>

            <TableHead className="h-16 px-5 font-normal text-base text-foreground border-0">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow className="border-0 border-b border-border last:border-b-0 hover:bg-transparent px-5 py-4"
              key={product.id}
            >
              {/* Product Image */}
              <TableCell className="px-5 py-4">
                <div className="relative size-20 overflow-hidden rounded-xl bg-card">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="80px"
                    className="object-contain p-1  size-24   hover:scale-110 transition-transform cursor-pointer"
                  />
                </div>
              </TableCell>

              {/* Product Name */}
              <TableCell>
                <span className="font-medium text-base text-foreground">
                  {product.title}
                </span>
              </TableCell>

              {/* Category */}
              <TableCell className="font-medium text-base text-foreground">
                {product.category}
              </TableCell>

              {/* Price */}
              <TableCell className="font-medium text-base text-foreground">
                ${product.price.toFixed(2)}
              </TableCell>

              {/* Stock */}
              <TableCell className={`font-medium text-base  ${product.stock < 10 ? 'text-destructive' : product.stock > 20 ? 'text-success' : 'text-primary'
                }`}>
                {product.stock}
              </TableCell>

              {/* Orders */}
              <TableCell className="font-medium text-base text-foreground">
                {product.orders}
              </TableCell>

              {/* Actions */}
              <TableCell>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-11  bg-background  hover:scale-110 transition-transform cursor-pointer"
                    aria-label={`Edit ${product.title}`}
                  >
                    <Pencil className="size-5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="size-11  bg-background text-destructive  hover:text-destructive hover:scale-110 transition-transform cursor-pointer"
                    aria-label={`Delete ${product.title}`}
                  >
                    <Trash2 className="size-5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}