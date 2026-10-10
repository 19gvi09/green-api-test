import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
  "group/button inline-flex h-11 shrink-0 items-center justify-center rounded-max-md border border-transparent px-4 text-sm font-medium whitespace-nowrap transition-[background-color,border-color,box-shadow,color,transform] duration-150 ease-max outline-none select-none focus-visible:border-max-focus focus-visible:ring-4 focus-visible:ring-max-focus/25 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-max-danger aria-invalid:ring-4 aria-invalid:ring-max-danger/25 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-max-accent text-max-text-inverse shadow-max-float hover:bg-max-accent-hover active:bg-max-accent-pressed",
        outline:
          "border-max-border-strong bg-max-surface text-max-text hover:bg-max-surface-muted aria-expanded:bg-max-surface-muted",
        secondary:
          "bg-max-accent-subtle text-max-accent-pressed hover:bg-max-surface-strong aria-expanded:bg-max-surface-strong",
        ghost:
          "text-max-text hover:bg-max-accent-subtle hover:text-max-accent-pressed aria-expanded:bg-max-accent-subtle aria-expanded:text-max-accent-pressed",
        destructive:
          "bg-max-danger-subtle text-max-danger hover:bg-max-danger/20 focus-visible:border-max-danger focus-visible:ring-max-danger/25",
        link: "h-auto px-0 text-max-accent underline-offset-4 hover:underline",
      },
      size: {
        default:
          "gap-1.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "gap-1 px-3 text-xs in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        sm: "gap-1 px-3 text-sm in-data-[slot=button-group]:rounded-md",
        lg: "h-12 gap-1.5 px-5",
        icon: "size-11 px-0",
        "icon-xs":
          "size-11 px-0 in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-11 px-0 in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-12 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
