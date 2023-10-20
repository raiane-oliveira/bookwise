import { ReactElement, useState } from "react"
import { NextPageWithLayout } from "../_app.page"
import { Default } from "@/layouts/Default"
import { Heading } from "@/components/Typography/Heading"
import { Binoculars } from "phosphor-react"
import { Input } from "@/components/Form/Input"
import { useQuery } from "@tanstack/react-query"
import { Book as BookType, Category, ReviewedBook } from "@/@types/interfaces"
import { api } from "@/lib/axios"
import { Tag } from "@/components/Actions/Tag"
import { TrendingBook } from "@/components/Cards/TrendingBook"
import { useSession } from "next-auth/react"
import { Text } from "@/components/Typography/Text"
import { NextSeo } from "next-seo"

interface Book extends BookType {
  reviewed_books: ReviewedBook[]
}

const Explore: NextPageWithLayout = () => {
  const session = useSession()

  const [categorySelected, setCategorySelected] = useState("")
  const [query, setQuery] = useState("")

  const { data: categories, isLoading: isLoadingCategories } = useQuery<
    Category[]
  >(["all-categories"], async () => {
    const response = await api.get("/categories")
    return response.data
  })

  const { data, isLoading: isLoadingBooks } = useQuery<Book[]>(
    ["all-books-explore"],
    async () => {
      const response = await api.get("/books")
      return response.data
    },
  )

  const books = data?.filter((book) => {
    const bookByCategory = book.categories.some((category) =>
      category.name.toLowerCase().includes(categorySelected),
    )

    const bookByName = book.name
      .toLowerCase()
      .includes(query.toLowerCase().trim())

    const bookByAuthors = book.authors.some((author) =>
      author.name.toLowerCase().includes(query.toLowerCase().trim()),
    )

    return bookByCategory && (bookByAuthors || bookByName)
  })

  return (
    <>
      <NextSeo title="Explore nossos livros | BookWise" />
      <main className="mt-12 w-full max-w-app pr-4 lg:pr-16">
        <div className="flex flex-wrap justify-between gap-6">
          <Heading>
            <Binoculars />
            Explorar
          </Heading>

          <div className="w-full max-w-md">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar livro ou autor"
            />
          </div>
        </div>

        <div className="categories-sidebar mb-8 mt-6 flex items-center gap-3 overflow-x-auto sm:mb-12 sm:mt-10 md:flex-wrap">
          {isLoadingCategories &&
            Array.from(Array(8).keys()).map((n) => (
              <div
                key={n}
                className="h-7 w-24 animate-pulse rounded-full bg-purple-200"
                aria-hidden
              />
            ))}

          {categories?.length && (
            <Tag
              defaultPressed
              pressed={!categorySelected}
              onPressedChange={() => setCategorySelected("")}
            >
              Tudo
            </Tag>
          )}

          {categories?.map((category) => (
            <Tag
              key={String(category.id)}
              onPressedChange={() =>
                setCategorySelected(category.name.toLowerCase())
              }
              pressed={categorySelected === category.name.toLowerCase()}
            >
              {category.name}
            </Tag>
          ))}
        </div>

        {!isLoadingBooks && !books?.length && (
          <Text size="md" className="text-gray-100">
            Não encontramos nenhum livro no momento.
          </Text>
        )}

        <div className="grid gap-5 sm:grid-cols-explore">
          {isLoadingBooks &&
            Array.from(Array(15).keys()).map((n) => (
              <div
                key={n}
                className="h-36 w-full animate-pulse rounded-lg bg-gray-700"
                aria-hidden
              />
            ))}

          {books?.map((book) => {
            const reviewedBook = book.reviewed_books.find(
              (reviewedBook) => reviewedBook.user_id === session.data?.user.id,
            )

            return (
              <TrendingBook
                key={book.id}
                book={book}
                as="button"
                wasRead={reviewedBook?.book_id === book.id}
                size="md"
              />
            )
          })}
        </div>
      </main>
    </>
  )
}

Explore.getLayout = (page: ReactElement) => {
  return <Default>{page}</Default>
}

export default Explore
