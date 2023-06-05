export class Utils {
  static pipeline<T extends (...params: any[]) => any>(...fns: T[]) {
    return (...args: unknown[]) => {
      return fns.reduce((prev, fnResult) => {
        return fnResult.apply(null, Array.isArray(prev) ? prev : [prev]);
      }, args);
    };
  }
}
