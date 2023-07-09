import { TableScheme } from "../types";

import { TableStateProvider, useGetTableState } from "../providers";

import {
  Pagination,
  TableBodyCell,
  TableHeaderCell,
  TableRow,
} from "./components";

import { sortTableData } from "./features/sort";
import { filterTableData } from "./features/filter";

import "./index.css";
import { useState } from "react";

interface TableProps<T extends Record<string, any>> {
  pagination?: boolean;
  columns: TableScheme<T>[];
  data: T[];
  className?: string;
}

const sliceDataViaPageSize = <T extends Record<string, any>>(
  data: T[],
  pageSize: number,
  page: number
) => data.slice((page - 1) * pageSize, pageSize * page);

const BaseMetaTable = <T extends Record<string, any>>({
  columns,
  data,
  ...rest
}: TableProps<T>) => {
  const { className, pagination } = rest;
  const { state } = useGetTableState();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  const sortedData = sortTableData(state, data);
  const filteredData = filterTableData(state, sortedData);
  const slicedData = pagination
    ? sliceDataViaPageSize(filteredData, pageSize, page)
    : filteredData;

  return (
    <div className="meta-table-wrapper">
      <table className={`meta-table ${className}`}>
        <thead className="meta-table__header">
          <TableRow>
            {columns.map((columns, count) => (
              <TableHeaderCell key={count}>
                {columns.headerModel}
              </TableHeaderCell>
            ))}
          </TableRow>
        </thead>
        <tbody className="meta-table__body">
          {slicedData.map((tableRow, i) => {
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
      {pagination && (
        <Pagination
          onChangePage={(page) => setPage(page)}
          totalCount={filteredData.length}
          pageSize={pageSize}
          siblingCount={1}
          currentPage={page}
        />
      )}
    </div>
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
