import { useMemo } from "react";

import {
  CellType,
  ColumnFunctionalSettings,
  TableMetaData,
  TableScheme,
} from "../types";
import { Utils } from "../utils";
import { FIELDS_MAP } from "../cells";

import { TableSortFeature } from "../table/features";

interface TableMetaModelProps {
  metaData: TableMetaData;
  locale?: Record<string, string>;
}

const identity = (a: any) => <>{a}</>;

export const useGetTableColumns = <T extends {}>(
  props: TableMetaModelProps
): {
  columns: TableScheme<T>[];
} => {
  const { locale = {}, metaData } = props;

  return useMemo(
    () => ({
      columns: Object.entries(metaData).map(([columnName, columnSettings]) => {
        const { cell: cellSettings, ...functionalSettings } = columnSettings;
        return {
          id: columnName,
          headerModel: getTableHeaderCell(
            columnName,
            locale[columnName] || columnName,
            functionalSettings
          ),
          bodyModel: getColumnCell<T>(columnName, cellSettings),
        };
      }),
    }),
    []
  );
};

const getTableHeaderCell = (
  id: string,
  cellValue: string,
  columnsSetting: ColumnFunctionalSettings
) =>
  Utils.pipeline(
    columnsSetting.sortable
      ? (val: string) => (
          <TableSortFeature.WithSortFeature id={id} cellValue={val} />
        )
      : identity
  )(cellValue) as unknown as JSX.Element;

const getColumnCell = <T extends Record<string, any>>(
  columnName: string,
  cellSettings: CellType
) => {
  const Component = FIELDS_MAP[cellSettings.type];
  if (!Component) return null;
  return (tableData: T) => (
    <Component value={tableData[columnName] || undefined} />
  );
};
