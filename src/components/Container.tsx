import type { ReactNode } from "react";
import { clsx } from "clsx";

type ContainerVariant = "default" | "full";

const variantClasses: Record<ContainerVariant, string> = {
  default: "mx-auto max-w-[1440px] px-6 md:px-10 lg:px-40",
  full: "mx-auto max-w-[1440px] px-4",
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
