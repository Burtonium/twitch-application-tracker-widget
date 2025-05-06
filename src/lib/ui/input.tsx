import * as React from "react";
import { cn } from "@/utils/cn";
import { LoaderCircle } from "lucide-react";

export type InputProps = {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  loading?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startAdornment,
      endAdornment,
      loading,
      error,
      size = "md",
      align = "left",
      ...props
    },
    ref,
  ) => {
    const alignmentClass = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align];

    return (
      <div
        className={cn(
          "border-tertiary/75 placeholder:text-muted file:text-foreground focus-visible:ring-ring has-[:focus-visible]:border-primary flex items-center rounded-md border bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          { "animate-pulse": loading },
          {
            "h-7": size === "sm",
            "h-9": size === "md",
            "h-12": size === "lg",
          },
          error && "border-destructive",
          className,
        )}
      >
        {startAdornment && (
          <>
            {loading ? (
              <LoaderCircle className="ml-2 animate-spin" />
            ) : (
              startAdornment
            )}
          </>
        )}
        {!startAdornment && loading && (
          <div className="ml-2">
            <LoaderCircle className="animate-spin" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "[&::-webkit-outer-spin-button] text-input file:text-foreground placeholder:text-muted w-full flex-1 [appearance:textfield] bg-transparent px-3 py-1 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none",
            alignmentClass,
            loading && "opacity-50",
            {
              "h-7 text-xs": size === "sm",
              "h-9": size === "md",
              "h-12 text-lg": size === "lg",
            },
            error && "text-destructive",
          )}
          ref={ref}
          disabled={loading}
          {...props}
        />
        {endAdornment && <span className="mx-2">{endAdornment}</span>}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
