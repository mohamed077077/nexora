"use client";

import CategoryContent from "@/features/categories/components/CategoryContent/CategoryContent";
import CategoryHeader from "@/features/categories/components/CategoryContent/CategoryHeader";
import CategoryDialog from "@/features/categories/components/CategoryDialog/CategoryDialog";

export default function CategoriesPage() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-6">
      <CategoryHeader />
      <CategoryContent />
      <CategoryDialog />
    </section>
  );
}