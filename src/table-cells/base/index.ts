import React from "react";
import { TextCell } from "./text";
import { NumberCell } from "./number";
import { DateCell } from "./date";
import { ReferenceCell } from "./reference";

import { CacheProvider } from "../../providers";
import { BaseCellTypes } from "../../types";

export const BASE_FIELDS: Record<BaseCellTypes, (props: any) => JSX.Element> = {
  text: TextCell,
  number: NumberCell,
  date: DateCell,
  reference: (props) =>
    React.createElement(
      CacheProvider,
      {},
      React.createElement(ReferenceCell, { ...props })
    ),
};
