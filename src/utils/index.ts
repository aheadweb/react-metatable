export class Utils {
  static pipeline<T extends (...params: any[]) => any>(...fns: T[]) {
    return (...args: unknown[]) =>
      fns.reduce(
        (prev, fnResult) =>
          fnResult.apply(null, Array.isArray(prev) ? prev : [prev]),
        args
      );
  }

  static range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
  }

  static async request(url: URL, options?: RequestInit) {
    const response = await fetch(url, options);

    if (response.status !== 200) throw new Error(response.statusText);
    return await response.json();
  }

  static isFunction(fn: unknown): fn is Function {
    return typeof fn === "function";
  }

  static createCacheMap() {
    const MAX_CACHE_SIZE = 10;
    const CACHE = new Map<string, any>();

    return {
      set<T>(key: string, value: T) {
        CACHE.set(key, value);
      },
      get: <T>(key: string): T | undefined => CACHE.get(key),
      clear: () => CACHE.clear(),
    };
  }
}
