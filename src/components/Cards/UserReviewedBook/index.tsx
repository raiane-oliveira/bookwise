import Image, { ImageProps } from "next/image"
import { Box, BoxProps } from "../../Data-Display/Box"
import { Text } from "../../Typography/Text"
import { Stars } from "../../Data-Display/Stars"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
import { formatToRelativeDate } from "../../../utils/format-to-relative-date"

export interface UserReviewedBookProps extends Omit<BoxProps, "children"> {
  imgProps: ImageProps
  book: {
    title: string
    author: string
    stars: number
    createdAt: Date
    opinion: string
  }
}

export function UserReviewedBook({
  imgProps,
  book,
  ...props
}: UserReviewedBookProps) {
  const createdAt = formatToRelativeDate(book.createdAt)

  return (
    <Box hasHover {...props}>
      <Image
        width={108}
        height={152}
        quality={100}
        {...imgProps}
        className={twMerge(`rounded`, imgProps.className)}
        alt={imgProps.alt}
      />
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-between">
          <Text>{createdAt}</Text>
          <Stars stars={book.stars} className="mt-auto" />
        </div>

        <div>
          <Text
            as="strong"
            className="text-base font-bold leading-base text-gray-100"
          >
            {book.title}
          </Text>
          <Text className="text-gray-400">{book.author}</Text>
        </div>

        <Text className="mt-auto line-clamp-2">{book.opinion}</Text>
      </div>
    </Box>
  )
}
