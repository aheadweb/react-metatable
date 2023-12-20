import React from "react";

import { TableOpenApi } from "../types";

import { TableStateProvider } from "../providers";

import { MetaTable, TableProps } from "./table";

const MetaTableWidthApi = React.forwardRef(MetaTable) as <
  T extends Record<string, any>
>(
  props: TableProps<T> & { ref?: React.ForwardedRef<TableOpenApi> }
) => JSX.Element;

const MetaTableWithStateProvider = <T extends Record<string, any>>(
  props: TableProps<T> & { tableApi?: React.MutableRefObject<TableOpenApi> }
) => {
  const { tableApi, ...rest } = props;
  return (
    <TableStateProvider>
      <MetaTableWidthApi {...rest} ref={tableApi} />
    </TableStateProvider>
  );
};

export { MetaTableWithStateProvider as MetaTable };
