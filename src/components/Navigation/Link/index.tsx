import React, { ElementType, ReactNode } from "react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { twMerge } from "tailwind-merge"

export interface LinkProps extends Omit<NextLinkProps, "as"> {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary"
  size?: "md" | "sm"
  as?: ElementType | string
}

export function Link({
  children,
  variant = "primary",
  size = "md",
  as: Component = NextLink,
  ...props
}: LinkProps) {
  const stylesClasses = `flex w-max items-center font-sans ${
    size === "md" && "gap-3 [&_svg]:h-5 [&_svg]:w-5"
  } ${
    size === "sm" && "gap-2 text-sm [&_svg]:h-4 [&_svg]:w-4"
  } rounded px-2 py-1 font-bold leading-relaxed ${
    variant === "primary" && "text-gray-200 hover:bg-gray-200/5"
  } transition-colors duration-200
  ${variant === "secondary" && "text-purple-100 hover:bg-purple-100/5"}
  `

  return (
    <Component {...props} className={twMerge(stylesClasses, props.className)}>
      {children}
    </Component>
  )
}
