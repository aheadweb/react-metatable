import {
  CellType,
  ColumnFunctionalSettings,
  TableMetaData,
  TableScheme,
} from "../types";
import { BaseFields } from "../components";
import { useMemo } from "react";
import { WithSortableFunction } from "../components/table/withSortableFunctional";
import { Utils } from "../utils";

const fieldsMap = Object.assign({}, BaseFields);

interface TableMetaModelProps {
  metaData: TableMetaData;
  locale?: Record<string, string>;
}

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
      ? (val: string) => <WithSortableFunction id={id} cellValue={val} />
      : (a: any) => <>{a}</>
  )(cellValue) as unknown as JSX.Element;

const getColumnCell = <T extends Record<string, any>>(
  columnName: string,
  cellSettings: CellType
) => {
  const Component = fieldsMap[cellSettings.type];
  if (!Component) return null;
  return (tableData: T) => (
    <Component value={tableData[columnName] || undefined} />
  );
};
