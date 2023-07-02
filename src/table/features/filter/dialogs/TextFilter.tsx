import React, { useState } from "react";
import { ColumnFilterSettings } from "../../../../types";

export const TextFilter = ({
  setFilter,
}: {
  filterSetting: ColumnFilterSettings,
  setFilter: (val: string) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const setFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    setInputValue(value);
    setFilter(value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      placeholder="Enter text"
      onChange={setFilterValue}
    />
  );
};
