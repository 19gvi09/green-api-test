import type { SendMessage } from "@green-api/whatsapp-api-client-js-v2";
import z from "zod";
import { createSchema } from "@/shared/utils";

export const schema = createSchema<SendMessage>()({
  chatId: z.string().min(1, "Обязательное поле!"),
  message: z.string().min(1, "Введите сообщение!"),
});

export type FormValues = z.infer<typeof schema>;
