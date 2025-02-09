import React from "react";
import { TableFilterStateProvider } from "./table-filter-state";
import { TableSortStateProvider } from "./table-sort-state";

export const TableStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TableFilterStateProvider>
      <TableSortStateProvider>{children}</TableSortStateProvider>
    </TableFilterStateProvider>
  );
};

export { TableFilterStateContext } from "./table-filter-state";
export { TableSortStateContext } from "./table-sort-state";

export type { TableStateFilter } from "./table-filter-state";
export type { TableStateSort } from "./table-sort-state";
