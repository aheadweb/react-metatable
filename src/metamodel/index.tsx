import { TableMetaData, TableScheme } from "../types";
import { BaseFields } from "../components";

const fieldsMap = Object.assign({}, BaseFields);

const tableMetaModel = <T extends {}>(
  tableMetaData: TableMetaData
): TableScheme<T>[] => {
  return Object.entries(tableMetaData).map(([columnName, cellSettings]) => ({
    headerModel: columnName,
    bodyModel: getColumnCell<T>(cellSettings),
  }));
};

export const useGetTableColumns = <T extends {}>(metaData: TableMetaData) => {
  return { 
    columns: tableMetaModel<T>(metaData),
  };
};

const getColumnCell = <T extends {}>(cellSettings: TableMetaData["string"]) => {
  const Component = fieldsMap[cellSettings.type];
  if (!Component) return null;
  return (tableData: T) => <Component {...tableData} />;
};
