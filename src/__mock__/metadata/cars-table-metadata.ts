import { TableMetaData, BaseCellTypes } from "../../types";

export const carsTableMetaData: TableMetaData = {
  carTitle: {
    type: BaseCellTypes.text,
  },
  modelName: {
    type: BaseCellTypes.text,
  },
  price: {
    type: BaseCellTypes.number,
  },
};
