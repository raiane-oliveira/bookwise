import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { ElementType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export interface NavLinkProps extends Omit<LinkProps, "as"> {
  children: ReactNode
  className?: string
  icon: ElementType
  as?: string | ElementType
}

export function NavLink({
  children,
  icon: Icon,
  as: Component = Link,
  ...props
}: NavLinkProps) {
  const pathName = usePathname()
  const isActive = pathName ? pathName === props.href : false

  return (
    <Component
      {...props}
      className={twMerge(
        `${
          isActive
            ? "before font-bold text-gray-100 before:absolute before:-left-4 before:h-6 before:w-1 before:rounded-full before:bg-gradient-vertical"
            : "text-gray-400"
        } relative flex items-center gap-3 py-2 font-sans leading-relaxed transition-colors duration-200 hover:text-gray-100`,
        props.className,
      )}
    >
      <Icon className="h-6 w-6" />
      {children}
    </Component>
  )
}
