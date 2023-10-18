import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app.page"
import { Default } from "@/layouts/Default"
import { Heading } from "@/components/Typography/Heading"
import { CaretRight, ChartLineUp } from "phosphor-react"
import { Text } from "@/components/Typography/Text"
import { Link } from "@/components/Navigation/Link"
import { TrendingBook } from "@/components/Cards/TrendingBook"
import { Box } from "@/components/Data-Display/Box"
import { useSession } from "next-auth/react"
import { api } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { UserReviewedBook } from "@/components/Cards/UserReviewedBook"
import {
  Book,
  ReviewedBook as ReviewedBookType,
  User,
} from "@/@types/interfaces"
import { BookDetails } from "@/components/Modal/BookDetails"

import * as Dialog from "@radix-ui/react-dialog"
import { RecentReviewedBook } from "./components/RecentReviewedBook"
import { NextSeo } from "next-seo"

interface BookWithReviewedBooks extends Book {
  reviewed_books: ReviewedBookType[]
}

interface ReviewedBook extends ReviewedBookType {
  book: Book
  user: User
}

interface ReviewedBooks {
  recentReviewedBooks: ReviewedBook[]
  lastReviewedUserBook: ReviewedBook
}

const Home: NextPageWithLayout = () => {
  const session = useSession()

  const { data: recentBooksData, isLoading: isLoadingRecentBooks } =
    useQuery<ReviewedBooks>(["reviewed-books"], async () => {
      const response = await api.get("/reviewed-books")
      return response.data
    })

  const { data: books } = useQuery<BookWithReviewedBooks[]>(
    ["all-books"],
    async () => {
      const response = await api.get("/books?limit=4")
      return response.data
    },
  )

  const lastReviewedUserBook = recentBooksData?.lastReviewedUserBook
    ? recentBooksData.lastReviewedUserBook
    : null
  const recentReviewedBooks = recentBooksData?.recentReviewedBooks.length
    ? recentBooksData.recentReviewedBooks
    : null

  return (
    <>
      <NextSeo
        title="Início | BookWise"
        description="BookWise é um site para avaliação e gerenciamento de leituras."
      />
      <main className="mt-14 w-full max-w-app space-y-10">
        <Heading>
          <ChartLineUp />
          Início
        </Heading>

        <div className="grid w-full gap-16 pr-24 xl:grid-cols-home">
          <div className="flex flex-col gap-3">
            {session.status === "authenticated" && lastReviewedUserBook && (
              <>
                <div className="mb-1 flex items-center justify-between">
                  <Text className=" text-gray-100">
                    Sua última leitura avaliada
                  </Text>
                  <Link
                    href={`/profile/${lastReviewedUserBook.user_id}`}
                    size="sm"
                    variant="secondary"
                  >
                    Ver todas <CaretRight />
                  </Link>
                </div>

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <UserReviewedBook
                      imgProps={{
                        src:
                          lastReviewedUserBook.book.image_url ??
                          "https://bookscouter.com/images/main/book-cover-unavailable.svg",
                        alt: "",
                      }}
                      book={{
                        title: lastReviewedUserBook.book.name,
                        authors: lastReviewedUserBook.book.authors.map(
                          (author) => author.name,
                        ),
                        stars: lastReviewedUserBook.stars,
                        opinion: lastReviewedUserBook.review,
                        createdAt: lastReviewedUserBook.created_at,
                      }}
                      className="mb-7 [&_>_div]:h-full"
                      as="button"
                    />
                  </Dialog.Trigger>
                  <BookDetails book={lastReviewedUserBook.book} />
                </Dialog.Root>
              </>
            )}

            {isLoadingRecentBooks &&
              Array.from(Array(6).keys()).map((n) => (
                <Box key={n} className="h-48 w-full max-w-lg animate-pulse">
                  {null}
                </Box>
              ))}

            {!recentReviewedBooks && !isLoadingRecentBooks && (
              <Text className="text-gray-100">
                Não temos avaliações recentes no momento.
              </Text>
            )}

            {recentReviewedBooks && (
              <>
                <Text className="mb-1 text-gray-100">
                  Avaliações mais recentes
                </Text>
                {recentReviewedBooks?.map((book) => {
                  return <RecentReviewedBook key={book.id} book={book} />
                })}
              </>
            )}
          </div>

          {books?.length && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Text className="mb-1 text-gray-100">Livros populares</Text>
                <Link href="/explore" size="sm" variant="secondary">
                  Ver todos <CaretRight />
                </Link>
              </div>

              {books.map((book) => (
                <TrendingBook
                  key={book.id}
                  book={book}
                  as="button"
                  className="text-left"
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Default>{page}</Default>
}

export default Home
