import { FolderOpen, SearchX } from "lucide-react";

export function EmptyCategory() {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-6 text-center">
      <div className="mb-4 flex items-center justify-center rounded-full bg-muted p-4">
        <FolderOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        No category yet!
      </h3>
      <p className="text-sm text-muted-foreground">
        Add your first category to get started.
      </p>
    </div>
  );
}

export function EmptySearch({ search }: { search: string }) {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-6 text-center">
      <div className="mb-4 flex items-center justify-center rounded-full bg-muted p-4">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        No items found
      </h3>
      <p className="text-sm text-muted-foreground">
        We couldn't find any category matching the keyword{" "}
        <span className="font-semibold text-foreground">"{search}"</span>.
      </p>
    </div>
  );
}
