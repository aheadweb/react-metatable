import React, { useState } from "react";

import { TableState } from "../../../providers";
import { ColumnFilterSettings } from "../../../types";
import { FilterDialogFactory } from "./dialogs";

import "./index.css";

const eventPreventDefault = (e: React.MouseEvent) => e.preventDefault();

const WithFilterFeature = ({
  id,
  filterType,
  cellValue,
}: {
  id: string;
  cellValue: string;
  filterType: ColumnFilterSettings;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!cellValue) return null;

  const toggleFilterBody = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <details className="filter-cell" open={isOpen}>
      <summary onClick={eventPreventDefault} className="filter-cell__content">
        <span className="filter-cell__value">{cellValue}</span>
        <span onClick={toggleFilterBody} className="filter-cell__button">
          {!isOpen ? "≡" : "x"}
        </span>
      </summary>
      {isOpen && (
        <div className="filter-cell__body">
          <FilterDialogFactory id={id} filterType={filterType.type} />
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
  const filterValue = String(state.filter[filterKey]).toLocaleLowerCase();
  return data.filter((row) => {
    const dataValue = String(row[filterKey]).toLocaleLowerCase();
    if (!dataValue) return true;
    return dataValue.includes(filterValue);
  });
}

const WithFilterFeatureMemo = React.memo(WithFilterFeature);
export { WithFilterFeatureMemo as WithFilterFeature };
