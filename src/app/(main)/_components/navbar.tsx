"use client";

import React, {
  type FC,
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { Burger } from "@/lib/ui/burger";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import useClickOutside from "@/hooks/useClickOutside";

const NextLink: FC<PropsWithChildren<{ path: string; className?: string }>> = ({
  className,
  path,
  children,
}) => {
  const pathname = usePathname();

  return (
    <Link
      prefetch
      href={path}
      className={cn(
        "cursor-pointer py-2 text-xl font-normal",
        pathname === path && "text-primary",
        className,
      )}
    >
      {children}
    </Link>
  );
};

const routes = [
  { name: "Dashboard", path: "/" },
  { name: "Counters", path: "/counter" },
  { name: "Styleguide", path: "/styleguide" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isNavOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  useClickOutside(navRef, () => setNavOpen(false));

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  return (
    <nav className={cn("fixed z-50 flex w-full items-center")} ref={navRef}>
      <div
        className={cn(
          "bg-background/25 fixed top-0 right-0 size-full backdrop-blur-lg transition-all lg:absolute",
          {
            "h-20": !isNavOpen,
            "h-full": isNavOpen,
          },
        )}
      />

      <div
        className={cn(
          "top-0 z-10 flex w-full items-center justify-between gap-3 px-5 py-6 lg:p-8 lg:py-6",
        )}
      >
        <Link
          className="font-title text-2xl font-bold text-white hover:text-gray-300"
          href="/"
        >
          Job Application Tracker
        </Link>
        <Burger
          className={cn("shrink-0 rounded-xl lg:hidden", {
            "shadow-dark": !isNavOpen,
          })}
          isNavOpen={isNavOpen}
          setNavOpen={setNavOpen}
        />{" "}
      </div>
      <div
        className={cn(
          "fixed right-0 px-6 pt-50 transition-transform lg:relative lg:py-0",
          {
            "translate-x-0": isNavOpen,
            "translate-x-full lg:translate-x-0": !isNavOpen,
          },
        )}
      >
        <ul className="space-y-3 text-right lg:flex lg:items-center lg:gap-5 lg:space-y-0">
          {routes.map((route) => (
            <li key={route.path}>
              <NextLink
                className="hover:text-primary hover:drop-shadow-primary leading-none lg:text-sm"
                path={route.path}
              >
                <span>{route.name}</span>
              </NextLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
