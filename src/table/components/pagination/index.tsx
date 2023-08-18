import { useState } from "react";
import { usePagination } from "../../../hooks";
import { PaginationConfig } from "../../../hooks/usePagination";
import { Menu, MenuItem } from "../../../shared/menu";

import { ArrowDownIcon } from "./icons";

interface PaginationProps extends PaginationConfig {
  onChangePage: (pageIndex: number) => void;
  onPageSizeChange: (size: number) => void;
}

const DEFAULT_PAGE_SIZES = [10, 25, 50];
const DEFAULT_SETTINGS = {
  pageSize: 10,
};

const defaultPageSizeOptions = DEFAULT_PAGE_SIZES.map((size) => ({
  value: size,
  title: size,
}));

export const Pagination = (props: PaginationProps) => {
  const {
    onChangePage,
    onPageSizeChange,
    currentPage,
    pageSize: defaultPageSize,
    totalCount,
  } = props;

  const [pageSize, setPageSize] = useState(
    defaultPageSize || DEFAULT_SETTINGS.pageSize
  );

  const paginationRange = usePagination({ currentPage, totalCount, pageSize });

  const handlePageSizeChange = ({ value }: MenuItem) => {
    if (typeof value !== "number") return;
    setPageSize(value);
    onPageSizeChange(value);
  };

  return (
    <div className="pagination">
      <div className="pagination__page-size-selector">
        <Menu
          titlePrefix={<ArrowDownIcon />}
          onChange={handlePageSizeChange}
          defaultValue={pageSize}
          options={defaultPageSizeOptions}
        />
      </div>
      <ul className="pagination__items">
        {paginationRange.map((paginationItem, index) => {
          const isActiveItem = props.currentPage === paginationItem;
          if (typeof paginationItem === "string")
            return (
              <li key={paginationItem + index} className="pagination__item">
                {paginationItem}
              </li>
            );

          return (
            <li
              key={paginationItem}
              className={`pagination__item ${
                isActiveItem ? "pagination__item--active" : ""
              }`}
              onClick={() => onChangePage(paginationItem)}
            >
              {paginationItem}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
