import { carsData, carsTableMetaData, carsDataLocale } from "../../__mock__";
import { useGetTableColumns } from "../../metamodel";
import { BaseMetaTable } from "../../components";

export const BaseCellExample = () => {
  const { columns } = useGetTableColumns<typeof carsData[0]>({
    metaData: carsTableMetaData,
    locale: carsDataLocale.ru,
  });

  return <BaseMetaTable columns={columns} data={carsData} />;
};
