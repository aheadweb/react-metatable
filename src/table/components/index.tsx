import React from "react";

interface ComponentWidthChildren {
  children?: React.ReactNode;
}

const TableRow: React.FC<ComponentWidthChildren> = ({ children }) => (
  <tr className="table-row">{children}</tr>
);

const TableBodyCell: React.FC<ComponentWidthChildren> = ({ children }) => (
  <td className="table-body-cell">{children}</td>
);

const TableHeaderCell: React.FC<ComponentWidthChildren> = ({ children }) => (
  <th className="table-header-cell">{children}</th>
);

export { TableRow, TableBodyCell, TableHeaderCell };
