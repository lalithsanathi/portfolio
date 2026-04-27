import type { ReactNode } from "react";
import { clsx } from "clsx";

type ContainerVariant = "default" | "full";

const variantClasses: Record<ContainerVariant, string> = {
  default:
    "mx-auto w-full max-w-screen-2xl px-6 md:px-14 xl:px-20 2xl:px-0",
  full: "mx-auto w-full max-w-screen-2xl px-0",
};

interface ContainerProps {
  as?: "div" | "main" | "section";
  variant?: ContainerVariant;
  children: ReactNode;
  className?: string;
}

export default function Container({
  as: Tag = "div",
  variant = "default",
  children,
  className,
}: ContainerProps) {
  return (
    <Tag className={clsx(variantClasses[variant], className)}>
      {children}
    </Tag>
  );
}
