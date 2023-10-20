import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { Text } from "@/components/Typography/Text"
import { Category } from "@/@types/interfaces"
import { CaretDown, X } from "phosphor-react"

import * as Select from "@radix-ui/react-select"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { useFieldArray } from "react-hook-form"
import { CreateBookFormData } from "../index.page"

export function CategoriesSelect() {
  const { append, fields, remove } = useFieldArray<CreateBookFormData>({
    name: "categories",
  })

  const { data: categories, isLoading } = useQuery<Category[]>(
    ["categories"],
    async () => {
      const response = await api.get("/categories")
      return response.data
    },
  )

  if (isLoading) {
    return <Text className="animate-pulse">Carregando...</Text>
  }

  function handleSelectValue(id: string) {
    const category = categories?.find((category) => category.id === id)
    append({ category_id: id, name: String(category?.name) })
  }

  return (
    <div className="space-y-5">
      <Select.Root onValueChange={handleSelectValue}>
        <Select.Trigger className="flex w-full items-center gap-3 rounded border border-gray-500 bg-gray-800 px-5 py-3.5 text-left text-gray-100 data-[placeholder]:text-gray-400 [&_span]:flex-1">
          <Select.Value placeholder="Selecione a categoria" />
          <Select.Icon asChild>
            <CaretDown />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={15}
            className="max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)] overflow-hidden rounded border border-gray-500 bg-gray-800 text-gray-400 outline-none"
          >
            <ScrollArea.Root className="h-full w-full">
              <Select.Viewport asChild>
                <ScrollArea.Viewport className="max-h-80 w-full py-3">
                  {categories?.map((category) => (
                    <Select.Item
                      key={category.id}
                      value={category.id}
                      className="cursor-pointer px-4 py-1 transition-colors hover:text-gray-100 hover:outline-0"
                    >
                      <Select.ItemText>{category.name}</Select.ItemText>
                    </Select.Item>
                  ))}

                  <ScrollArea.Scrollbar className="w-1">
                    <ScrollArea.Thumb className="rounded bg-gray-600" />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Viewport>
              </Select.Viewport>
            </ScrollArea.Root>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <div className="flex flex-wrap items-center gap-2">
        {fields?.map((field, index) => {
          if (!field.name) {
            return null
          }

          return (
            <span
              className="flex items-center gap-2 rounded-md bg-purple-200 px-2 py-1 text-xs"
              key={field.id}
            >
              {field.name}
              <button onClick={() => remove(index)}>
                <X />
              </button>
            </span>
          )
        })}
      </div>
    </div>
  )
}
