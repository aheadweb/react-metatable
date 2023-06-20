export enum BaseCellTypes {
  text = "text",
  number = "number",
}

export type BaseCell = {
  type: BaseCellTypes;
};

export enum FilterTypes {
  text = "text",
  enum = "enum",
  reference = "reference",
}

type FilterText = {
  type: FilterTypes.text;
};

type FilterEnum = {
  type: FilterTypes.enum;
  options: (string | number)[];
};

type FilterReference = {
  type: FilterTypes.reference;
  idPropName: string;
  fetchTo: string;
};

export type ColumnFilterSettings = FilterText | FilterEnum | FilterReference;

export type ColumnFunctionalSettings = {
  sortable?: boolean;
  filter?: ColumnFilterSettings;
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
