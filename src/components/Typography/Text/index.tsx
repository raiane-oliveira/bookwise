import { ComponentProps, ElementType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export interface TextProps extends ComponentProps<"p"> {
  children: ReactNode
  as?: string | ElementType
  size?: "sm" | "md"
}

export function Text({
  children,
  as: Component = "p",
  size = "sm",
  ...props
}: TextProps) {
  return (
    <Component
      {...props}
      className={twMerge(
        `font-sans ${
          size === "sm" ? "text-sm" : "text-base"
        } leading-relaxed text-gray-300`,
        props.className,
      )}
    >
      {children}
    </Component>
  )
}
