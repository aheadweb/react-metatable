import { TableMetaData, BaseCellTypes, FilterTypes } from "../../types";

export const carsTableMetaData: TableMetaData = {
  carTitle: {
    filter: {
      type: FilterTypes.text,
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
