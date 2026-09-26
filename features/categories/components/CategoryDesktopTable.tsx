import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import DashboardActions from "@/shared/components/dashboard/DashboardActions";
import DashboardImage from "@/shared/components/dashboard/DashboardImage";
import { Category } from "../types";

type CategoryDesktopTableProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
};

export default function CategoryDesktopTable({ categories, onEdit }: CategoryDesktopTableProps) {
  return (
    <Table>
      <TableHeader className="bg-card">
        <TableRow className="h-16 border-0 border-b border-border hover:bg-transparent">
          <TableHead className="table-head-cell">Image</TableHead>
          <TableHead className="table-head-cell">Category</TableHead>
          <TableHead className="table-head-cell">Products</TableHead>
          <TableHead className="table-head-cell">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {categories.map((category) => (
          <TableRow
            key={category._id}
            className="border-0 border-b border-border last:border-b-0 hover:bg-transparent"
          >
            <TableCell className="px-5 py-4">
              <DashboardImage src={category.iconUrl} alt={category.title} />
            </TableCell>

            <TableCell>
              <span className="table-text">{category.title}</span>
            </TableCell>

            <TableCell className="table-text">{0}</TableCell>

            <TableCell>
              <DashboardActions
                title="category"
                size="lg"
                onEdit={() => onEdit(category)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
