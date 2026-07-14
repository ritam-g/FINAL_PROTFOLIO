import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id: string;
}

export function SectionWrapper({ id, className, children, ...props }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "max-w-6xl mx-auto px-6 py-24 md:py-32 scroll-mt-16",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
