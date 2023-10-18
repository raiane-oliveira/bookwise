import { Default } from "@/layouts/Default"
import { NextPageWithLayout } from "../_app.page"
import { ReactElement, useState } from "react"
import {
  BookOpen,
  BookmarkSimple,
  Books,
  CaretLeft,
  User,
  UserList,
} from "phosphor-react"
import { Heading } from "@/components/Typography/Heading"
import { Input } from "@/components/Form/Input"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { api } from "@/lib/axios"
import { Book, ReviewedBook, User as UserType } from "@/@types/interfaces"
import { useSession } from "next-auth/react"
import { Link } from "@/components/Navigation/Link"
import { UserReviewedBook } from "@/components/Cards/UserReviewedBook"
import { Text } from "@/components/Typography/Text"
import { formatToRelativeDate } from "@/utils/format-to-relative-date"
import { Avatar } from "@/components/Data-Display/Avatar"
import dayjs from "dayjs"

import * as Dialog from "@radix-ui/react-dialog"
import { BookDetails } from "@/components/Modal/BookDetails"
import { NextSeo } from "next-seo"

interface ReviewedBooks extends ReviewedBook {
  book: Book
}

interface ProfileData extends UserType {
  reviewed_books: ReviewedBooks[]
  pagesRead: number
  booksReviewed: number
  authorsRead: number
  mostReadCategories: {
    name: string
    occurrence: number
  }[]
}

interface Profile {
  profile: ProfileData
}

const Profile: NextPageWithLayout = () => {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const session = useSession()

  const userId = router.query.id

  const { data: user } = useQuery<Profile>(["profile", userId], async () => {
    const response = await api.get(`/users/${userId}/profile`)
    return response.data
  })

  const memberSince = dayjs(user?.profile.created_at).format(
    "[membro desde ]YYYY",
  )

  const reviewedBooks = user?.profile.reviewed_books
    ? user.profile.reviewed_books.filter((review) => {
        const reviewsByName = review.book.name
          .toLowerCase()
          .includes(query.toLowerCase().trim())
        const reviewsByAuthor = review.book.authors.some((author) =>
          author.name.toLowerCase().includes(query.toLowerCase().trim()),
        )

        return reviewsByName || reviewsByAuthor
      })
    : null

  return (
    <>
      <NextSeo title={`Perfil ${user?.profile.name} | BookWise`} />
      <main className="mt-14 w-full max-w-app space-y-10">
        {session.data?.user.id === user?.profile.id ? (
          <Heading>
            <User />
            Perfil
          </Heading>
        ) : (
          <Link href="" as="button" onClick={() => router.back()}>
            <CaretLeft />
            Voltar
          </Link>
        )}

        <div className="grid grid-cols-profile gap-16">
          <div className="flex flex-col gap-6">
            <Input
              placeholder="Buscar livro avaliado"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="mt-4 space-y-6">
              {user &&
                reviewedBooks?.map((reviewBook) => {
                  return (
                    <div className="flex flex-col gap-2" key={reviewBook.id}>
                      <Text>{formatToRelativeDate(reviewBook.created_at)}</Text>
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <UserReviewedBook
                            hasHover
                            as="button"
                            book={{
                              title: reviewBook.book.name,
                              authors: reviewBook.book.authors.map(
                                (author) => author.name,
                              ),
                              createdAt: reviewBook.created_at,
                              opinion: reviewBook.review,
                              stars: reviewBook.stars,
                            }}
                            imgProps={{
                              src: reviewBook.book.image_url || "",
                              alt: "",
                            }}
                            variant="secondary"
                          />
                        </Dialog.Trigger>

                        <BookDetails book={reviewBook.book} />
                      </Dialog.Root>
                    </div>
                  )
                })}
            </div>
          </div>

          <div className="flex flex-col gap-8 border-l border-l-gray-700">
            <div className="flex flex-col items-center gap-5 pb-2 text-center">
              <Avatar size="lg" src={user?.profile.avatar_url} alt="" />
              <div>
                <Text className="text-xl/base font-bold text-gray-100">
                  {user?.profile.name}
                </Text>
                <Text className="text-gray-400">{memberSince}</Text>
              </div>
            </div>

            <div
              className="mx-auto h-1 w-8 rounded-full bg-gradient-horizontal"
              aria-hidden
            />

            <div className="space-y-10 px-14 py-5">
              <div className="flex items-center gap-5 [&_svg]:h-8 [&_svg]:w-8 [&_svg]:text-green-100">
                <BookOpen />
                <Text>
                  <span className="block text-base/base font-bold text-gray-200">
                    {user?.profile.pagesRead}
                  </span>
                  Páginas lidas
                </Text>
              </div>

              <div className="flex items-center gap-5 [&_svg]:h-8 [&_svg]:w-8 [&_svg]:text-green-100">
                <Books />
                <Text>
                  <span className="block text-base/base font-bold text-gray-200">
                    {user?.profile.booksReviewed}
                  </span>
                  Livros avaliados
                </Text>
              </div>

              <div className="flex items-center gap-5 [&_svg]:h-8 [&_svg]:w-8 [&_svg]:text-green-100">
                <UserList />
                <Text>
                  <span className="block text-base/base font-bold text-gray-200">
                    {user?.profile.authorsRead}
                  </span>
                  Autores lidos
                </Text>
              </div>

              <div className="flex items-center gap-5 [&_svg]:h-8 [&_svg]:w-8 [&_svg]:text-green-100">
                <BookmarkSimple />
                <Text>
                  <span className="block text-base/base font-bold text-gray-200">
                    {user?.profile.mostReadCategories[0]?.name}
                    {!user?.profile.mostReadCategories[0]?.name &&
                      "Nenhuma categoria"}
                  </span>
                  Categoria mais lida
                </Text>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

Profile.getLayout = (page: ReactElement) => {
  return <Default>{page}</Default>
}

export default Profile
