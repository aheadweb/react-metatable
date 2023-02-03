import React, { useEffect } from "react";
import { carsData, carsTableMetaData } from "./__mock__";

import { useGetTableColumns } from "./metamodel";
import { BaseMetaTable } from "./components";

const App = () => {
  const { columns } = useGetTableColumns<typeof carsData[0]>({ metaData: carsTableMetaData });

  return (
    <BaseMetaTable<typeof carsData[0]> columns={columns} data={carsData} />
  );
};

export { BaseMetaTable, useGetTableColumns, App };
