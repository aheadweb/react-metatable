import { useEffect, useState } from "react";
import { carsTableMetaData, carsDataLocale } from "../../__mock__";
import { useGetTableColumns } from "../../metamodel";
import { BaseMetaTable } from "../../table";

interface CarsData {
  fuel_type: string;
  brand: string;
  model: string;
  year: number;
}

export const BaseCellExample = () => {
  const [data, setData] = useState<CarsData[]>([]);
  const { columns } = useGetTableColumns<CarsData>({
    metaData: carsTableMetaData,
    locale: carsDataLocale.ru,
  });

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <BaseMetaTable<CarsData> pagination columns={columns} data={data} />
    </>
  );
};
