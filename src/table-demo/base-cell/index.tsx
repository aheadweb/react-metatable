import { useEffect, useRef, useState } from "react";
import { carModel } from "../../__mock__";
import { useGetTableColumns } from "../../table-metamodels";
import { MetaTable } from "../../table";
import { TableOpenApi } from "../../types";

interface CarsData {
  fuel_type: string;
  brand: string;
  model: string;
  year: number;
}

export const BaseCellExample = () => {
  const [data, setData] = useState<CarsData[]>([]);
  const { columns } = useGetTableColumns<CarsData>({
    metaData: carModel.carsTableMetaData,
    locale: carModel.carsDataLocale.ru,
  });
  const tableApi = useRef<TableOpenApi>(null!);

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <MetaTable<CarsData>
      tableApi={tableApi}
      pagination
      columns={columns}
      data={data}
    />
  );
};
