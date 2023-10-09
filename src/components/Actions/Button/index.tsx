import { ComponentProps, ElementType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode
  as?: ElementType | string
}

export function Button({
  children,
  as: Component = "button",
  ...props
}: ButtonProps) {
  return (
    <Component
      {...props}
      className={twMerge(
        `rounded bg-gray-600 p-2 leading-none text-purple-100 transition-colors duration-200 hover:bg-gray-500 [&_svg]:h-6 [&_svg]:w-6`,
        props.className,
      )}
    >
      {children}
    </Component>
  )
}
