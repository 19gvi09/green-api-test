import { cn } from "cn";
import type * as React from "react";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-max-md border border-max-border bg-max-surface-muted px-4 py-3 text-base text-max-text shadow-none transition-[background-color,border-color,box-shadow] duration-150 ease-max outline-none placeholder:text-max-text-tertiary hover:border-max-border-strong focus-visible:border-max-focus focus-visible:bg-max-surface focus-visible:ring-4 focus-visible:ring-max-focus/25 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-max-danger aria-invalid:bg-max-danger-subtle aria-invalid:focus-visible:ring-max-danger/25 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
