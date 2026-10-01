"use client";

import ProductContent from "./ProductContent/ProductContent";
import ProductHeader from "./ProductHeader/ProductHeader";
import ProductDialog from "./ProductDialog/ProductDialog";
import { useState } from "react";

export default function Product() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-6">
      <ProductHeader />
      <ProductContent />
      <ProductDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
}
