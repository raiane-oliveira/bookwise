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

interface Book extends BookType {
  reviewed_books: ReviewedBook[]
}

const Explore: NextPageWithLayout = () => {
  const [categorySelected, setCategorySelected] = useState("")
  const session = useSession()
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
    return book.categories.some((category) =>
      category.name.toLowerCase().includes(categorySelected),
    )
  })

  return (
    <main className="mt-12 w-full max-w-app pr-16">
      <div className="flex justify-between">
        <Heading>
          <Binoculars />
          Explorar
        </Heading>

        <form className="w-full max-w-md">
          <Input placeholder="Buscar livro ou autor" />
        </form>
      </div>

      <div className="mb-12 mt-10 flex flex-wrap gap-3">
        {isLoadingCategories &&
          Array.from(Array(8).keys()).map((n) => (
            <div
              key={n}
              className="h-7 w-24 animate-pulse rounded-full bg-purple-200"
              aria-hidden
            />
          ))}

        {!isLoadingBooks && !books?.length && (
          <Text size="md" className="text-gray-100">
            Não temos nenhum livro adicionado no momento.
          </Text>
        )}

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

      <div className="grid grid-cols-3 gap-5">
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
            />
          )
        })}
      </div>
    </main>
  )
}

Explore.getLayout = (page: ReactElement) => {
  return <Default>{page}</Default>
}

export default Explore
