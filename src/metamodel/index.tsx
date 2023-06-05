import {
  CellType,
  ColumnFunctionalSettings,
  TableMetaData,
  TableScheme,
} from "../types";
import { BaseFields } from "../components";
import { useMemo } from "react";
import { WithSortableFunction } from "../components/table/withSortableFunctional";

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

/**
const HeaderCellModel = Utils.pipeline(
  columnsSetting.sortable ? WithSortableFunction : (a) => a,
  columnsSetting.filter ? WithSortableFunction : (a) => a
)(cellValue);

 */
const getTableHeaderCell = (
  id: string,
  cellValue: string,
  columnsSetting: ColumnFunctionalSettings
) => {
  const Component = () =>
    columnsSetting.sortable ? (
      <WithSortableFunction id={id} cellValue={cellValue} />
    ) : (
      <>{cellValue}</>
    );
  if (!Component) return null;
  return <Component />;
};

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
