import { PlainObject } from "./types";

export const sliceDataViaPageSize = <T extends PlainObject>(
  data: T[],
  pageSize: number,
  page: number
) => data.slice((page - 1) * pageSize, pageSize * page);