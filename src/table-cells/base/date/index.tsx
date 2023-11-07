import { useMemo } from "react";
import { DateCell as DateCellType } from "../../../types";

interface TimeCellProps extends DateCellType {
  value: string | number;
}

const DEFAULT_LOCALE = "en-US";
const getUserLocale = () => window?.navigator?.language || DEFAULT_LOCALE;

export const DateCell = (props: TimeCellProps) => {
  const locale: Intl.LocalesArgument = useMemo(
    () => props.locale || getUserLocale(),
    []
  );

  const date = new Date(props.value);
  const isValidDate = date instanceof Date && !isNaN(date?.getTime());

  return (
    <div>
      {isValidDate
        ? date.toLocaleDateString(locale, props.options || {})
        : "-"}
    </div>
  );
};
