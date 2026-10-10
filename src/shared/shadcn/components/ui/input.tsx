import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";
import type * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-max-md border border-max-border bg-max-surface-muted px-4 text-base text-max-text shadow-none transition-[background-color,border-color,box-shadow] duration-150 ease-max outline-none placeholder:text-max-text-tertiary hover:border-max-border-strong focus-visible:border-max-focus focus-visible:bg-max-surface focus-visible:ring-4 focus-visible:ring-max-focus/25 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-max-danger aria-invalid:bg-max-danger-subtle aria-invalid:focus-visible:ring-max-danger/25 md:text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
