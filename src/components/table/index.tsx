import React from "react";

import { TableScheme } from "../../types";
import { TableStateProvider, useGetTableState } from "../../providers";
import { baseTableColumnSort } from "./withSortableFunctional";

interface ComponentWidthChildren {
  children?: React.ReactNode;
}

interface TableProps<T extends Record<string, any>> {
  columns: TableScheme<T>[];
  data: T[];
  className?: string;
}

export const TableRow: React.FC<ComponentWidthChildren> = ({ children }) => (
  <tr className="table-row">{children}</tr>
);
export const TableBodyCell: React.FC<ComponentWidthChildren> = ({
  children,
}) => <td className="table-body-cell">{children}</td>;
export const TableHeaderCell: React.FC<ComponentWidthChildren> = ({
  children,
}) => <th className="table-header-cell">{children}</th>;

const BaseMetaTable = <T extends Record<string, any>>({
  columns,
  data,
  ...rest
}: TableProps<T>) => {
  const { className } = rest;
  const { state } = useGetTableState();
  const actualData = baseTableColumnSort(state, data);

  return (
    <table className={`meta-table ${className}`}>
      <thead className="meta-table__header">
        <TableRow>
          {columns.map((columns, count) => (
            <TableHeaderCell key={count}>{columns.headerModel}</TableHeaderCell>
          ))}
        </TableRow>
      </thead>
      <tbody className="meta-table__body">
        {actualData.map((tableRow, i) => {
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

const BaseMetaTableWithStateProvider = <T extends Record<string, any>>(
  props: TableProps<T>
) => {
  return (
    <TableStateProvider>
      <BaseMetaTable {...props} />
    </TableStateProvider>
  );
};

export { BaseMetaTableWithStateProvider as BaseMetaTable };
