import { Star } from "phosphor-react"
import { ComponentProps, ElementType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export interface StarsProps extends ComponentProps<"div"> {
  stars: number
  totalStars?: 1 | number
  as?: string | ElementType
}

export function Stars({
  stars,
  totalStars = 5,
  as: Component = "div",
  ...props
}: StarsProps) {
  const starsArr = Array.from(Array(totalStars).keys())

  return (
    <Component
      {...props}
      className={twMerge(`flex items-center gap-1`, props.className)}
    >
      {starsArr.map((star) => (
        <Star
          key={star}
          weight={star + 1 <= stars ? "fill" : "regular"}
          className="h-4 w-4 text-purple-100"
          data-value={star}
        />
      ))}
    </Component>
  )
}
