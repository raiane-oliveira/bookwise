import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { User } from "phosphor-react"
import { twMerge } from "tailwind-merge"

export interface AvatarProps extends AvatarPrimitive.AvatarImageProps {
  size?: "sm" | "md" | "lg"
}

export function Avatar({ size = "md", ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={`inline-block overflow-hidden rounded-full bg-gradient-vertical p-px
        ${size === "sm" && "h-8 w-8"} 
        ${size === "md" && "h-10 w-10"} 
        ${size === "lg" && "h-[4.5rem] w-[4.5rem]"}
      `}
    >
      <AvatarPrimitive.Image
        {...props}
        className={twMerge(
          `h-full w-full rounded-full object-cover`,
          props.className,
        )}
      />
      <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center text-gray-700">
        <User className={`${size === "lg" ? "h-7 w-7" : "h-4 w-4"}`} />
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
