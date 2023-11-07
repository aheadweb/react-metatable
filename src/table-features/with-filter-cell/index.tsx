import React, { useState } from "react";

import { TableState } from "../../providers";
import { ColumnFilterSettings } from "../../types";
import { FilterDialogFactory } from "./dialogs";

import "./index.css";
import { CloseFilterIcon, OpenFilterIcon } from "./icons";

const eventPreventDefault = (e: React.MouseEvent) => e.preventDefault();

const WithFilterFeature = ({
  id,
  filterSetting,
  cellValue,
}: {
  id: string;
  cellValue: string;
  filterSetting?: ColumnFilterSettings;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!cellValue) return null;

  const toggleFilterBody = () => {
    setIsOpen((prev) => !prev);
  };

  if (!filterSetting) return null

  return (
    <details className="filter-cell" open={isOpen}>
      <summary onClick={eventPreventDefault} className="filter-cell__content">
        <span className="filter-cell__value">{cellValue}</span>
        <span onClick={toggleFilterBody} className="filter-cell__button">
          {!isOpen ? <OpenFilterIcon /> : <CloseFilterIcon />}
        </span>
      </summary>
      {isOpen && (
        <div className="filter-cell__body">
          <FilterDialogFactory id={id} filterSetting={filterSetting} />
        </div>
      )}
    </details>
  );
};

export function filterTableData<T extends Record<string, any>>(
  state: TableState,
  data: T[]
) {
  const [filterKey] = Object.keys(state.filter);
  if (!filterKey) return data;
  const filterValue = state.filter[filterKey];
  if (Array.isArray(filterValue))
    return filterByArrayValue(data, filterValue, filterKey);
  return filterByValue(data, filterValue, filterKey);
}

function filterByArrayValue<T extends Record<string, any>>(
  data: T[],
  value: (number | string)[],
  filterKey: string
) {
  const filterValue = value.map((v) => String(v).toLocaleLowerCase());
  return data.filter((row) => {
    const dataValue = row[filterKey];
    if (!dataValue) return true;
    const safeValue = String(dataValue).toLocaleLowerCase();
    return filterValue.includes(safeValue);
  });
}

function filterByValue<T extends Record<string, any>>(
  data: T[],
  value: number | string,
  filterKey: string
) {
  const filterValue = String(value).toLocaleLowerCase();
  return data.filter((row) => {
    const dataValue = row[filterKey];
    if (!dataValue) return true;
    const safeValue = String(dataValue).toLocaleLowerCase();
    return safeValue.includes(filterValue);
  });
}

const WithFilterFeatureMemo = React.memo(WithFilterFeature);
export { WithFilterFeatureMemo as WithFilterCell };
