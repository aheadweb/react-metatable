import React from "react";
import { Pagination } from "./pagination";
interface ComponentWidthChildren {
  children?: React.ReactNode;
}

const TableRow: React.FC<ComponentWidthChildren> = ({ children }) => (
  <tr className="meta-table__row">{children}</tr>
);

const TableBodyCell: React.FC<ComponentWidthChildren> = ({ children }) => (
  <td className="meta-table__body-cell">{children}</td>
);

const TableHeaderCell: React.FC<ComponentWidthChildren> = ({ children }) => (
  <th className="meta-table__header-cell">{children}</th>
);

export { TableRow, TableBodyCell, TableHeaderCell, Pagination };
