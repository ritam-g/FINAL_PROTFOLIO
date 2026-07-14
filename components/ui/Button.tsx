import {
  forwardRef,
  isValidElement,
  cloneElement,
  Children,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /**
   * When true, the Button merges its styles into its single child element
   * instead of rendering a native <button>. This prevents the `asChild` prop
   * from ever reaching a DOM node.
   */
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      children,
      // Destructure asChild so it is NEVER spread onto a DOM element
      ...props
    },
    ref
  ) => {
    const computedClassName = cn(
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
      {
        "bg-accent text-white hover:bg-accent/90": variant === "primary",
        "bg-surface text-primary hover:bg-surface/80": variant === "secondary",
        "border border-border bg-transparent hover:bg-surface text-primary":
          variant === "outline",
        "bg-transparent hover:bg-surface text-muted hover:text-primary":
          variant === "ghost",
        "h-9 px-4 text-sm": size === "sm",
        "h-10 px-6": size === "md",
        "h-12 px-8 text-lg": size === "lg",
      },
      className
    );

    if (asChild) {
      // Merge Button's computed class and all other props into the single child.
      // The child renders its own element (e.g. <a>), so no extra DOM node is added.
      const child = Children.only(children);
      if (!isValidElement(child)) return null;

      return cloneElement(child as ReactElement<Record<string, unknown>>, {
        ...props,
        // Child's own className wins when merged via cn
        className: cn(computedClassName, (child.props as { className?: string }).className),
        ref,
      });
    }

    return (
      <button
        ref={ref}
        className={computedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

