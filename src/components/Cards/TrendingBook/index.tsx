import Image, { ImageProps } from "next/image"
import { Box, BoxProps } from "../../Data-Display/Box"
import { Text } from "../../Typography/Text"
import { Stars } from "../../Data-Display/Stars"
import { twMerge } from "tailwind-merge"

export interface TrendingBookProps extends Omit<BoxProps, "children"> {
  imgProps: ImageProps
  title: string
  author: string
  stars: number
  wasRead?: boolean
}

export function TrendingBook({
  imgProps,
  title,
  author,
  stars,
  wasRead = false,
  ...props
}: TrendingBookProps) {
  return (
    <Box className="relative" hasHover variant="secondary" size="sm" {...props}>
      <Image
        width={64}
        height={94}
        quality={100}
        {...imgProps}
        className={twMerge(`rounded`, imgProps.className)}
        alt={imgProps.alt}
      />
      <div
        className={`flex flex-col pt-0.5 ${
          props.as && props.as !== "div" && "h-full"
        }`}
      >
        <Text
          size="md"
          as="strong"
          className="font-bold leading-base text-gray-100"
        >
          {title}
        </Text>
        <Text className="text-gray-400">{author}</Text>
        <Stars stars={stars} className="mt-auto" />
      </div>

      {wasRead && (
        <div className="absolute -right-0.5 -top-0.5 rounded-bl rounded-tr bg-green-300 px-3 py-1 font-sans text-xs/snug text-green-100">
          LIDO
        </div>
      )}
    </Box>
  )
}
