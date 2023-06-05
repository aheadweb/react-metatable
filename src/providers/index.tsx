import React, { useContext, useMemo, useState } from "react";
import { SORT_STATUSES } from "../components/table/withSortableFunctional";

const DEFAULT_STATE: {
  sortable: Record<string, keyof typeof SORT_STATUSES>;
} = {
  sortable: {},
};

export type TableState = typeof DEFAULT_STATE

export const TableState = React.createContext<{
  state: TableState;
  setState: React.Dispatch<React.SetStateAction<typeof DEFAULT_STATE>>;
}>(null!);

export const useGetTableState = () => useContext(TableState);

export const TableStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState(DEFAULT_STATE);

  return (
    <TableState.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </TableState.Provider>
  );
};
