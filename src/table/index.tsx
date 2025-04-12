import React from "react";

import { TableOpenApi } from "../types";
import {PlainObject} from './types';

import { TableStateProvider } from "../providers";

import { MetaTable } from "./table";
import * as TableTypes from './types';

const MetaTableWithApi = React.forwardRef(MetaTable) as <T extends PlainObject>(
  props: TableTypes.TableProps<T> & { ref?: React.ForwardedRef<TableOpenApi> }
) => JSX.Element;

const MetaTableWithStateProvider = <T extends PlainObject>(
  props: TableTypes.TableProps<T> & { tableApi?: React.MutableRefObject<TableOpenApi> }
) => {
  const { tableApi, ...rest } = props;
  return (
    <TableStateProvider>
      <MetaTableWithApi {...rest} ref={tableApi} />
    </TableStateProvider>
  );
};

export {TableTypes}
export { MetaTableWithStateProvider as MetaTable };
