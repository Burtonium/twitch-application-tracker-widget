"use client";

import useClipboard from "@/hooks/useClipboard";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui";
import { Link } from "lucide-react";

const LinkButton = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const [copy, isCopied] = useClipboard();
  return (
    <div className="relative">
      <button
        onClick={() => copy(href)}
        className="text-destructive cursor-pointer"
      >
        {children}
      </button>
      {isCopied && (
        <span className="text-primary absolute top-6 left-0 w-32 text-sm">
          Copied
        </span>
      )}
    </div>
  );
};

const links = {
  linkedin: "https://linkedin.com/in/mathieu-bertin",
  github: "https://github.com/burtonium",
  portfolio: "https://portfolio.nephelo.io",
};

export default function QuickLinks() {
  return (
    <div>
      <h2 className="mb-3">Quick Links</h2>
      <div className="flex gap-3 pb-5">
        <LinkButton href={links.portfolio}>
          <img
            className="size-6 rounded-xl"
            src="https://media.licdn.com/dms/image/v2/D4E03AQG1EO1OK3sT4w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1667235446544?e=1755734400&v=beta&t=zBRsOdt60aeaw4ny-AMATQsF4DpSoSUeDrMF11j0myU"
          />
        </LinkButton>
        <LinkButton href={links.linkedin}>
          <img
            className="size-6"
            src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
          />
        </LinkButton>
        <LinkButton href={links.github}>
          <img
            className="size-6"
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
          />
        </LinkButton>
      </div>
    </div>
  );
}
