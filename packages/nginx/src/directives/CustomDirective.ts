export type CustomDirectiveSpec = {
  [key in `$${string}`]?: string;
};

export {};
