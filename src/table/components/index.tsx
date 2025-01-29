import React from "react";
import { Pagination } from "./pagination";

interface ComponentWidthChildren {
  children?: React.ReactNode;
}

type TableCellComponent = React.ThHTMLAttributes<HTMLTableCellElement> &
  React.TdHTMLAttributes<HTMLTableCellElement>;

const TableRow: React.FC<ComponentWidthChildren> = ({ children }) => (
  <tr className="meta-table__row">{children}</tr>
);

const TableBodyCell: React.FC<ComponentWidthChildren & TableCellComponent> = ({
  children,
  className,
  ...rest
}) => (
  <td className={`meta-table__body-cell ${className || ""}`} {...rest}>
    {children}
  </td>
);

const TableHeaderCell: React.FC<
  ComponentWidthChildren & TableCellComponent
> = ({ children, className, ...rest }) => (
  <th className={`meta-table__header-cell ${className || ""}`} {...rest}>
    {children}
  </th>
);

export { TableRow, TableBodyCell, TableHeaderCell, Pagination };
