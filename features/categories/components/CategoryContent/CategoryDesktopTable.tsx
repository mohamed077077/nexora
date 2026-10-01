import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import DashboardImage from "@/shared/components/dashboard/DashboardImage";

import CategoryActions from "../CategoryDialog/CategoryActions";

import type { Category } from "../../types";

type CategoryDesktopTableProps = {
  categories: Category[];
};

export default function CategoryDesktopTable({
  categories,
}: CategoryDesktopTableProps) {
  return (
    <Table>
      <TableHeader className="bg-card">
        <TableRow className="h-16 border-0 border-b border-border hover:bg-transparent">
          <TableHead className="table-head-cell">
            Image
          </TableHead>

          <TableHead className="table-head-cell">
            Category
          </TableHead>

          <TableHead className="table-head-cell">
            Products
          </TableHead>

          <TableHead className="table-head-cell">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {categories.map((category) => (
          <TableRow
            key={category._id}
            className="border-0 border-b border-border last:border-b-0 hover:bg-transparent"
          >
            <TableCell className="px-5 py-4">
              <DashboardImage
                src={category.iconUrl}
                alt={category.title}
              />
            </TableCell>

            <TableCell>
              <span className="table-text">
                {category.title}
              </span>
            </TableCell>

            <TableCell className="table-text">
              {category.productCount}
            </TableCell>

            <TableCell>
              <CategoryActions
                category={category}
                size="lg"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
