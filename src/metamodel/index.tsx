import { TableMetaData, TableScheme } from "../types";
import { BaseFields } from "../components";
import { useEffect, useMemo } from "react";

const fieldsMap = Object.assign({}, BaseFields);

interface TableMetaModelProps {
  metaData: TableMetaData;
  locale?: Record<string, string>;
}

export const useGetTableColumns = <T extends {}>(
  props: TableMetaModelProps
): {
  columns: TableScheme<T>[]
} => {
  const { locale = {}, metaData } = props;
  return useMemo(
    () => ({
      columns: Object.entries(metaData).map(([columnName, cellSettings]) => ({
        id: columnName,
        headerModel: locale[columnName] || columnName,
        bodyModel: getColumnCell<T>(cellSettings),
      })),
    }),
    []
  );
};

const getColumnCell = <T extends {}>(cellSettings: TableMetaData["string"]) => {
  const Component = fieldsMap[cellSettings.type];
  if (!Component) return null;
  return (tableData: T) => <Component {...tableData} />;
};
