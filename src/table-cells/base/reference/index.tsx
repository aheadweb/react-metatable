import React, { useEffect, useState } from "react";
import { ReferenceCell as ReferenceCellType } from "../../../types";
import { Utils } from "../../../utils";
import { useCellCache } from "../../../providers";

type Entity = Record<string, unknown> | undefined;

interface ReferenceCellProps {
  tableData: Record<string, unknown>;
  cellSettings: ReferenceCellType;
}

export const ReferenceCell = (props: ReferenceCellProps) => {
  const {
    cellSettings: { fetch },
    tableData,
  } = props;

  const [entity, setEntity] = useState<Entity>(undefined);
  const cache = useCellCache();
  useEffect(() => {
    const isPathParams = fetch.paramsType === "path";
    const paramValue = String(tableData[fetch.fieldNameWithDataForFetching]);
    const actualPath = isPathParams ? `${fetch.url}/${paramValue}` : fetch.url;
    const url = new URL(actualPath);

    if (!isPathParams) {
      url.searchParams.append(fetch.fieldNameWithDataForFetching, paramValue);
    }

    const cachedValue = cache.get<Entity>(url.href);

    if (cachedValue) {
      setEntity(cachedValue);
      return;
    }

    Utils.request(url, { headers: fetch.extraHeaders })
      .then((entity) => {
        cache.set(url.href, entity);
        setEntity(entity);
      })
      .catch(console.error);
  }, []);

  const cellValue = entity
    ? String(entity[fetch.fieldNameReceivedObject])
    : "-";

  return <div>{cellValue}</div>;
};
