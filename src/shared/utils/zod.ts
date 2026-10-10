import z from "zod";

export const createSchema = <T>() => {
  return <S extends { [K in keyof T]: z.ZodType<T[K]> }>(shape: S) =>
    z.object(shape);
};
