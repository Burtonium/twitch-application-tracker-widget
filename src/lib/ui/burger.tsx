import { type Dispatch, forwardRef, type SetStateAction } from "react";
import { cn } from "@/utils/cn";

const Burger = forwardRef<
  HTMLButtonElement,
  {
    isNavOpen: boolean;
    setNavOpen: Dispatch<SetStateAction<boolean>>;
    className?: string;
  }
>(({ isNavOpen, setNavOpen, className }, ref) => (
  <button
    ref={ref}
    className={cn(
      "relative flex size-6 cursor-pointer items-center justify-center transition-all",
      className,
    )}
    id="icon"
    onClick={() => setNavOpen((open) => !open)}
  >
    <span
      className={cn(
        "bg-primary absolute h-[3px] w-8 transition-all duration-300 ease-in-out",
        {
          "translate-y-0 rotate-45": isNavOpen,
          "-translate-y-2 rotate-0": !isNavOpen,
        },
      )}
    ></span>
    <span
      className={cn(
        "bg-secondary absolute h-[3px] w-8 transition-all duration-300 ease-in-out",
        {
          "opacity-0": isNavOpen,
          "opacity-100": !isNavOpen,
        },
      )}
    ></span>
    <span
      className={cn(
        "bg-tertiary absolute h-[3px] w-8 transition-all duration-300 ease-in-out",
        {
          "bg-primary translate-y-0 -rotate-45": isNavOpen,
          "translate-y-2 rotate-0": !isNavOpen,
        },
      )}
    ></span>
  </button>
));

Burger.displayName = "Burger";

export { Burger };
