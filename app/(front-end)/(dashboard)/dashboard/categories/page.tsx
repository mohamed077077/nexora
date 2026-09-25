"use client";

import CategoryTable from "@/features/categories/components/CategoryTable";
import CategoryHeader from "@/features/categories/components/CategoryHeader";
import { useState } from "react";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-6">
      <CategoryHeader search={search} onSearchChange={setSearch} />
      <CategoryTable search={search} />
    </section>
  );
}