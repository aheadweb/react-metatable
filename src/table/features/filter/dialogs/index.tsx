import { useCallback } from "react";
import { useGetTableState } from "../../../../providers";
import { FilterTypes } from "../../../../types";
import { TextFilterDialog } from "./TextFilter";

interface Props {
  id: string;
  filterType: FilterTypes;
}

const FILTER_BODY_MAP = {
  [FilterTypes.text]: TextFilterDialog,
  [FilterTypes.enum]: TextFilterDialog,
  [FilterTypes.reference]: TextFilterDialog,
};

export const FilterDialogFactory = (props: Props) => {
  const { filterType, id } = props;
  const { setState, state } = useGetTableState();

  const [filteredColumnName] = Object.keys(state.filter);
  const hasFilerOnColumn = filteredColumnName === id;

  const clearFilter = () => {
    if (!hasFilerOnColumn) return;
    setState((prev) => ({ ...prev, filter: {} }));
  };

  const setFilterValue = useCallback((value: string | number) => {
    setState((prev) => ({ ...prev, filter: { [id]: value } }));
  }, []);

  const FilterComponent = FILTER_BODY_MAP[filterType];

  return (
    <FilterComponent
      filterEnable={hasFilerOnColumn}
      setFilter={setFilterValue}
      clearFilter={clearFilter}
    />
  );
};
