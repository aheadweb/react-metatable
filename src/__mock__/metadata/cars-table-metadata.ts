import { TableMetaData, BaseCellTypes, FilterTypes } from "../../types";

export const carsTableMetaData: TableMetaData = {
  brand: {
    sortable: true,
    filter: {
      type: FilterTypes.Enum,
      options: ["Dodge", "Lincoln"],
    },
    cell: {
      type: BaseCellTypes.text,
    },
  },
  model: {
    filter: {
      type: FilterTypes.Text,
    },
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
  fuel_type: {
    filter: {
      type: FilterTypes.Reference,
      fetch: {
        fieldNameReceivedObject: "title",
        fieldNameToFilterValue: "id",
        url: "http://localhost:3000/carsFuelType",
      },
    },
    cell: {
      type: BaseCellTypes.reference,
      fetch: {
        paramsType: "path",
        fieldNameReceivedObject: "title",
        fieldNameWithDataForFetching: "fuel_type",
        url: "http://localhost:3000/carsFuelType",
      },
    },
  },
};
