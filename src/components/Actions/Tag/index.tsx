import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

import * as Toggle from "@radix-ui/react-toggle"

export interface TagProps extends Toggle.ToggleProps {
  children: ReactNode
}

export function Tag({ children, ...props }: TagProps) {
  return (
    <Toggle.Root
      {...props}
      className={twMerge(
        `rounded-full border border-purple-100 px-4 py-1 text-center font-sans leading-relaxed text-purple-100 transition-colors duration-300 hover:bg-purple-200 hover:text-gray-100 data-[state=on]:border-purple-200 data-[state=on]:bg-purple-200 data-[state=on]:text-gray-100`,
        props.className,
      )}
    >
      {children}
    </Toggle.Root>
  )
}
