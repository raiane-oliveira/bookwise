import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app.page"
import { Default } from "@/layouts/Default"
import { Heading } from "@/components/Typography/Heading"
import { CaretRight, ChartLineUp } from "phosphor-react"
import { Text } from "@/components/Typography/Text"
import { Link } from "@/components/Navigation/Link"
import { TrendingBook } from "@/components/Cards/TrendingBook"
import { Box } from "@/components/Data-Display/Box"
import { Avatar } from "@/components/Data-Display/Avatar"
import { Stars } from "@/components/Data-Display/Stars"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { api } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { UserReviewedBook } from "@/components/Cards/UserReviewedBook"
import { formatToRelativeDate } from "@/utils/format-to-relative-date"

interface Book {
  id: string
  name: string
  author: string
  image_url?: string
  category?: string
  rating?: number
}

interface ReviewedBook {
  id: string
  review: string
  stars: number
  created_at: Date
  book: Book
  user: {
    id: string
    name: string
    email: string
    avatar_url: string
    created_at: Date
  }
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

  const { data: books, isLoading: isLoadingBooks } = useQuery<Book[]>(
    ["all-books"],
    async () => {
      const response = await api.get("/books?limit=4")
      return response.data
    },
  )

  if (isLoadingRecentBooks || isLoadingBooks) {
    return <h1>Loading...</h1>
  }

  const lastReviewedUserBook = recentBooksData?.lastReviewedUserBook
    ? recentBooksData.lastReviewedUserBook
    : null
  const recentReviewedBooks = recentBooksData?.recentReviewedBooks.length
    ? recentBooksData.recentReviewedBooks
    : null

  return (
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
                <Link href="/" size="sm" variant="secondary">
                  Ver todas <CaretRight />
                </Link>
              </div>

              <UserReviewedBook
                imgProps={{
                  src: "https://m.media-amazon.com/images/I/618iHJVMh4L.jpg",
                  alt: "",
                }}
                book={{
                  title: lastReviewedUserBook.book.name,
                  author: lastReviewedUserBook.book.author,
                  stars: lastReviewedUserBook.stars,
                  opinion: lastReviewedUserBook.review,
                  createdAt: lastReviewedUserBook.created_at,
                }}
                className="mb-7"
                as="button"
              />
            </>
          )}

          {!recentReviewedBooks ? (
            <Text className="text-gray-100">
              Não temos avaliações recentes no momento.
            </Text>
          ) : (
            <>
              <Text className="mb-1 text-gray-100">
                Avaliações mais recentes
              </Text>
              {recentReviewedBooks?.map((book) => (
                <Box
                  key={book.id}
                  className="flex-col gap-8 py-6"
                  variant="secondary"
                  hasHover
                  as="button"
                >
                  <div className="flex w-full items-start gap-4">
                    <Avatar src={book.user.avatar_url} alt="" />
                    <div>
                      <Text className="text-gray-100" size="md">
                        {book.user.name}
                      </Text>
                      <Text className="text-gray-400">
                        {formatToRelativeDate(book.created_at)}
                      </Text>
                    </div>
                    <Stars className="ml-auto" stars={book.stars} />
                  </div>

                  <div className="flex gap-5">
                    <Image
                      src={
                        book.book.image_url ??
                        "https://bookscouter.com/images/main/book-cover-unavailable.svg"
                      }
                      alt=""
                      quality={100}
                      width={108}
                      height={152}
                      className="h-full w-28 rounded object-cover"
                    />

                    <div className="space-y-5">
                      <section>
                        <Text
                          size="md"
                          className="font-bold leading-base text-gray-100"
                        >
                          {book.book.name}
                        </Text>
                        <Text className="text-gray-400">
                          {book.book.author}
                        </Text>
                      </section>

                      <Text className="line-clamp-4">
                        {book.review}
                        <Link
                          href={`/`}
                          variant="secondary"
                          size="sm"
                          className="inline"
                        >
                          ver mais
                        </Link>
                      </Text>
                    </div>
                  </div>
                </Box>
              ))}
            </>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Text className="mb-1 text-gray-100">Livros populares</Text>
            <Link href="/trending-books" size="sm" variant="secondary">
              Ver todos <CaretRight />
            </Link>
          </div>

          {books?.map((book) => (
            <TrendingBook
              key={book.id}
              title={book.name}
              author={book.author}
              stars={book.rating || 0}
              imgProps={{
                src: book.image_url || "",
                alt: "",
              }}
              as="button"
              className="text-left"
            />
          ))}
        </div>
      </div>
    </main>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Default>{page}</Default>
}

export default Home
