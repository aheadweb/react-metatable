import React, { createContext, useContext, useEffect } from "react";
import { Utils } from "../utils";

const CacheContext = createContext<ReturnType<typeof Utils.createCacheMap>>(null!);

interface Props {}

const CACHE = Utils.createCacheMap();
export const CacheProvider = (props: React.PropsWithChildren<Props>) => {
  const { children } = props;

  return (
    <CacheContext.Provider value={CACHE}>{children}</CacheContext.Provider>
  );
};

export const useCellCache = () => useContext(CacheContext);
