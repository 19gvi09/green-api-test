import z from "zod";

const phoneNumberPattern = /^\+[1-9]\d{7,14}$/;

export const normalizePhoneNumber = (phoneNumber: string) =>
  `+${phoneNumber.replace(/\D/g, "")}`;

export const toChatId = (phoneNumber: string) => `${phoneNumber.slice(1)}@c.us`;

export const schema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Введите номер телефона!")
    .refine(
      (value) => value.startsWith("+"),
      "Укажите номер с кодом страны, например +7!",
    )
    .transform(normalizePhoneNumber)
    .refine(
      (value) => phoneNumberPattern.test(value),
      "Введите корректный номер в международном формате!",
    ),
});

export type FormValues = z.infer<typeof schema>;
