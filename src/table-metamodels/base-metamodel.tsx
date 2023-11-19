import React, { useMemo } from "react";

import {
  CellType,
  ColumnFilterSettings,
  ColumnFunctionalSettings,
  TableMetaData,
  TableScheme,
  HeaderModelSettings,
} from "../types";
import { Utils } from "../utils";
import { FIELDS_MAP } from "../table-cells";

import { WithFilterCell, WithSortCell } from "../table-features";

interface TableMetaModelProps {
  metaData: TableMetaData;
  locale?: Record<string, string>;
}

const identity = (a: any) => <>{a}</>;

const getComponentName = (component: (props: any) => any) =>
  "displayName" in component ? component.displayName : "";

const isSortableOrFilterComponent = (componentName: string) =>
  ["WithFilterCell", "WithSortCell"].includes(componentName);

const isSortComponent = (componentName: string) =>
  componentName === "WithSortCell";

const setIconIfNeed = (
  componentName: string,
  settings: HeaderModelSettings,
  headerProps: Record<string, any>
) => {
  if (!isSortableOrFilterComponent(componentName)) return;
  headerProps.icon = isSortComponent(componentName)
    ? settings.sortIcon
    : settings.filterIcon;
};

const featuresNameToComponent: Record<
  keyof ColumnFunctionalSettings,
  (props: {
    id: string;
    cellValue: string;
    filterSetting?: ColumnFilterSettings;
  }) => any
> = {
  filter: WithFilterCell,
  sortable: WithSortCell,
};

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
) => {
  return (settings: HeaderModelSettings) =>
    Utils.pipeline(
      ...Object.entries(columnsSetting).map((values) => {
        const [fieldName, value] = values;
        const fieldAsString = fieldName as keyof ColumnFunctionalSettings;
        const columnSettings = columnsSetting[fieldAsString];
        if (!value) return identity;

        const FeatureComponent = featuresNameToComponent[fieldAsString];
        const headerModelData: Record<string, any> = {};

        Utils.pipeline(setIconIfNeed)(
          getComponentName(FeatureComponent),
          settings,
          headerModelData
        );

        return (val: string) =>
          React.cloneElement(
            <FeatureComponent
              filterSetting={
                typeof columnSettings === "boolean" ? undefined : columnSettings
              }
              cellValue={val}
              id={id}
            />,
            { ...headerModelData }
          );
      })
    )(cellValue) as unknown as JSX.Element;
};

const getColumnCell = <T extends Record<string, any>>(
  columnName: string,
  cellSettings: CellType
) => {
  const Component = FIELDS_MAP[cellSettings.type];
  if (!Component) return null;
  return (tableData: T) => (
    <Component
      cellSettings={cellSettings}
      tableData={tableData}
      value={tableData[columnName] || undefined}
    />
  );
};
