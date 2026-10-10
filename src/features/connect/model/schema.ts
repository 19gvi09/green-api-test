import type { Instance } from "@green-api/whatsapp-api-client-js-v2";
import z from "zod";
import { createSchema } from "@/shared/utils";

export const schema = createSchema<Instance>()({
  idInstance: z
    .number({ error: "Введите ID инстанса!" }),
  apiTokenInstance: z.string().min(1, "Введите API-токен инстанса!"),
});

export type FormValues = z.infer<typeof schema>;
