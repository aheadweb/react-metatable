import { useState } from "react";

import { TableScheme, HeaderModelSettings } from "../types";

import { TableStateProvider, useGetTableState } from "../providers";

import {
  Pagination,
  TableBodyCell,
  TableHeaderCell,
  TableRow,
} from "./components";

import { filterTableData, sortTableData } from "../table-features";

import "./index.css";

interface TableProps<T extends Record<string, any>>
  extends HeaderModelSettings {
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
  const { className, pagination, ...headerModelSettings } = rest;
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
                {columns.headerModel && columns.headerModel(headerModelSettings)}
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

const MetaTableWithStateProvider = <T extends Record<string, any>>(
  props: TableProps<T>
) => (
  <TableStateProvider>
    <BaseMetaTable {...props} />
  </TableStateProvider>
);

export { MetaTableWithStateProvider as MetaTable };
