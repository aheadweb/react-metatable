import React, { useCallback } from "react";
import { TableState, useGetTableState } from "../../providers";
import "./index.css";
import { SortAskIcon, SortDescIcon, SortIcon } from "./icons";

export const SORT_STATUSES = {
  DESC: "DESC",
  ASC: "ASC",
  DEFAULT: "DEFAULT",
} as const;

const ARROW_MAP = {
  [SORT_STATUSES.DESC]: <SortDescIcon />,
  [SORT_STATUSES.ASC]: <SortAskIcon />,
  [SORT_STATUSES.DEFAULT]: <SortIcon />,
};

const getSortableKey = (prevStatus: string) => {
  if (prevStatus === SORT_STATUSES.DEFAULT) return SORT_STATUSES.ASC;
  if (prevStatus === SORT_STATUSES.ASC) return SORT_STATUSES.DESC;
  if (prevStatus === SORT_STATUSES.DESC) return SORT_STATUSES.DEFAULT;
  return SORT_STATUSES.ASC;
};

export const sortTableData = <T extends Record<string, any>>(
  state: TableState,
  data: T[]
) => {
  const [sortConfig] = Object.entries(state.sortable);
  if (!sortConfig) return data;

  const [propName, sortStatus] = sortConfig;
  if (!propName || !Object.keys(SORT_STATUSES).includes(sortStatus)) return data
  if (sortStatus === SORT_STATUSES.DEFAULT) return data;

  const cloneData = [...data];
  const newData = cloneData.sort((a, b) => {
    const valA = a[propName];
    const valB = b[propName];
    if (valA > valB) return 1;
    if (valA < valB) return -1;
    return 0;
  });

  return sortStatus === SORT_STATUSES.ASC ? newData : newData.reverse();
};

const WithSortFeature = (props: {
  id: string;
  cellValue: string;
  icon?: (sortStatus: keyof typeof SORT_STATUSES) => JSX.Element;
}) => {
  const { cellValue, id, icon } = props;
  const { setState, state } = useGetTableState();

  if (!cellValue) return null;

  const toggleSortStatus = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sortable: {
        [id]: getSortableKey(prev.sortable[id]),
      },
    }));
  }, []);

  const status = state.sortable[id];
  const sortIcon = icon ? icon(status || ARROW_MAP.DEFAULT) : (ARROW_MAP[status] || ARROW_MAP.DEFAULT)

  return (
    <span className="sort-cell">
      <span className="sort-cell__value">{cellValue}</span>
      <span className="sort-cell__button" onClick={toggleSortStatus}>
        {sortIcon}
      </span>
    </span>
  );
};

const Memo = React.memo(WithSortFeature);
Memo.displayName = "WithSortCell";
export { Memo as WithSortCell };
