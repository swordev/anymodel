export type CustomDirectiveValue = string | number | undefined | null | false;
export type CustomDirectiveSpec = {
  [key in `$${string}`]?: CustomDirectiveValue[] | CustomDirectiveValue;
};

export {};
