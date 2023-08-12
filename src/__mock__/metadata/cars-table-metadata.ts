import { carsData } from "../table-data";
import { TableMetaData, BaseCellTypes, FilterTypes } from "../../types";

const CAR_TITLES = carsData.map(({ brand }) => brand);

export const carsTableMetaData: TableMetaData = {
  brand: {
    filter: {
      type: FilterTypes.Enum,
      options: CAR_TITLES,
    },
    sortable: true,
    cell: {
      type: BaseCellTypes.text,
    },
  },
  model: {
    cell: {
      type: BaseCellTypes.text,
    },
  },
  price: {
    sortable: true,
    cell: {
      type: BaseCellTypes.number,
    },
  },
};
