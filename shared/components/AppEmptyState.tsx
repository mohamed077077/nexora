import { FolderOpen, SearchX } from "lucide-react";

type EmptyProp = {
  title: string;
  description: string;
}
type EmptySearchProp = Omit<EmptyProp, "description"> & { search: string };

export function Empty({ title, description }: EmptyProp) {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-6 text-center">
      <div className="mb-4 flex items-center justify-center rounded-full bg-muted p-4">
        <FolderOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function EmptySearch({ title, search }: EmptySearchProp) {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-6 text-center">
      <div className="mb-4 flex items-center justify-center rounded-full bg-muted p-4">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        No {title} found
      </h3>
      <p className="text-sm text-muted-foreground">
        We couldn't find any {title} matching the keyword{" "}
        <span className="font-semibold text-foreground">"{search}"</span>.
      </p>
    </div>
  );
}
