import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ColumnFilterSettings,
  FilterTypes,
  FilterReference,
  FilterEnum,
} from "../../../../types";
import { EnumFilter } from "./EnumFilter";
import { Utils } from "../../../../utils";

const isReferenceFilter = (
  filterSettings: ColumnFilterSettings
): filterSettings is FilterReference =>
  FilterTypes.Reference === filterSettings.type;

export const ReferenceFilter = ({
  filterSetting,
  setFilter,
}: {
  filterSetting: ColumnFilterSettings;
  setFilter: (val: (string | number)[]) => void;
}) => {
  const cacheData = useRef<Record<string, any>[]>();
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!isReferenceFilter(filterSetting) || options.length) return;
    const url = new URL(filterSetting.fetch.url);
    Utils.request(url)
      .then((data: Record<string, any>[]) => {
        cacheData.current = data;
        setOptions(
          data.map((item) => item[filterSetting.fetch.fieldNameReceivedObject])
        );
      })
      .catch(console.error);
  }, []);

  const filterSettingEnum: FilterEnum = useMemo(
    () => ({
      type: FilterTypes.Enum,
      options,
    }),
    [options]
  );

  const setEnumValue = (value: (string | number)[]) => {
    if (!isReferenceFilter(filterSetting) || !cacheData.current) return;
    const filterValue = cacheData.current
      .filter((item) => {
        const valueFromFilter =
          item[filterSetting.fetch.fieldNameReceivedObject];
        return value.includes(valueFromFilter);
      })
      .map((item) => item[filterSetting.fetch.fieldNameToFilterValue]);

    setFilter(filterValue);
  };

  if (!isReferenceFilter(filterSetting) || !options.length) return null;

  return (
    <EnumFilter filterSetting={filterSettingEnum} setFilter={setEnumValue} />
  );
};
