"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useApiContext } from "@/shared/api";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Field } from "@/shared/shadcn/components/ui/field";
import { Textarea } from "@/shared/shadcn/components/ui/textarea";
import { toast } from "@/shared/shadcn/components/ui/toast";
import { type FormValues, schema } from "../../model";

interface ChatSendMessageFormProps {
  chatId: string;
  onSent: (message: { id: string; text: string }) => void;
}

export const ChatSendMessageForm: FC<ChatSendMessageFormProps> = ({
  chatId,
  onSent,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: "",
      chatId,
    },
  });
  const { client } = useApiContext();

  const submit = async ({ message }: FormValues) => {
    if (!client) {
      return;
    }
    try {
      const response = await client.sendMessage({ chatId, message });
      onSent({ id: response.idMessage, text: message });
      reset({ chatId, message: "" });
    } catch {
      toast.add({
        description:
          "Что-то пошло не так, проверьте введенные данные или повторите попытку позже.",
        priority: "high",
        title: "Не удалось отправить сообщение",
        type: "error",
      });
    }
  };

  return (
    <form className="flex items-center gap-4" onSubmit={handleSubmit(submit)}>
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <Field className="relative">
            <Textarea
              {...field}
              className="min-h-11 max-h-32 resize-none overflow-y-auto"
              id={field.name}
              placeholder="Введите сообщение"
            />
          </Field>
        )}
      />
      <Button
        aria-label="Отправить сообщение"
        disabled={isSubmitting}
        size="icon"
        type="submit"
      >
        <SendHorizontal />
      </Button>
    </form>
  );
};
