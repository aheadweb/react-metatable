import { SORT_STATUSES } from "./table-features";

export enum BaseCellTypes {
  text = "text",
  number = "number",
  date = "date",
  reference = "reference",
}

export type BaseCell = {
  type: BaseCellTypes;
};

export type ReferenceCell = {
  type: BaseCellTypes.reference;
  fetch: {
    url: string;
    extraHeaders?: HeadersInit;
    paramsType: "path" | "query";
    fieldNameWithDataForFetching: string;
    fieldNameReceivedObject: string;
  };
};

export type DateCell = {
  type: BaseCellTypes.date;
  options?: Intl.DateTimeFormatOptions;
  locale?: string;
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
  fetch: {
    url: string;
    extraHeaders?: HeadersInit;
    fieldNameReceivedObject: string;
    fieldNameToFilterValue: string;
  };
};

export type ColumnFilterSettings = FilterText | FilterEnum | FilterReference;

export type ColumnFunctionalSettings = {
  sortable?: boolean;
  filter?: ColumnFilterSettings;
};

export type CellType = BaseCell | DateCell | ReferenceCell;

export interface TableMetaData {
  [columnName: string]: {
    cell: CellType;
  } & ColumnFunctionalSettings;
}

export interface HeaderModelSettings {
  sortIcon?: (sortStatus: keyof typeof SORT_STATUSES) => JSX.Element;
  filterIcon?: (filtered: boolean, isOpenDialog: boolean) => JSX.Element;
}

export interface TableOpenApi {
  setSort: (columnName: string, sortStatus: keyof typeof SORT_STATUSES) => void;
  setFilter: (
    columnName: string,
    filterValue: string | number | (string | number)[]
  ) => void;
  setPage: (pageNumber: number) => void 
}

export interface TableScheme<T extends Record<string, any>> {
  id: string;
  headerModel: (settings: HeaderModelSettings) => JSX.Element | null | string;
  bodyModel: ((tableData: T) => JSX.Element) | null;
}

export interface TableColumnsScheme {}
