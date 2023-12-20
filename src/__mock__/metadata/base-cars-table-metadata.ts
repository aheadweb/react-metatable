import { TableMetaData, BaseCellTypes } from "../../types";

export const baseCarsTableMetaData: TableMetaData = {
  brand: {
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
    cell: {
      type: BaseCellTypes.number,
    },
  },
};
