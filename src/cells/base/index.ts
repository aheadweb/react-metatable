import { TextCell } from "./text";
import { NumberCell } from "./number";
import { DateCell } from "./date";

import { BaseCellTypes } from "../../types";

export const BASE_FIELDS: Record<BaseCellTypes, (props: any) => JSX.Element> = {
  text: TextCell,
  number: NumberCell,
  date: DateCell,
};
