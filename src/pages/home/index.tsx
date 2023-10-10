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
import { api, booksApi } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { UserReviewedBook } from "@/components/Cards/UserReviewedBook"
import { formatToRelativeDate } from "@/utils/format-to-relative-date"

interface ReviewedBook {
  id: string
  name: string
  author: string
  review: string
  stars: number
  category: string
  created_at: Date
  image_url?: string
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
  const { data, isLoading } = useQuery<ReviewedBooks>(
    ["reviewed-books"],
    async () => {
      const response = await api.get("/reviewed-books")
      return response.data
    },
  )

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  const lastReviewedUserBook = data && data.lastReviewedUserBook
  const recentReviewedBooks = data && data.recentReviewedBooks

  return (
    <main className="mt-14 w-full max-w-app space-y-10">
      <Heading>
        <ChartLineUp />
        Início
      </Heading>

      <div className="grid w-full gap-16 pr-24 xl:grid-cols-home">
        <div className="flex flex-col gap-3">
          <div className="mb-1 flex items-center justify-between">
            <Text className=" text-gray-100">Sua última leitura avaliada</Text>
            <Link href="/" size="sm" variant="secondary">
              Ver todas <CaretRight />
            </Link>
          </div>

          {session.status === "authenticated" && lastReviewedUserBook && (
            <UserReviewedBook
              imgProps={{
                src: "https://m.media-amazon.com/images/I/618iHJVMh4L.jpg",
                alt: "",
              }}
              book={{
                title: lastReviewedUserBook.name,
                author: lastReviewedUserBook.author,
                stars: lastReviewedUserBook.stars,
                opinion: lastReviewedUserBook.review,
                createdAt: lastReviewedUserBook.created_at,
              }}
              className="mb-7"
              as="button"
            />
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
              {recentReviewedBooks.map((book) => (
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
                        book.image_url ??
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
                          {book.name}
                        </Text>
                        <Text className="text-gray-400">{book.author}</Text>
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

          <TrendingBook
            title={"title"}
            author={"authors"}
            stars={4}
            imgProps={{
              src: "https://m.media-amazon.com/images/I/519UnakaarL.jpg",
              alt: "",
            }}
            as="button"
            className="text-left"
          />
        </div>
      </div>
    </main>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Default>{page}</Default>
}

export default Home
