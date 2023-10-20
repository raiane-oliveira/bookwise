import { NextPageWithLayout } from "../../_app.page"
import { Heading } from "@/components/Typography/Heading"
import { Tag, UserSquare } from "phosphor-react"
import { Input } from "@/components/Form/Input"
import { Text } from "@/components/Typography/Text"
import { Button } from "@/components/Actions/Button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/axios"

const addAuthorFormSchema = z.object({
  name: z.string().min(1, "Não pode estar vazio"),
})

const addCategoryFormSchema = z.object({
  name: z.string().min(1, "Não pode estar vazio"),
})

type AddAuthorFormData = z.infer<typeof addAuthorFormSchema>
type AddCategoryFormData = z.infer<typeof addCategoryFormSchema>

export const AddAuthorAndCategory: NextPageWithLayout = () => {
  const {
    register: registerAuthor,
    handleSubmit: handleSubmitAuthor,
    formState: { isSubmitting: isSubmittingAuthor, errors },
    reset: resetAuthor,
  } = useForm<AddAuthorFormData>({
    resolver: zodResolver(addAuthorFormSchema),
  })

  const {
    register: registerCategory,
    handleSubmit: handleSubmitCategory,
    formState: { isSubmitting: isSubmittingCategory },
    reset: resetCategory,
  } = useForm<AddCategoryFormData>({
    resolver: zodResolver(addCategoryFormSchema),
  })

  async function handleAddAuthor(data: AddAuthorFormData) {
    try {
      await api.post("/authors/create", {
        name: data.name,
      })
      alert("Autor adicionado com sucesso!")
      resetAuthor()
    } catch (err) {
      alert(`Não foi possível adicionar o autor.`)
    }
  }

  async function handleAddCategory(data: AddAuthorFormData) {
    try {
      await api.post("/categories/create", {
        name: data.name,
      })
      alert("Categoria adicionada com sucesso!")
      resetCategory()
    } catch (err) {
      alert(`Não foi possível adicionar a categoria.`)
    }
  }

  return (
    <div className="grid w-full grid-cols-2 gap-12">
      <section className="flex-1 space-y-10">
        <Heading as="h2">
          <UserSquare />
          Adicionar autor
        </Heading>

        <form
          onSubmit={handleSubmitAuthor(handleAddAuthor)}
          className="[&_svg]:hidden"
        >
          <Text className="flex flex-col gap-1" as="label">
            Nome
            <Input placeholder="Nome do autor" {...registerAuthor("name")} />
          </Text>

          <Button
            type="submit"
            className="mt-5 w-full py-3 text-sm font-bold disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-gray-600"
            disabled={isSubmittingAuthor}
          >
            Adicionar
          </Button>
        </form>
      </section>

      <section className="flex-1 space-y-10">
        <Heading as="h2">
          <Tag />
          Adicionar categoria
        </Heading>

        <form
          onSubmit={handleSubmitCategory(handleAddCategory)}
          className="[&_svg]:hidden"
        >
          <Text className="flex flex-col gap-1" as="label">
            Nome
            <Input
              placeholder="Nome da categoria"
              {...registerCategory("name")}
            />
          </Text>

          <Button
            type="submit"
            disabled={isSubmittingCategory}
            className="mt-5 w-full py-3 text-sm font-bold disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-gray-600"
          >
            Adicionar
          </Button>
        </form>
      </section>
    </div>
  )
}
