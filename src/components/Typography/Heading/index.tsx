import { ComponentProps, ElementType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export interface HeadingProps extends ComponentProps<"h1"> {
  children: ReactNode
  as?: string | ElementType
}

export function Heading({
  children,
  as: Component = "h1",
  ...props
}: HeadingProps) {
  return (
    <Component
      {...props}
      className={twMerge(
        `flex items-center gap-3 font-sans text-2xl font-bold text-gray-100 [&_svg]:h-8 [&_svg]:w-8 [&_svg]:text-green-100`,
        props.className,
      )}
    >
      {children}
    </Component>
  )
}
