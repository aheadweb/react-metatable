import { usePagination } from "../../hooks";
import { PaginationConfig, DOTS } from "../../hooks/usePagination";

export interface PaginationProps extends PaginationConfig {
  onChangePage: (pageIndex: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { onChangePage, ...rest } = props;
  const paginationRange = usePagination(rest);

  return (
    <ul className="pagination">
      {paginationRange.map((paginationItem) => {
        if (typeof paginationItem === "string")
          return (
            <li key={paginationItem} className="pagination__item">
              {paginationItem}
            </li>
          );

        return (
          <li
            key={paginationItem}
            className="pagination__item"
            onClick={() => onChangePage(paginationItem)}
          >
            {paginationItem}
          </li>
        );
      })}
    </ul>
  );
};
