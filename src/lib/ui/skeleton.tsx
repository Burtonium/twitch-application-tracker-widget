import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import React from "react";

const skeletonVariants = cva("rounded-2xl animate-pulse", {
  variants: {
    variant: {
      default: "bg-lighter",
      primary: "bg-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Skeleton({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "primary" }) {
  return (
    <span
      className={cn("block", skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Skeleton };
