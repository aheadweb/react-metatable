import React, { useState } from "react";
import { TableState, useGetTableState } from "../../../providers";
import { ColumnFilterSettings, FilterTypes } from "../../../types";

const FILTER_BODY_MAP = {
  [FilterTypes.text]: TextFilterDialog,
  [FilterTypes.enum]: TextFilterDialog,
  [FilterTypes.reference]: TextFilterDialog,
};

const WithFilterFeature = ({
  id,
  filterType,
  cellValue,
}: {
  id: string;
  cellValue: string;
  filterType: ColumnFilterSettings;
}) => {
  const { state, setState } = useGetTableState();
  const [isOpen, setIsOpen] = useState(false);
  if (!cellValue) return null;

  const [filteredColumnName] = Object.keys(state.filter);
  const hasFilerOnColumn = filteredColumnName === id;

  const clearFilter = () => {
    if (!hasFilerOnColumn) return;
    setState((prev) => ({ ...prev, filter: {} }));
  };

  const toggleFilterBody = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const FilterBody = FILTER_BODY_MAP[filterType.type];

  return (
    <details open={isOpen}>
      <summary onClick={toggleFilterBody}>
        {cellValue}
        <span onClick={clearFilter}>{!hasFilerOnColumn ? "≡" : "x"}</span>
      </summary>
      {isOpen && <FilterBody id={id} />}
    </details>
  );
};

function TextFilterDialog({ id }: { id: string }) {
  const { setState } = useGetTableState();
  const [inputValue, setInputValue] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, filter: { [id]: inputValue } }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={inputValue}
        placeholder="Enter text"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">search</button>
    </form>
  );
}

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
