import { ComponentProps, ElementType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export interface BoxProps extends ComponentProps<"div"> {
  children: ReactNode
  variant?: "primary" | "secondary"
  size?: "sm" | "md"
  hasHover?: boolean
  as?: ElementType | string
}

export function Box({
  children,
  variant = "primary",
  size = "md",
  hasHover = false,
  as: Component = "div",
  ...props
}: BoxProps) {
  return (
    <Component
      {...props}
      className={twMerge(
        `${
          variant === "primary"
            ? `bg-gray-600 ${hasHover && "hover:border-gray-500"}`
            : `bg-gray-700 ${hasHover && "hover:border-gray-600"}`
        } flex rounded-lg border-2 border-transparent transition-colors duration-200 
        ${size === "md" ? "gap-6 px-6 py-5" : "gap-5 px-5 py-4"}
        `,
        props.className,
      )}
    >
      {children}
    </Component>
  )
}
