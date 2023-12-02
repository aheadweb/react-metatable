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

  static isFunction = (fn: unknown): fn is Function => typeof fn === "function";
}
