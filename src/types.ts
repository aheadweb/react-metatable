export enum BaseCellTypes {
  text = "text",
  number = "number",
  date = "date",
}

export type BaseCell = {
  type: Exclude<keyof typeof BaseCellTypes, 'date'>;
};

export type DateCell = {
  type: BaseCellTypes.date;
  options?: Intl.DateTimeFormatOptions
  locale?: string
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
  fetch: {
    url: string;
    headers?: HeadersInit;
  };
};

export type ColumnFilterSettings = FilterText | FilterEnum | FilterReference;

export type ColumnFunctionalSettings = {
  sortable?: boolean;
  filter?: ColumnFilterSettings;
};

export type CellType = BaseCell | DateCell;

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
