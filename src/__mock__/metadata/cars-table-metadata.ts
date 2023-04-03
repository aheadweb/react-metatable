import { TableMetaData, BaseCellTypes } from "../../types";

export const carsTableMetaData: TableMetaData = {
  carTitle: {
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
