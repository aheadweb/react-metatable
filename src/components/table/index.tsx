import React, { useEffect, useState } from "react";

import { TableScheme } from "../../types";
import { TableStateProvider, useGetTableState } from "../../providers";
import { SORT_STATUSES } from "./withSortableFunctional";

interface ComponentWidthChildren {
  children?: React.ReactNode;
}

interface TableProps<T> {
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
  const [tableData, setTableData] = useState([...data]);

  useEffect(() => {
    const [sortConfig] = Object.entries(state.sortable);
    if (!sortConfig) return;

    const [propName, sortStatus] = sortConfig;
    const pN = propName as keyof typeof data[0];

    if (sortStatus === SORT_STATUSES.DEFAULT) {
      setTableData([...data]);
      return;
    }

    const newData = [
      ...tableData.sort((a, b) => {
        const valA = a[pN];
        const valB = b[pN];
        if (valA > valB) return 1;
        if (valA < valB) return -1;
        return 0;
      }),
    ];

    setTableData(
      sortStatus === SORT_STATUSES.ASC ? newData : newData.reverse()
    );
  }, [state.sortable]);

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

const BaseMetaTableWithStateProvider = <T extends Record<string, any>>(
  props: TableProps<T>
) => (
  <TableStateProvider>
    <BaseMetaTable {...props} />
  </TableStateProvider>
);

export { BaseMetaTableWithStateProvider as BaseMetaTable };
