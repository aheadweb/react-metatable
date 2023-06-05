export enum BaseCellTypes {
  text = "text",
  number = "number",
}

export type BaseCell = {
  type: BaseCellTypes;
};

export type ColumnFunctionalSettings = {
  sortable?: boolean;
};

export type CellType = BaseCell;

export interface TableMetaData {
  [columnName: string]: {
    cell: CellType;
  } & ColumnFunctionalSettings;
}

export interface TableScheme<T extends Record<string, any>> {
  id: string;
  headerModel: JSX.Element | null | string;
  bodyModel: ((tableData: T) => JSX.Element) | null;
}

export interface TableColumnsScheme {}
