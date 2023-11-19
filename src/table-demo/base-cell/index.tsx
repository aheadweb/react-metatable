import { useEffect, useState } from "react";
import { carModel } from "../../__mock__";
import { useGetTableColumns } from "../../table-metamodels";
import { MetaTable } from "../../table";

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

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <MetaTable<CarsData>
        pagination
        columns={columns} 
        data={data}
      />
    </>
  );
};
