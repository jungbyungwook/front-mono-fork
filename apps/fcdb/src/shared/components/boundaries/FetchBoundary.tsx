import { JSX } from "react";

type PromiseValues = readonly (() => Promise<unknown>)[] | [];

type PromiseAllAwaitedReturnType<T extends PromiseValues> = {
  -readonly [K in keyof T]: Awaited<ReturnType<T[K]>>;
};

type Props<T extends PromiseValues> = {
  fetchFunctions: T;
  children: (results: PromiseAllAwaitedReturnType<T>) => JSX.Element;
};

export const FetchBoundary = async <T extends PromiseValues>({
  fetchFunctions,
  children,
}: Props<T>) => {
  const results = (await Promise.all(
    fetchFunctions.map((fetchFunction) => fetchFunction())
  )) as PromiseAllAwaitedReturnType<T>;

  return children(results);
};
