import { HeaderModelSettings, TableScheme } from "../types";

export type RowId = number | string

export type PlainObject = Record<string, any>;

export interface ExpandProps<T> {
  render: (rowData: T) => JSX.Element | string | number;
  expandIcon?: (isOpen: boolean) => React.ReactNode;
  isExpandRow: boolean | ((rowData: T) => boolean);
  columnTitle?: string;
}

export interface TableProps<T extends PlainObject> extends HeaderModelSettings {
  pagination?: boolean;
  columns: TableScheme<T>[];
  data: T[];
  className?: string;
  expandable?: ExpandProps<T>;
}
