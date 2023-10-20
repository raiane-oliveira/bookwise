import Image from "next/image"
import { Box, BoxProps } from "../../Data-Display/Box"
import { Text } from "../../Typography/Text"
import { Stars } from "../../Data-Display/Stars"
import * as Dialog from "@radix-ui/react-dialog"
import { BookDetails } from "../../Modal/BookDetails"
import { Book, ReviewedBook } from "@/@types/interfaces"

interface BookWithReviewedBooks extends Book {
  reviewed_books: ReviewedBook[]
}

export interface TrendingBookProps extends Omit<BoxProps, "children"> {
  book: BookWithReviewedBooks
  wasRead?: boolean
  size?: "sm" | "md"
}

export function TrendingBook({
  book,
  wasRead = false,
  size = "sm",
  ...props
}: TrendingBookProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Box
          className="relative"
          hasHover
          variant="secondary"
          size="sm"
          {...props}
        >
          <Image
            width={size === "sm" ? 64 : 108}
            height={size === "sm" ? 94 : 152}
            quality={100}
            src={book.image_url || ""}
            alt=""
            className={`${size === "sm" && "h-[5.875rem] w-16"} ${
              size === "md" && "h-[9.5rem] w-28"
            } rounded object-cover max-[330px]:h-[5.875rem] max-[330px]:w-16`}
          />
          <div
            className={`flex flex-col pt-0.5 ${
              props.as && props.as !== "div" && "h-full"
            }`}
          >
            <Text
              size="md"
              as="strong"
              className="line-clamp-2 font-bold leading-base text-gray-100"
              title={book.name}
            >
              {book.name}
            </Text>
            <Text className="text-gray-400">
              {book.authors.map((author) => author.name).join(", ")}
            </Text>
            <Stars stars={book.rating || 0} className="mt-auto" />
          </div>

          {wasRead && (
            <div className="absolute -right-0.5 -top-0.5 rounded-bl rounded-tr bg-green-300 px-3 py-1 font-sans text-xs/snug text-green-100">
              LIDO
            </div>
          )}
        </Box>
      </Dialog.Trigger>

      <BookDetails book={book} />
    </Dialog.Root>
  )
}
