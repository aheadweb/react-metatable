export enum BaseCellTypes {
  text = "text",
  number = "number",
}

export type BaseCell = {
  type: BaseCellTypes;
};

export enum FilterTypes {
  Text = "text",
  Enum = "enum",
  Reference = "reference",
}

export type FilterText = {
  type: FilterTypes.Text;
};

export type FilterEnum = {
  type: FilterTypes.Enum;
  options: (string | number)[];
};

export type FilterReference = {
  type: FilterTypes.Reference;
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
