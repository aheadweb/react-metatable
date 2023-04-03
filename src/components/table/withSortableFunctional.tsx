import React, { useCallback } from "react";
import { useGetTableState } from "../../providers";

export const SORT_STATUSES = {
  DESC: "DESC",
  ASC: "ASC",
  DEFAULT: "DEFAULT",
} as const;

const ARROW_MAP = {
  [SORT_STATUSES.DESC]: "↑",
  [SORT_STATUSES.ASC]: "↓",
  [SORT_STATUSES.DEFAULT]: "⇊",
};

const getSortableKey = (prevStatus: string) => {
  if (prevStatus === SORT_STATUSES.DEFAULT) return SORT_STATUSES.ASC;
  if (prevStatus === SORT_STATUSES.ASC) return SORT_STATUSES.DESC;
  if (prevStatus === SORT_STATUSES.DESC) return SORT_STATUSES.DEFAULT;
  return SORT_STATUSES.ASC;
};

const WithSortableFunction = ({
  cellValue,
  id,
}: {
  id: string;
  cellValue: string;
}) => {
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

  const status = state.sortable[id] as unknown as keyof typeof SORT_STATUSES;

  return (
    <>
      <span onClick={toggleSortStatus}>
        {cellValue}
        {ARROW_MAP[status] || ARROW_MAP.DEFAULT}
      </span>
    </>
  );
};

const Memo = React.memo(WithSortableFunction);

export { Memo as WithSortableFunction };
