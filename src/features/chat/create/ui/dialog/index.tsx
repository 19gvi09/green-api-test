"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { type FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcn/components/ui/dialog";
import { Field, FieldError } from "@/shared/shadcn/components/ui/field";
import { PhoneNumberInput } from "@/shared/ui";
import { type FormValues, schema, toChatId } from "../../model";

interface CreateChatDialogProps {
  onSuccess: (chatId: string) => void;
}

export const CreateChatDialog: FC<CreateChatDialogProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      reset();
    }
  };

  const submit = (values: FormValues) => {
    const chatId = toChatId(values.phoneNumber);
    onSuccess(chatId);
    handleOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Button onClick={() => setIsOpen(true)} size="sm" variant="secondary">
        <Plus />
        Добавить чат
      </Button>

      <DialogContent className="max-w-xs rounded-max-xl border-max-border bg-max-surface p-6 text-max-text shadow-max-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Добавить чат
          </DialogTitle>
          <DialogDescription className="text-max-text-secondary">
            Введите номер получателя в международном формате.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col items-center gap-16"
          onSubmit={handleSubmit(submit)}
        >
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative">
                <PhoneNumberInput
                  aria-invalid={fieldState.invalid}
                  aria-label="Номер телефона"
                  id={field.name}
                  name={field.name}
                  onBlur={field.onBlur}
                  onValueChange={field.onChange}
                  value={field.value}
                />
                <FieldError
                  className="absolute top-full left-0 mt-1"
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />
          <Button className="w-full" type="submit">
            Создать чат
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
