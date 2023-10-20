import { Book, ReviewedBook, User } from "@/@types/interfaces"
import { ReadMore } from "@/components/Actions/ReadMore"
import { Avatar } from "@/components/Data-Display/Avatar"
import { Box } from "@/components/Data-Display/Box"
import { Stars } from "@/components/Data-Display/Stars"
import { Link } from "@/components/Navigation/Link"
import { Text } from "@/components/Typography/Text"
import { formatToRelativeDate } from "@/utils/format-to-relative-date"
import Image from "next/image"
import NextLink from "next/link"
import { useState } from "react"

interface BookType extends ReviewedBook {
  user: User
  book: Book
}

interface RecentReviewedBookProps {
  book: BookType
}

export function RecentReviewedBook({ book }: RecentReviewedBookProps) {
  return (
    <Box className="flex-col gap-8 py-6" variant="secondary">
      <NextLink
        href={`/profile/${book.user_id}`}
        className="flex w-full flex-wrap items-start gap-4"
      >
        <Avatar src={book.user.avatar_url} alt="" />
        <div>
          <Text className="text-gray-100" size="md">
            {book.user.name}
          </Text>
          <Text className="text-gray-400">
            {formatToRelativeDate(book.created_at)}
          </Text>
        </div>
        <Stars className="min-[426px]:ml-auto" stars={book.stars} />
      </NextLink>

      <div className="flex gap-5 max-md:flex-col">
        <Image
          src={
            book.book.image_url ??
            "https://bookscouter.com/images/main/book-cover-unavailable.svg"
          }
          alt=""
          quality={100}
          width={108}
          height={152}
          className="h-[9.5rem] w-28 rounded object-cover"
        />

        <div className="space-y-5">
          <section>
            <Text size="md" className="font-bold leading-base text-gray-100">
              {book.book.name}
            </Text>
            <Text className="text-gray-400">
              {book.book.authors.map((author) => author.name).join(", ")}
            </Text>
          </section>

          <ReadMore text={book.review} />
        </div>
      </div>
    </Box>
  )
}
