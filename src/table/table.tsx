import React, { useImperativeHandle, useState } from "react";

import { TableScheme, HeaderModelSettings, TableOpenApi } from "../types";

import { useGetTableState } from "../providers";

import {
  Pagination,
  TableBodyCell,
  TableHeaderCell,
  TableRow,
} from "./components";

import { filterTableData, sortTableData } from "../table-features";

import { Utils } from "../utils";
import { ExpandColumn } from "./components/expand-column";

import "./index.css";

export interface TableProps<T extends Record<string, any>>
  extends HeaderModelSettings {
  pagination?: boolean;
  columns: TableScheme<T>[];
  data: T[];
  className?: string;
  expandable?: {
    render: (rowData: T) => JSX.Element | string | number;
    expandIcon?: (isOpen: boolean) => React.ReactNode;
    isExpandRow: boolean | ((rowData: T) => boolean);
    columnTitle?: string;
  };
}

const sliceDataViaPageSize = <T extends Record<string, any>>(
  data: T[],
  pageSize: number,
  page: number
) => data.slice((page - 1) * pageSize, pageSize * page);

export const MetaTable = <T extends Record<string, any>>(
  props: TableProps<T>,
  ref: React.ForwardedRef<TableOpenApi>
) => {
  const { columns, data, ...rest } = props;
  const { className, pagination, expandable, ...headerModelSettings } = rest;

  const { state, setState } = useGetTableState();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [expandRowId, setExpandRowId] = useState<(string | number)[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      setFilter: (columnName, value) =>
        setState((prev) => ({ ...prev, filter: { [columnName]: value } })),
      setSort: (columnName, sortStatus) =>
        setState((prev) => ({
          ...prev,
          sortable: { [columnName]: sortStatus },
        })),
      setPage: (page) => setPage(page),
    }),
    [setState]
  );

  const filteredData = filterTableData(state, data);
  const slicedData = pagination
    ? sliceDataViaPageSize(filteredData, pageSize, page)
    : filteredData;
  const sortedData = sortTableData(state, slicedData);

  const expandRowsId =
    expandable &&
    sortedData
      .map((row, index) => {
        const isExpandRow = Utils.isFunction(expandable.isExpandRow)
          ? expandable.isExpandRow(row)
          : expandable.isExpandRow;
        return isExpandRow ? row.id || String(index) : false;
      })
      .filter(Boolean);

  const hasSomeExpandRow =
    Array.isArray(expandRowsId) && expandRowsId.length > 0;

  return (
    <div className="meta-table-wrapper">
      <table className={`meta-table ${className || ""}`}>
        <thead className="meta-table__header">
          <TableRow>
            {hasSomeExpandRow && (
              <TableHeaderCell>{expandable?.columnTitle}</TableHeaderCell>
            )}
            {columns.map((columns, count) => (
              <TableHeaderCell key={`header-cell-${count}`}>
                {columns.headerModel(headerModelSettings)}
              </TableHeaderCell>
            ))}
          </TableRow>
        </thead>
        <tbody className="meta-table__body">
          {sortedData.map((tableRow, i) => {
            const rowId = tableRow.id || i;
            const isExpandRow = !!expandRowsId?.includes(rowId);
            const isOpen = expandRowId.includes(rowId);

            return (
              <React.Fragment key={`body-row-${tableRow?.id}${i}`}>
                <TableRow>
                  {hasSomeExpandRow && (
                    <ExpandColumn
                      rowId={rowId}
                      isExpandRow={isExpandRow}
                      isOpen={isOpen}
                      toggleExpandRow={setExpandRowId}
                      expandable={expandable}
                    />
                  )}
                  {columns.map((columns) => (
                    <TableBodyCell key={`body-cell-${columns.id}`}>
                      {columns?.bodyModel && columns?.bodyModel(tableRow)}
                    </TableBodyCell>
                  ))}
                </TableRow>
                {isExpandRow && isOpen && (
                  <TableRow>
                    <TableBodyCell colSpan={columns.length + 1}>
                      <div className="meta-table__cell-content-wrapper">
                        {expandable!.render(tableRow)}
                      </div>
                    </TableBodyCell>
                  </TableRow>
                )}
              </React.Fragment>
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
