export enum BaseCellTypes {
  text = "text",
  number = "number",
}

export type BaseCell = {
  type: BaseCellTypes;
};

export interface TableMetaData {
  [columnName: string]: BaseCell;
}

export interface TableScheme<T> {
  headerModel: string;
  bodyModel: ((tableData: T) => JSX.Element) | null;
}

export interface TableColumnsScheme {}
