export class Utils {
  static pipeline<T extends (...params: any[]) => any>(...fns: T[]) {
    return (...args: unknown[]) =>
      fns.reduce(
        (prev, fnResult) =>
          fnResult.apply(null, Array.isArray(prev) ? prev : [prev]),
        args
      );
  }
}
