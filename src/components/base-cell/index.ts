import { TextCell } from "./Text";
import { NumberCell } from "./Number";

import { BaseCellTypes } from "../../types";

export const BaseFields: Record<BaseCellTypes, (props: any) => JSX.Element> = {
  text: TextCell,
  number: NumberCell,
};
