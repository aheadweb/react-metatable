import React, { useCallback } from "react";
import { TableBodyCell } from "..";
import { ArrowDownIcon } from "../icons";
import { TableProps } from "../../table";
import { Utils } from "../../../utils";

interface Props {
  rowId: string;
  isExpandRow: boolean;
  isOpen: boolean;
  expandable?: TableProps<any>["expandable"];
  toggleExpandRow: (value: React.SetStateAction<(string | number)[]>) => void;
}

const ARROW_STYLE = { transform: "rotate(180deg)" };

export const ExpandColumn = (props: Props) => {
  const { rowId, toggleExpandRow, isExpandRow, isOpen, expandable } = props;

  const handleOnClick = useCallback(() => {
    toggleExpandRow((prev) => {
      const has = prev.includes(rowId);
      return has ? prev.filter((id) => id !== rowId) : [...prev, rowId];
    });
  }, [rowId]);

  if (!isExpandRow)
    return <TableBodyCell className="meta-table__body-cell-expand-toggle" />;

  const expandIcon = Utils.isFunction(expandable?.expandIcon) ? (
    expandable?.expandIcon(isOpen)
  ) : (
    <ArrowDownIcon style={isOpen ? ARROW_STYLE : undefined} />
  );

  return (
    <TableBodyCell
      onClick={handleOnClick}
      className="meta-table__body-cell-expand-toggle"
    >
      <div className="meta-table__cell-content-wrapper">{expandIcon}</div>
    </TableBodyCell>
  );
};
