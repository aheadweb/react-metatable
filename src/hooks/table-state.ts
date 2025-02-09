import { useContext } from "react";
import { TableFilterStateContext, TableSortStateContext } from "../providers";

export const useTableFilterState = () => useContext(TableFilterStateContext);
export const useTableSortState = () => useContext(TableSortStateContext);