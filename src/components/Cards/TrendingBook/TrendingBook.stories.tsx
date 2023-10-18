import { Meta, StoryObj } from "@storybook/react"
import { TrendingBook, TrendingBookProps } from "."
import { SessionProvider } from "next-auth/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"

export default {
  title: "Components/Cards/Trending Book",
  component: TrendingBook,

  decorators: [
    (Story) => {
      return (
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {Story()}
          </QueryClientProvider>
        </SessionProvider>
      )
    },
  ],

  args: {
    book: {
      name: "A revolução dos bichos",
      authors: [
        {
          id: 1,
          name: "George Orwell",
          created_at: new Date(),
        },
      ],
      created_at: new Date(),
      id: "1",
      pages: 152,
      categories: [{ id: "2", name: "Fantasia", created_at: new Date() }],
      image_url: "https://m.media-amazon.com/images/I/618iHJVMh4L.jpg",
      reviewed_books: [],
    },
  },

  argTypes: {
    wasRead: {
      defaultValue: false,
      control: {
        type: "boolean",
      },
    },
  },

  parameters: {
    docs: {
      description: {
        component:
          "As propriedades que esse componente receber serão passadas para o seu componente root: `<Box>`. Esse componente precisa estar em volto dos componentes `<SessionProvider>` do `next-auth` e `<QueryClientProvider>` do `react query` para funcionar corretamente. Quando clicado abre um modal com detalhes do livro.",
      },
    },
  },
} as Meta

export const Primary: StoryObj<TrendingBookProps> = {}

export const Read: StoryObj<TrendingBookProps> = {
  args: {
    wasRead: true,
  },
}
