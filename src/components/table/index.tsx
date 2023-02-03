import React from "react";

import { TableScheme } from "../../types";

interface ComponentWidthChildren {
  children?: React.ReactNode;
}

interface TableProps<T> {
  columns: TableScheme<T>[];
  data: T[];
}

export const TableRow: React.FC<ComponentWidthChildren> = ({ children }) => (
  <tr>{children}</tr>
);
export const TableBodyCell: React.FC<ComponentWidthChildren> = ({
  children,
}) => <td>{children}</td>;
export const TableHeaderCell: React.FC<ComponentWidthChildren> = ({
  children,
}) => <th>{children}</th>;

export const BaseMetaTable = <T extends Record<string, any>>({
  columns,
  data,
}: TableProps<T>) => {
  return (
    <table>
      <thead>
        <TableRow>
          {columns.map((columns, count) => (
            <TableHeaderCell key={count}>{columns.headerModel}</TableHeaderCell>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {data.map((tableRow, i) => {
          return (
            <TableRow key={`${tableRow?.id}${i}`}>
              {columns.map((columns) => (
                <TableBodyCell key={columns.id}>
                  {columns?.bodyModel && columns?.bodyModel(tableRow)}
                </TableBodyCell>
              ))}
            </TableRow>
          );
        })}
      </tbody>
    </table>
  );
};
