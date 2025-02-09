import React, { useState } from "react";
import { SORT_STATUSES } from "../../table-features";

export type TableStateSort = Record<string, keyof typeof SORT_STATUSES>;

const DEFAULT_STATE: TableStateSort = {};
export const TableSortStateContext = React.createContext<{
  sort: typeof DEFAULT_STATE;
  setState: React.Dispatch<React.SetStateAction<typeof DEFAULT_STATE>>;
}>(null!);

export const TableSortStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sort, setState] = useState(DEFAULT_STATE);

  return (
    <TableSortStateContext.Provider
      value={{
        sort,
        setState,
      }}
    >
      {children}
    </TableSortStateContext.Provider>
  );
};
