import Image, { ImageProps } from "next/image"
import { Box, BoxProps } from "../../Data-Display/Box"
import { Text } from "../../Typography/Text"
import { Stars } from "../../Data-Display/Stars"
import { twMerge } from "tailwind-merge"

export interface TrendingBookProps extends BoxProps {
  imgProps: ImageProps
  title: string
  author: string
  stars: number
}

export function TrendingBook({
  imgProps,
  title,
  author,
  stars,
  ...props
}: TrendingBookProps) {
  return (
    <Box hasHover variant="secondary" size="sm" {...props}>
      <Image
        width={64}
        height={94}
        quality={100}
        {...imgProps}
        className={twMerge(`rounded`, imgProps.className)}
        alt={imgProps.alt}
      />
      <div className="flex flex-col pt-0.5">
        <Text
          size="md"
          as="strong"
          className="leading-base font-bold text-gray-100"
        >
          {title}
        </Text>
        <Text className="text-gray-400">{author}</Text>
        <Stars stars={stars} className="mt-auto" />
      </div>
    </Box>
  )
}
