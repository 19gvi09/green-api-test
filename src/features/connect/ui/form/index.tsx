"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useApiContext } from "@/shared/api";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Field, FieldError } from "@/shared/shadcn/components/ui/field";
import { Input } from "@/shared/shadcn/components/ui/input";
import { type FormValues, schema } from "../../model";

export const ConnectForm = () => {
  const { createClient } = useApiContext();
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      apiTokenInstance: "",
    },
    shouldUnregister: true,
  });
  const submit = (values: FormValues) => {
    createClient(values);
    router.push("/chats");
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center gap-8"
    >
      <Controller
        name="idInstance"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="relative">
            <Input
              {...field}
              id={field.name}
              type="number"
              placeholder="ID инстанса"
              value={field.value ?? ""}
              onChange={(event) => {
                const { value, valueAsNumber } = event.currentTarget;
                field.onChange(value ? valueAsNumber : undefined);
              }}
            />
            <FieldError
              errors={[fieldState.error]}
              className="absolute left-0 top-full"
            />
          </Field>
        )}
      />
      <Controller
        name="apiTokenInstance"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="relative">
            <Input
              {...field}
              id={field.name}
              placeholder="API-токен инстанса"
            />
            <FieldError
              errors={[fieldState.error]}
              className="absolute left-0 top-full"
            />
          </Field>
        )}
      />
      <Button type="submit" className="w-full">
        Подключиться
      </Button>
    </form>
  );
};
