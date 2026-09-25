"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import ProductPagination from "./ProductPagination";
import DashboardActions from "@/shared/components/dashboard/DashboardActions";
import { products } from "./data";

export default function ProductTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 4;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <>
      {/* --- PRODUCT TABLE (DESKTOP) --- */}
      <div className="hidden w-full overflow-auto rounded-2xl border border-border md:block">
        <Table>
          <TableHeader className="bg-card">
            <TableRow className="h-16 border-0 border-b border-border hover:bg-transparent">
              <TableHead className="table-head-cell">Image</TableHead>
              <TableHead className="table-head-cell">Product</TableHead>
              <TableHead className="table-head-cell">Category</TableHead>
              <TableHead className="table-head-cell">Price</TableHead>
              <TableHead className="table-head-cell">Stock</TableHead>
              <TableHead className="table-head-cell">Orders</TableHead>
              <TableHead className="table-head-cell">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentProducts.map((product) => (
              <TableRow
                key={product.id}
                className="border-0 border-b border-border px-5 py-4 last:border-b-0 hover:bg-transparent"
              >
                {/* Product Image */}
                <TableCell className="px-5 py-4">
                  <div className="relative size-20 overflow-hidden rounded-xl bg-card">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="80px"
                      className="cursor-pointer object-contain transition-transform hover:scale-110"
                    />
                  </div>
                </TableCell>

                {/* Product Name */}
                <TableCell>
                  <span className="table-text">{product.title}</span>
                </TableCell>

                {/* Category */}
                <TableCell className="table-text">
                  {product.category}
                </TableCell>

                {/* Price */}
                <TableCell className="table-text">
                  ${product.price.toFixed(2)}
                </TableCell>

                {/* Stock */}
                <TableCell
                  className={`text-base font-medium ${product.stock < 10
                    ? "text-destructive"
                    : product.stock > 20
                      ? "text-success"
                      : "text-primary"
                    }`}
                >
                  {product.stock}
                </TableCell>

                {/* Orders */}
                <TableCell className="table-text">
                  {product.orders}
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <DashboardActions title="product" size="lg" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Desktop Footer */}
        <div className="flex h-16 w-full items-center justify-between border-t border-border px-5">
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* --- PRODUCT CARDS (MOBILE) --- */}
      <div className="w-full overflow-hidden md:hidden">
        {/* Products */}
        <div>
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 border-b border-border px-4 py-4 last:border-b-0"
            >
              {/* Product Image */}
              <div className="relative size-20 overflow-hidden rounded-xl bg-card">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="80px"
                  className="cursor-pointer object-contain transition-transform hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[15px] font-medium leading-5 text-foreground">
                  {product.title}
                </h3>

                <p className="text-[13px] leading-5">
                  ${product.price.toFixed(2)}
                </p>

                <div className="mt-1 flex items-center gap-2 whitespace-nowrap text-xs leading-5 text-muted-foreground">
                  <span>{product.category}</span>

                  <span> | </span>

                  <span>
                    Stock:
                    <span
                      className={`ml-1 ${product.stock < 10
                        ? "text-destructive"
                        : product.stock > 20
                          ? "text-success"
                          : "text-primary"
                        }`}
                    >
                      {product.stock}
                    </span>
                  </span>

                  <span> | </span>

                  <span>Orders: {product.orders}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="shrink-0">
                <DashboardActions title="product" size="default" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Footer */}
        <div className="flex h-16 items-center justify-between border-t border-border px-4">
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}