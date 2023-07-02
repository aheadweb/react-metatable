import React, { useState } from "react";
import {
  ColumnFilterSettings,
  FilterTypes,
  FilterEnum,
} from "../../../../types";

const isEnumFilter = (
  filterSettings: ColumnFilterSettings
): filterSettings is FilterEnum => FilterTypes.Enum === filterSettings.type;

export const EnumFilter = ({
  filterSetting,
  setFilter,
}: {
  filterSetting: ColumnFilterSettings;
  setFilter: (val: (string | number)[]) => void;
}) => {
  const [selectedInputValue, setSelectInputValue] = useState<string[]>([]);
  const setFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;

    const filterValue = !selectedInputValue.includes(value)
      ? [...selectedInputValue, value]
      : selectedInputValue.filter((val) => val !== value);

    setSelectInputValue(filterValue);
    setFilter(filterValue);
  };

  if (!isEnumFilter(filterSetting)) return null;

  console.log(selectedInputValue);

  return (
    <div className="filter-enum">
      {filterSetting.options.map((val) => (
        <label className="filter-enum__label" key={val}>
          <input
            className="filter-enum__input"
            checked={selectedInputValue.includes(String(val))}
            onChange={setFilterValue}
            name="enum-checkboxes-filter"
            value={val}
            type="checkbox"
          />
          {val}
        </label>
      ))}
    </div>
  );
};
