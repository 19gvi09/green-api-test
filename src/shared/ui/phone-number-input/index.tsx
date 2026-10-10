import type * as React from "react";

import { Input } from "@/shared/shadcn/components/ui/input";

interface PhoneNumberInputProps
  extends Omit<
    React.ComponentProps<typeof Input>,
    "inputMode" | "onChange" | "type" | "value"
  > {
  onValueChange: (value: string) => void;
  value: string;
}

const sanitizePhoneNumber = (value: string) => {
  const hasCountryPrefix = value.trimStart().startsWith("+");
  const allowedCharacters = value.replace(/[^\d()\s-]/g, "");

  return hasCountryPrefix ? `+${allowedCharacters}` : allowedCharacters;
};

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  onValueChange,
  placeholder = "+1 202 555 0123",
  value,
  ...props
}) => (
  <Input
    {...props}
    type="tel"
    inputMode="tel"
    autoComplete="tel"
    placeholder={placeholder}
    value={value}
    onChange={(event) => onValueChange(sanitizePhoneNumber(event.target.value))}
  />
);
