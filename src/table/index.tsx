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


// https://uxdesign.cc/data-table-for-enterprise-ux-cb48fb9fdf1e
const BaseMetaTable = <T extends Record<string, any>>({
  columns,
  data,
  ...rest
}: TableProps<T>) => {
  const { className, pagination } = rest;
  const { state } = useGetTableState();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredData = filterTableData(state, data);

  const slicedData = pagination
    ? sliceDataViaPageSize(filteredData, pageSize, page)
    : filteredData;

  const sortedData = sortTableData(state, slicedData);

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
          {sortedData.map((tableRow, i) => {
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
          onChangePage={setPage}
          onPageSizeChange={setPageSize}
          totalCount={filteredData.length}
          pageSize={pageSize}
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
