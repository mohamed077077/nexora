import DashboardImage from "@/shared/components/dashboard/DashboardImage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import type { Color } from "../../types";
import ColorActions from "../ColorDialog/ColorActions";

type ColorDesktopTableProps = { colors: Color[] };

export default function ColorDesktopTable({ colors }: ColorDesktopTableProps) {
  return (
    <Table>
      <TableHeader className="bg-card">
        <TableRow className="h-16 border-0 border-b border-border hover:bg-transparent">
          <TableHead className="table-head-cell">Image</TableHead>
          <TableHead className="table-head-cell">Color</TableHead>
          <TableHead className="table-head-cell">Products</TableHead>
          <TableHead className="table-head-cell">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {colors.map((color) => (
          <TableRow
            key={color._id}
            className="border-0 border-b border-border last:border-b-0 hover:bg-transparent"
          >
            <TableCell className="px-5 py-4">
              <DashboardImage src={color.iconUrl} alt={color.title} />
            </TableCell>
            <TableCell>
              <span className="table-text">{color.title}</span>
            </TableCell>
            <TableCell className="table-text">0</TableCell>
            <TableCell>
              <ColorActions color={color} size="lg" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
