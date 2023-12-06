import { useMemo, useState } from "react";
import { useGetTableState } from "../../../providers";
import {
  ColumnFilterSettings,
  FilterTypes,
  HeaderModelSettings,
  NonUndefined,
  TableStateFilterValue,
} from "../../../types";
import { TextFilter } from "./TextFilter";
import { EnumFilter } from "./EnumFilter";
import { ReferenceFilter } from "./ReferenceFilter";

interface Props {
  id: string;
  filterSetting: ColumnFilterSettings;
  customDD?: NonUndefined<HeaderModelSettings["filter"]>["filterDD"];
  toggleFilterBody: () => void;
}

const FILTER_BODY_MAP = {
  [FilterTypes.Text]: TextFilter,
  [FilterTypes.Enum]: EnumFilter,
  [FilterTypes.Reference]: ReferenceFilter,
};

export const FilterDialogFactory = (props: Props) => {
  const { filterSetting, id, customDD, toggleFilterBody } = props;
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

  const customFilterDD = useMemo(() => {
    return (
      customDD &&
      customDD({
        close: toggleFilterBody,
        confirm: (val: TableStateFilterValue) =>
          setState((prev) => ({
            ...prev,
            filter: { [id]: val },
          })),
      })
    );
  }, []);

  const FilterComponent = useMemo(
    () => FILTER_BODY_MAP[filterSetting.type],
    [filterSetting.type]
  );

  const hasFilterValue = Array.isArray(localeFilterValue)
    ? localeFilterValue.length
    : localeFilterValue;

  return (
    <div className="filter-dialog">
      {customFilterDD || (
        <>
          <div className="filter-dialog__body">
            <FilterComponent
              filterSetting={filterSetting}
              setFilter={setLocaleFilterValue}
            />
          </div>
          <div className="filter-dialog__footer">
            <button
              className="filter-dialog__footer-action"
              disabled={!hasFilterValue}
              onClick={setFilterValue}
            >
              filter
            </button>
            <button
              className="filter-dialog__footer-action"
              disabled={!hasFilerOnColumn}
              onClick={clearFilter}
            >
              clearFilter
            </button>
          </div>
        </>
      )}
    </div>
  );
};
