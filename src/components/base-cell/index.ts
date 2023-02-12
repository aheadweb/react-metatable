import { TextCell } from "./text";
import { NumberCell } from "./number";

import { BaseCellTypes } from "../../types";

export const BaseFields: Record<BaseCellTypes, (props: any) => JSX.Element> = {
  text: TextCell,
  number: NumberCell,
};
