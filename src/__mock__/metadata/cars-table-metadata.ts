import { carsData } from "../table-data";
import { TableMetaData, BaseCellTypes, FilterTypes } from "../../types";

const CAR_TITLES = carsData.map(({ carTitle }) => carTitle);

export const carsTableMetaData: TableMetaData = {
  carTitle: {
    filter: {
      type: FilterTypes.Enum,
      options: CAR_TITLES,
    },
    sortable: true,
    cell: {
      type: BaseCellTypes.text,
    },
  },
  modelName: {
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
