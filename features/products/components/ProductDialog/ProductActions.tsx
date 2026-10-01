import DeleteButton from "@/shared/components/AppDeleteBtn";
import EditButton from "@/shared/components/AppEditBtn";

type ProductActionsProps = {
  title?: string;
  size?: "default" | "sm" | "lg";
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ProductActions({
  title = "product",
  size = "default",
  onEdit,
  onDelete,
}: ProductActionsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <EditButton title={title} size={size} onClick={onEdit} />
      <DeleteButton title={title} size={size} onClick={onDelete} />
    </div>
  );
}
