import { TableScheme } from "../types";
import { TableStateProvider, useGetTableState } from "../providers";
import { TableBodyCell, TableHeaderCell, TableRow } from "./components";
import { sortTableData } from "./features/sort";
import { filterTableData } from "./features/filter";

interface TableProps<T extends Record<string, any>> {
  columns: TableScheme<T>[];
  data: T[];
  className?: string;
}

const BaseMetaTable = <T extends Record<string, any>>({
  columns,
  data,
  ...rest
}: TableProps<T>) => {
  const { className } = rest;
  const { state } = useGetTableState();
  const sortedData = sortTableData(state, data);
  const actualData = filterTableData(state, sortedData);

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
) => (
  <TableStateProvider>
    <BaseMetaTable {...props} />
  </TableStateProvider>
);

export { BaseMetaTableWithStateProvider as BaseMetaTable };
