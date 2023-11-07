import React from "react";
import { BaseCell } from "../../../types";

interface TextCellProps extends BaseCell {
  value: string;
}

export const TextCell = (props: TextCellProps) => {
  return <div>{props.value}</div>;
};
