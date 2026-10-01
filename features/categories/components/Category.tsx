import CategoryContent from "./CategoryContent/CategoryContent";
import CategoryHeader from "./CategoryHeader";
import CategoryDialog from "./CategoryDialog/CategoryDialog";

export default function Category() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-6">
      <CategoryHeader />
      <CategoryContent />
      <CategoryDialog />
    </section>
  );
}