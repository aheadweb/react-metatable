import { useState } from "react";
import { TableStateFilterValue, useGetTableState } from "../../../../providers";
import { ColumnFilterSettings, FilterTypes } from "../../../../types";
import { TextFilter } from "./TextFilter";
import { EnumFilter } from "./EnumFilter";

interface Props {
  id: string;
  filterSetting: ColumnFilterSettings;
}

const FILTER_BODY_MAP = {
  [FilterTypes.Text]: TextFilter,
  [FilterTypes.Enum]: EnumFilter,
  [FilterTypes.Reference]: TextFilter,
};

export const FilterDialogFactory = (props: Props) => {
  const { filterSetting, id } = props;
  const [localeFilterValue, setLocaleFilterValue] =
    useState<TableStateFilterValue>("");
  const { setState, state } = useGetTableState();

  const [filteredColumnName] = Object.keys(state.filter);
  const hasFilerOnColumn = filteredColumnName === id;

  const clearFilter = () => {
    if (!hasFilerOnColumn) return;
    setState((prev) => ({ ...prev, filter: {} }));
  };

  const setFilterValue = () =>
    setState((prev) => ({
      ...prev,
      filter: { [id]: localeFilterValue },
    }));

  const FilterComponent = FILTER_BODY_MAP[filterSetting.type];
  const hasFilterValue = Array.isArray(localeFilterValue)
    ? localeFilterValue.length
    : localeFilterValue;

  return (
    <div className="filter-dialog">
      <div className="filter-dialog__body">
        <FilterComponent
          filterSetting={filterSetting}
          setFilter={setLocaleFilterValue}
        />
      </div>
      <div className="filter-dialog__footer">
        <button disabled={!hasFilterValue} onClick={setFilterValue}>
          filter
        </button>
        <button disabled={!hasFilerOnColumn} onClick={clearFilter}>
          clearFilter
        </button>
      </div>
    </div>
  );
};
