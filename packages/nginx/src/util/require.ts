export function include<T>(path: string) {
  return require(path) as T;
}
