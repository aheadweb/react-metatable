import React from "react";
import { useGetTableColumns } from "./metamodel";
import { carsData, carsTableMetaData } from "./__mock__";

function App() {
  const { columns } = useGetTableColumns<typeof carsData[0]>(carsTableMetaData);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((columns) => {
              return <th key={columns.headerModel}>{columns.headerModel}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {carsData.map((rowData) => {
            return (
              <tr>
                {columns.map((column) => {
                  return (
                    <td>{column.bodyModel && column.bodyModel(rowData)}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export { App };