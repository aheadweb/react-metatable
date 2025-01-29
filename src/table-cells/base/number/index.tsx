import React from "react";
import { BaseCell } from "../../../types";

interface NumberCellProps extends BaseCell {
  value: number;
}

export const NumberCell = ({ value }: NumberCellProps) => {
  return <>{value}</>;
};
