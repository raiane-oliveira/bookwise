import Image, { ImageProps } from "next/image"
import { Box, BoxProps } from "../../Data-Display/Box"
import { Text } from "../../Typography/Text"
import { Stars } from "../../Data-Display/Stars"
import { twMerge } from "tailwind-merge"
import { formatToRelativeDate } from "../../../utils/format-to-relative-date"
import { ReadMore } from "@/components/Actions/ReadMore"

export interface UserReviewedBookProps extends Omit<BoxProps, "children"> {
  imgProps: ImageProps
  book: {
    title: string
    authors: string[]
    stars: number
    createdAt: Date
    opinion: string
  }
  variant?: "primary" | "secondary"
}

export function UserReviewedBook({
  imgProps,
  book,
  variant = "primary",
  ...props
}: UserReviewedBookProps) {
  const createdAt = formatToRelativeDate(book.createdAt)

  if (variant === "secondary") {
    return (
      <Box variant="secondary" className="flex-col p-6" {...props}>
        <div className="flex gap-6">
          <Image
            width={98}
            height={134}
            quality={100}
            {...imgProps}
            className={twMerge(
              `h-[8.375rem] w-[6.125rem] rounded object-cover`,
              imgProps.className,
            )}
            alt={imgProps.alt}
          />

          <div className="flex flex-col gap-0.5 py-1">
            <Text as="strong" className="text-lg/base font-bold text-gray-100">
              {book.title}
            </Text>
            <Text className="text-gray-400">{book.authors.join(", ")}</Text>
            <Stars stars={book.stars} className="mt-auto" />
          </div>
        </div>

        <ReadMore text={book.opinion} />
      </Box>
    )
  }

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
            size="md"
            className="font-bold leading-base text-gray-100"
          >
            {book.title}
          </Text>
          <Text className="text-gray-400">{book.authors.join(", ")}</Text>
        </div>

        <Text className="mt-auto line-clamp-2">{book.opinion}</Text>
      </div>
    </Box>
  )
}
