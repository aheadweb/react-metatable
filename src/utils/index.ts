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
}
