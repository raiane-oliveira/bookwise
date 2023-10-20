import { Default } from "@/layouts/Default"
import { NextPageWithLayout } from "../../_app.page"
import { NextSeo } from "next-seo"
import { Heading } from "@/components/Typography/Heading"
import { Book } from "phosphor-react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/axios"
import { AuthorsSelect } from "./AuthorsSelect"
import { CategoriesSelect } from "./CategoriesSelect"
import { Input } from "@/components/Form/Input"
import { Text } from "@/components/Typography/Text"
import { Button } from "@/components/Actions/Button"
import { AddAuthorAndCategory } from "./add-author-category"
import { useEffect, useState } from "react"

const createBookFormSchema = z.object({
  name: z.string().min(1, "Não pode estar vazio."),
  image_url: z.string().optional(),
  year: z.coerce.number().int("Ano inválido.").optional(),
  pages: z.coerce
    .number()
    .int("Número de páginas inválidas.")
    .min(1, "Número de páginas inválidas."),
  authors: z
    .array(
      z.object({
        author_id: z.string().min(1),
        name: z.string(),
      }),
    )
    .transform((authors) =>
      authors.map((author) => ({ id: author.author_id })),
    ),
  categories: z
    .array(
      z.object({
        category_id: z.string().min(1),
        name: z.string(),
      }),
    )
    .transform((categories) =>
      categories.map((category) => ({ id: category.category_id })),
    ),
})

export type CreateBookFormData = z.input<typeof createBookFormSchema>

const AddBook: NextPageWithLayout = () => {
  const [authorSelected, setAuthorSelected] = useState("")
  const [categorySelected, setCategorySelected] = useState("")
  const createBookForm = useForm<CreateBookFormData>({
    resolver: zodResolver(createBookFormSchema),
  })

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isSubmitSuccessful },
    reset,
  } = createBookForm

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
      reset({
        authors: [],
        categories: [],
      })
    }
  }, [reset, isSubmitSuccessful])

  async function handleCreateBook(data: CreateBookFormData) {
    try {
      await api.post("/books/create", {
        ...data,
      })
      alert("Livro adicionado com sucesso")

      handleAuthorSelected("")
      handleCategorySelected("")
    } catch (err) {
      alert("Ocorreu um erro na hora de criarmos o livro.")
    }
  }

  function handleAuthorSelected(value: string) {
    setAuthorSelected(value)
  }

  function handleCategorySelected(value: string) {
    setCategorySelected(value)
  }

  return (
    <>
      <NextSeo title="Adicionar livro | BookWise" />
      <main className="mt-14 w-full max-w-app space-y-10">
        <Heading>
          <Book />
          Adicionar livro
        </Heading>

        <form
          className="border-b border-b-gray-700 pb-10"
          onSubmit={handleSubmit(handleCreateBook)}
        >
          <FormProvider {...createBookForm}>
            <div className="grid grid-cols-2 gap-5 [&_svg]:hidden">
              <Text as="label">
                Nome
                <Input placeholder="Nome do livro" {...register("name")} />
              </Text>

              <Text as="label">
                URL da Capa
                <Input
                  placeholder="URL da capa do livro"
                  {...register("image_url")}
                />
              </Text>

              <Text as="label">
                Número de páginas
                <Input
                  placeholder="Quantidade de páginas"
                  {...register("pages")}
                />
              </Text>

              <Text as="label">
                Ano de lançamento
                <Input placeholder="Ex: 2023" {...register("year")} />
              </Text>
            </div>

            <div className="mt-5 flex w-full gap-5">
              <Text as="label" className="w-full">
                Autores
                <AuthorsSelect
                  authorSelected={authorSelected}
                  onAuthorSelected={handleAuthorSelected}
                />
              </Text>

              <Text as="label" className="w-full">
                Categorias
                <CategoriesSelect
                  categorySelected={categorySelected}
                  onCategorySelected={handleCategorySelected}
                />
              </Text>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full py-4 font-bold hover:bg-gray-700 disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-gray-600"
            >
              Adicionar
            </Button>
          </FormProvider>
        </form>

        <AddAuthorAndCategory />
      </main>
    </>
  )
}

AddBook.getLayout = (page) => {
  return <Default>{page}</Default>
}

export default AddBook
