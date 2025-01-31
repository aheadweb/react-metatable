import React, { useContext, useState } from "react";
import { TableStateFilterValue } from "../../types";

const DEFAULT_STATE: Record<string, TableStateFilterValue> = {};

export const TableFilterStateContext = React.createContext<{
  filter: typeof DEFAULT_STATE;
  setState: React.Dispatch<React.SetStateAction<typeof DEFAULT_STATE>>;
}>(null!);

export const useGetTableState = () => useContext(TableFilterStateContext);
export const TableFilterStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filter, setState] = useState(DEFAULT_STATE);
  return (
    <TableFilterStateContext.Provider
      value={{
        filter,
        setState,
      }}
    >
      {children}
    </TableFilterStateContext.Provider>
  );
};
