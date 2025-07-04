import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm ring-offset-background transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        secondary:
          "bg-secondary hover:bg-secondary/75 text-secondary-foreground border border-secondary",
        default:
          "bg-primary hover:bg-primary/75 text-primary-foreground border border-primary",
        dark: "bg-background hover:bg-white/5 text-foreground border-foreground border",
        outline:
          "bg-transparent text-primary border border-primary hover:bg-primary hover:text-primary-foreground hover:drop-shadow-primary",
        "destructive-outline":
          "bg-transparent text-destructive border border-destructive hover:bg-destructive hover:text-destructive-foreground hover:drop-shadow-destructive",
        borderless:
          "border-0 bg-light text-foreground hover:bg-light/80 hover:text-primary",
        ghost:
          "bg-transparent text-primary hover:bg-primary hover:text-primary-foreground hover:drop-shadow-primary",
        unset: "",
        destructive:
          "bg-destructive hover:bg-destructive/75 text-destructive-foreground border border-destructive",
      },
      size: {
        default: "h-9 p-3",
        sm: "h-8 px-4 text-sm",
        lg: "h-10 px-8 text-lg",
        xl: "h-11 px-8 text-xl",
        icon: "size-9",
        unset: "",
      },
      loading: {
        true: "animate-pulse pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading = false, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading }), className)}
        ref={ref}
        disabled={props.disabled}
        {...props}
      >
        {props.children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
