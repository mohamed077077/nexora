"use client"
import ProductTable from "@/features/products/components/ProductTable";
import ProductHeader from "@/features/products/components/ProductHeader";


export default function ProductsPage() {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center  gap-6">
      <ProductHeader />
      <ProductTable />
    </section>
  );
}