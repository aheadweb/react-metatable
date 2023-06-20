import React, { useContext, useState } from "react";
import { SORT_STATUSES } from "../table/features";

const DEFAULT_STATE: {
  sortable: Record<string, keyof typeof SORT_STATUSES>;
  filter: Record<string, string | number>;
} = {
  sortable: {},
  filter: {},
};

export type TableState = typeof DEFAULT_STATE;

export const TableState = React.createContext<{
  state: TableState;
  setState: React.Dispatch<React.SetStateAction<TableState>>;
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
